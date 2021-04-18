### Observables(可观察对象)
`Observables`是多个值的惰性推送集合。
|   | 单个值 | 多个值 |
| --- | --- | --- |
| 拉取 | [<font color=#B7178C>Function</font>](xxx) | [<font color=#B7178C>Iterator</font>](xxx) | 
| 推送 | [<font color=#B7178C>Promise</font>](xxx) | [<font color=#B7178C>Observable</font>](xxx) |

**举个栗子** - 当订阅以下代码中的`Observable`的时候会立即(同步)推送值1、 2、 3, 然后过1秒后会推送值4, 再然后是完成流。
``` js
import { Observable } from 'rxjs'

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete()
  }, 1000)
})
```
要调用`Observable`才能看到这些值(values), 所以我们需要去订阅(subscribe)它。
``` js
import { Observable } from 'rxjs'

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete()
  }, 1000)
})

console.log('just before subscribe');
observable.subscribe({
  next(x) { console.log(`got value: ${x}`); },
  error(err) { console.error(`something wrong occurred: ${err}`); },
  complete() { console.log('done'); }
})
console.log('just after subscribe');
```
执行结果: 
``` js
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done
```
### Pull(拉取) vs Push(推送)

`Pull`(拉取)和`Push`(推送)是两种不同的协议, 它们用来描述数据生产者(`Producer`)如何与数据消费者(`Consumer`)进行通信的。
**什么是拉取?** - 在拉取体系中, 由消费者来决定什么时候从数据生产者那获取数据。数据生产者(`Producer`)本身不知道数据是何时被交付到消费者手中的。
每个JS的`Function`都是一个拉取体系。函数是数据的生产者, 调用该函数的代码通过从函数调用中'取出'一个单个返回值来对该函数进行消费。

ES2015引入了[<font color=#B7178C>generator函数和iterators</font>](xxx)(function*), 这是另外一种拉取体系。 调用`iterator.next()`的代码是消费者, 它会从iterator(生产者)那'取出'多个值。
|   | 生产者 | 消费者 |
| --- | --- | --- |
| 拉取 | **被动**: 有请求时提供数据 | **主动**: 决定何时请求数据 | 
| 推送 | **主动**: 按自己节奏提供数据 | **被动**: 对收到的数据做出反应 |

**什么是推送?** - 在推送体系中, 生产者决定何时去发送数据给消费者。消费者本身不知道数据是何时接收到的。
在当今JavaScript世界中, `Promises`是最常见的推送体系。Promise(生产者)讲一个解析过(resolved)的值传递个一个注册过的回调函数(消费者), 不同于函数的是, 由Promise来决定何时把值推送给回调函数

RxJS引入了`Observables`, 一种新的JS推送体系。`Observable`是一个多值的生产者, 并将值推送给观察者(消费者)。
* **Function**是惰性的评估运算, 调用时会同步返回一个单一的值。
* **generator**是惰性的评估运算, 调用时会同步地返回零到(有可能)无限多的值。
* **Promise** 是最终可能(或可能不)返回单个值的运算。
* **Observable** 是惰性的评估运算, 它可以从它被调用的时刻起同步或异步的返回零到(有可能的)无限多个值。

### Observables作为泛函数化

与流行的说法相反, `Observables`既不像EventEmitters, 也不像多个值的Promises。在某些情况下, 即当使用RxJS的Subjuects进行多播时, Observables的行为可能会比较像EventEmitters, 但通常情况下`Observables`的行为并不像EventEmiiters。
> Observables像是没有参数, 但是可以泛化为多个值的函数。
考虑如下代码:
``` js
function foo() {
  console.log('Hello');
  return 42
}
const x = foo.call();
console.log(x);
const y = foo.call();
console.log(y);
```
我们期盼的输出结果: 
``` js
"Hello"
42
"Hello"
42
```
你可以通过`Observables`来实现同样的效果: 
```js
import { Observable } from 'rxjs'

const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
})

foo.subscribe(x => {
  console.log(x);
})

foo.subscribe(y => {
  console.log(y);
})
```
输出结果是一致的:
``` js
"Hello"
42
"Hello"
42
```
这是因为函数和`Observable`都是惰性运算。如果你不去调用函数, `console.log("Hello")`将不会发生。同样的, 如果你去'调用'Observable(使用`subscribe`), `console.log('Hello')`也不会发生。另外, '调用'(call)或者'订阅'(subscribe)是独立操作: 两个函数调用会触发两个单独的副作用, 两个Observable订阅也会触发两个单独的副作用。EventEmitters共享副租用并且无论是否存在订阅者都会尽早执行, Observables与之相反, 不会共享副作用并且是延迟执行。
> 订阅Obsevale类型与调用函数。
一些人声称Observables是异步的, 那不是真的。 如果你用日志包围一个函数调用, 像这样: 
``` js
console.log('before');
console.log(foo.call());
console.log('after');
```
你会看到这样的输出: 
```js
"before"
"Hello"
42
"after"
```
使用Observables来做同样的事情: 
``` js
console.log('before');
foo.subscribe(function (x) {
  console.log(x);
});
console.log('after');
```
输出是: 
``` js
"before"
"Hello"
42
"after"
```
这证明了`foo`的订阅完全是同步一的, 就跟函数一样。
> Obsevables传递值可以是同步的, 也可以是异步的。
`Observable`和函数的差别在于, `Observable`随着时间的推移可以返回多个值, 这是函数所做不到的, 你无法这样做:
``` js
function foo() {
  console.log('Hello');
  return 42;
  return 100; // 死代码, 永远不会执行
}
```
函数只能返回一个值。 然而, Observables可以这样做:
``` js 
import { Observable } from 'rxjs'

const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100); // 返回另一个值
  subscriber.next(200); // 还可以再返回另一个值
})
console.log('before');
foo.subscribe(x => {
  console.log(x);
})

console.log('after');
```
同步输出: 
``` 
"before"
"Hello"
42
100
200
"after"
```
但你也可以异步'返回'值: 
``` js
import { Observable } from 'rxjs'

const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100); 
  subscriber.next(200); 
  setTimeout(() => {
    subscriber.next(300); // 异步执行 
  }, 1000)
})
console.log('before');
foo.subscribe(x => {
  console.log(x);
})

console.log('after');
```
输出结果: 
```
"before"
"Hello"
42
100
200
"after"
300
```
结论: 
* `func.call()`意味着 "同步给我一个值"
* `observable.subscribe()`意味着 "给我任意数量个值, 可以是同步也可以是异步"

### Observable剖析
Observables是使用`new Observable`或者创建操作符创建的, 并且使用观察者来**订阅**他们, 然后执行它并发送 `next`/`error`/`complate`通知给观察者, 而且执行可能被清理。这四个方面全被编码在`Observable`实例中, 但是某些方面是与其他类型相关的, 例如Observer(观察者)和 Subscription(订阅)。
Observable的核心关注点: 
* **创建**Observables
* **订阅**Observables
* **执行**Observables
* **清理**Observables

#### 创建Observables
`Observable`构造函数接受一个参数: `subscribe`函数。
下面的例子创建了一个Observable, 它每隔一秒向观察者发送字符串'hi'。
``` js
import { Observable } from 'rxjs'

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi');
  }, 1000);
})
```
> Observable可以通过`new Observable`来创建, 但通常,我们会使用所谓的创建操作符, 例如like, of, interval, etc。
在上面这个例子中, `subscribe`函数是用来描述`Observable`最重要的一块, 我们看看订阅是什么意思。

#### 订阅Observables
示例中的observable对象`observable`可以这样订阅:
```js
observable.subscribe(x => console.log(x));
```
`observable.subscribe`和`new Observable(function subscribe(subscriber) {...})`中的`subscribe`有着同样的名字, 这并不是一个巧合。在库中它们是不同的, 但从实际出发, 你可以认为在概念上他们是等同的。

这表明`subscribe`调用在同一Observable的多个观察者之间是不共享的。当使用一个观察者调用`observable.subscribe`时, `new Observable(function subscribe(subscriber) {...})`中的`subscribe`函数只服务于给定的观察者。对`observable.subscribe`的每次调用都会触发给定观察者的独立设置。
> 订阅Observable就像是调用函数, 并提供一个回调函数用来接收数据。
这与像`addEventListener/removeEventListener`这样的事件处理Api完全不同。使用`observable.subscribe`, 在Observable中不会将给定的观察者注册为监听器。Observable甚至不会去维护一个附加的观察者列表。
调用`subscribe`是启动`Observable`执行的一种简单方式, 并将值和事件传递给本次执行的观察者。

#### 执行Observables
`new Observable(function subscribe(subscriber) {...})`中的代码代表了Observable的执行, 它是惰性计算, 只有在每个观察者订阅后才会执行。随着时间的推移, 执行会以同步或异步的方式产生多个值。
Observable执行可以传递三种类型的值:
* '**Next**'通知: 发送一个值, 比如数字, 字符串, 对象等等。
* '**Error**'通知: 发送一个JavaScript错误或异常。
* '**Complate**'通知: 不发送任何值。
"Next"通知是最重要也是最常见的类型: 它们表示传递给观察者的实际数据。"Error"和"Complate"通知可能只会在Observable执行期间发生一次, 并且只会执行其中一个。
这些约束用所谓的`Observable`语法或合表达最好, 写为正则表达式是这样的: 
``` js
next*(error | complate)?
```
> 在Observable执行中, 可能会发送任意次数的Next通知。如果发送的是"Error"或"Complate"通知的话, 那么之后就不会发再发生任何通知了。
下面是Ovservable执行的示例, 它发送了三个'Next'通知, 然后是'Complate'通知:
```js
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});
```
Observable会严格遵守自己的协议, 所以下面的代码不会发送'Next'通知`4`:
```js
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(4); // 这个值不会传递, 因为它违反了协议
});
```
在`subscribe`中用`try/catch`代码块来包裹任意代码是个不错的注意, 如果捕获到异常的话, 会发送'Error'通知:
```js
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});
```

#### 清理Observable执行
因为Observable执行可能是无限的, 并且观察者通常希望能在有限的时间内终止执行, 所以我们需要一个API来取消执行。因为每个执行都是其对应观察者专属的, 一旦观察者完成接受值, 它必须要一种方法来停止执行, 以避免浪费计算能力或内存资源。

当调用了`observable.subscribe`, 观察者会被附加到新创建的Observable执行中。这个调用还返回一个独享, 即`Subscription`(订阅):
```js
const subscription = observable.subscribe(x => console.log(x));
```
`subscription`表示进行中的执行, 它又最小化的API允许你去取消执行, 请参见[<font color=#B7178C>Subscription类型</font>](xxx), 使用`subscription.unsubscribe()`你可以取消进行中的执行:
``` js
import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe(x => console.log(x));
// later
subscription.unsubscribe();
```
> 当你订阅了Observable, 你会得到一个Subscription, 它表示进行中的执行。只要调用`unsubscribe()`方法就可以取消执行。
每当我们创建一个Observable时, 都应该是定义如何清理执行的资源。 你可以通过在`function subscribe()`中返回一个自定有的`unsubscribe`函数。
举例来说,这是我们如何清理使用了`setInterval`的interval执行集合: 
``` js
const observable = new Observable(function subscribe(subscriber) {
  // 追踪interval资源
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  // 提供一个方法清理interval资源
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```
正如`observable.subscribe`类似于`new Observable(function subscribe() {...})`, 从`subscribe`返回的`unsubscribe`在概念上也等同于`subscription.unsubscribe`。事实上, 如果我们抛开围绕这些概念的ReactiveX类型,保留下来的这是简单的JavaScript。
``` js
function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
}

const unsubscribe = subscribe({next: (x) => console.log(x)});

// Later:
unsubscribe(); // dispose the resources
```
为什么我们要使用像 Observable、Observer 和 Subscription 这样的 Rx 类型？原因是保证代码的安全性(比如 Observable 规约)和操作符的可组合性。





