### Scheduler(调度器)
**什么是调度器?** - 调度器控制着何时启动subscription和何时发送通知。 它由三部分组成。
* **调度器是一种数据结构** - 它会根据优先级或其他规则去存储和排列任务。
* **调度器是一个执行上下文** - 它表示在何时何地执行任务(比如 立即执行, 在另一种回调函数机制(比如setTimeout 或者 process.nextTick), 或者帧动画)。
* **调度器有一个(虚拟)时钟** - 调度器通过调用它的getter方法`now()`来提供"时间"的概念。在具体调度器上安排的任务将严格遵循时钟所表示的时间。
> 调度器可以让你规定Observable在什么样的执行上下文中发送通知给它的观察者。
下面这个例子中, 我们使用一个普通的Observable, 它同步的发送值`1`, `2`, `3`, 并且使用`observeOn`操作符去指定`async`调度器去调度这些值。
* [<font color=#B7178C>View on stackblitz</font>](https://stackblitz.com/edit/typescript-jexdny)
```js
import { Observable, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}).pipe(
  observeOn(asyncScheduler)
);

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x)
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
     console.log('done');
  }
});
console.log('just after subscribe');
```
输出: 
``` js
just before subscribe
just after subscribe
got value 1
got value 2
got value 3
done
```
注意`got value...`是在`just after subscribe`后输出的, 这是与我们之前见到的默认行为不同的地方。 原因是`observeOn(asyncScheduler)`引用了一个代理观察者在`new Observable`和最后的观察者之间。 在下面的示例代码中, 我们重命名了一些标识符, 使得其中的区别更明显:
```js
import { Observable, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

var observable = new Observable((proxyObserver) => {
  proxyObserver.next(1);
  proxyObserver.next(2);
  proxyObserver.next(3);
  proxyObserver.complete();
}).pipe(
  observeOn(asyncScheduler)
);

var finalObserver = {
  next(x) {
    console.log('got value ' + x)
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
     console.log('done');
  }
};

console.log('just before subscribe');
observable.subscribe(finalObserver);
console.log('just after subscribe');
```
`proxyObserver`是在`observeOn(asyncScheduler)`中创建的, 它的`next(val)`函数大概是这样:
```js
const proxyObserver = {
  next(val) {
    asyncScheduler.schedule(
      (x) => finalObserver.next(x),
      0 /* 延迟时间 */,
      val /* 会作为上面函数所使用的的x */
    );
  },

  // ...
}
```
`async`调度器操作符使用了`setTimeout`或`setInterval`, 即使给定的延迟是0。 通常, 在JavaScript中, 我们已知`setTimeout(fn, 0)`会在下一个事件循环迭代的最开始运行`fn`。这也解释了为什么`got value 1`派发给`finalObserver`是在`just after subscribe`后发生的。

调度器的`schedule()`方法需要一个`延迟`参数, 它指的是相对于调度器内部时钟的一段时间。调取器的时钟不需要与实际的挂钟时间有任何关系。这也就是为什么类似`delay`这样的时间操作符不是在实际时间上操作的, 而是取决于调度器的时钟时间。这在测试中很有用, 可以使用**虚拟时间调度器**来伪造挂钟时间, 同时实际上是在同步执行计划任务。

#### 调度器类型
`async`是RxJS提供的内置调度器中的一个。 可以通过使用`Scheduler`对象的静态属性创建并返回其中的每种类型的调度器。
| 调度器 | 用处 |
| --- | --- |
| `null` | 不传递任何调度器的话, 会以同步递归的方式发送通知。 用于定时操作或尾递归操作。 |
| `queueScheduler` | 当前事件帧中的队列调度(蹦床调度器)。 用于迭代操作。|
| `asapScheduler` | 微任务队列的调度, 微任务队列同时用于promises。基本上在当前任务之后, 在下个任务之前, 用于异步转换。 |
| `asyncScheduler` | 使用`setInterval`调度。 用于基于时间的操作符。|
| `animationFrameScheduler` | 在下一次浏览器重绘前调度任务。可以用来实现丝滑的浏览器动画。 |

#### 使用调度器

你可能已经在你的RxJS代码中使用了调度器, 只是没有明确地指出要使用的调度器类型。这是因为所有Observable操作符处理并发性都有可选的调度器。 如果你不提供调度器, RxJS将会根据最小并发性的原则选择一个默认调度器。这意味着引入满足操作符最小并发量需求的调度器将会被选择。举个例子, 对于返回有限或较小数量消息的Observable的操作符来说, RxJS不用调度器, 即`null`或`undefined`。对于返回无限或较大数量消息的Observable的操作符来说, 使用`queue`调度器。对于使用定时器的操作符, 使用`async`调度器。

因为RxJS使用最少并发量的调度器, 所以如果你出于性能考虑要引入并发, 可以选择不同的调度器。要指定具体的调度器, 可以使用那些需要调度器的操作符方法, 比如 `from([10, 20, 30], asyncScheduler)`。

**静态创建操作符通常需要一个调度器作为参数**。 举个例子, `from(array, scheduler)`可以让你指定调度器, 当发送从`array`转换的每个通知时去使用。通常是操作符的最后一个参数。下列静态创建操作符需要一个调度器参数:
* `bindCallback`
* `bindNodeCallback`
* `combineLatest`
* `concat`
* `empty`
* `from`
* `fromPromise`
* `interval`
* `merge`
* `of`
* `range`
* `throw`
* `timer`

使用`subscribeOn`来调度`subscribe()`在什么样的上下文中调用。默认情况下, Observable的`subscribe()`调用会立即同步执行。然而, 你可能会延迟或安排在给定的调度器上执行实际的subscription, 使用实际操作符`subscribeOn(scheduler)`, 其中`scheduler`是你提供的参数。

使用`observeOn`来调度通知在什么样的上下文中发送。如我们上面的例子一样, 实例操作符`observeOn(scheduler)`在源Observable和目标观察者之间引用了一个介体观察者, 该介体使用你给定的调度器对目标观察者进行调度。

**实例操作符可能需要一个调度器作为参数**

例如`bufferTime`, `debounceTime`, `delay`, `auditTime`, `sampleTime`, `throttleTime`, `timeout`, `timeoutWith`, `windowTime`这样的时间相关操作符都需要一个调度器作为它的最后一个参数, 否则默认的操作是在`asyncScheduler`调度器上。

另外需要调度器作为参数的实例操作符有: `cache`, `combineLatest`, `concat`, `merge`, `publishReplay`, `startWith`。

注意`cache`和`publishReplay`都接受一个调度器是因为他们使用了ReplaySubject。ReplaySubjects的构造函数接受一个可选的调度器作为最后一个参数, 因为ReplaySubject可能会处理时间, 这只在调度器的上下文中才有意义。默认情况下, ReplaySubject使用`queue`调度器来提供时钟。