### Subjects(主体)
**什么是主体?** - Rxjs Subject 是一种特殊类型的Observable, 它允许将值传给多个观察者, 所以Subject是多播的, 而普通的Observable是单播的(每个已订阅的观察者都拥有Observable的独立执行)。
> Subject像是一个Observable, 但是可以多播给多个观察者。同时也像是EventEmitters: 维护多个监听器的注册表。
**每个主题都是Observable**。对于Subject, 你可以提供一个观察者并使用`subscribe`方法就可接受正常值。从观察者角度出发, 它无法辨别Observable的执行是在来自普通Observable还是Subject。
在Subject 的内部, `subscribe`不会调用发送值的新执行。 它只是将给定的观察者注册到观察者列表中, 类似于其他库或语言中的`addListener`的工作方式。
**每个Subject都是观察者** - 它是一个拥有如下方法的对象: `next(v)`, `error(e)`, `complete()`。 调用`next(theValue)`就可以给Subject发送一个新值, 并且这将会多播给多个注册监听Subject的观察者。
在下面的示例中, 我们为Subject提供了了两个观察者, 并且为其提供一些值:
``` js
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```
因为Subject是观察者, 这也就以为着你可以把Subject作为参数传给任何Observable的`subscribe`方法, 如下面的示例所展示的:
```js
import { Subject, from } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

const observable = from([1, 2, 3]);

observable.subscribe(subject); // You can subscribe providing a Subject

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```
通过上述的方法, 我们基本上可以通过Subject将一个单播的Observable转换成多播。这也说明了Subjects是将任意Observable执行共享给多个观察者的唯一方式。

#### 多播Observable
"多播Observable"通过Subject来发送通知, 这个Subject可能有多个订阅者。 然而普通的"单播Observable"只发送通知给单个观察者。
> 多播Observable在底层是通过使用Subject使得多个观察者可以看见同一个Observable执行。
在底层, `multicast`操作符的工作原理是这样的: 观察者订阅一个基础Subject, 然后Subject订阅源Observable。下面这个示例与前面使用`observable.subscribe(subject)`的示例类似:
```js
import { from, Subject, ConnectableObservable } from 'rxjs'
import { multicast } from 'rxjs/operators';

const source = from([1, 2, 3]);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject)) as ConnectableObservable<number>

// 在底层使用了 subject.subscribe({...})
multicasted.subscribe({
  next: v => console.log(`observerA: ${v}`)
})
multicasted.subscribe({
  next: v => console.log(`observerB: ${v}`)
})

// 在底层使用了source.subscribe(subject)
multicasted.connect();
```
`mulicast`返回一个Observable, 它看起来跟普通的Observable一样, 但是被订阅时就像是Subject。`mulicast`返回的是`ConnectableObservable`, 它只是一个有`connect()`方法的Observable。

`connnect`方法非常重要, 它决定了何时启动共享的Observable执行。因为`connect()`在底层做了`source.subscribe(subject)`, 所以它返回的是一个Subscription, 你可以取消订阅已达到取消共享Observable执行的目的。

#### 引用计数(Reference counting)

手动调用`connect()`并处理Subscription通常太笨重。通常, 当第一个观察者到达时我们希望能自动连接, 当最后一个观察者取消订阅时自动取消共享的Observable执行。

考虑以下示例, 下面的列表概述了Subscription发生的经过:
1. 第一个观察者订阅了多播Observable。
2. 多播Observable连接。
3. `next`值`0`发送给第一个观察者。
4. 第二个观察者订阅了多播Observable。
5. `next`值`1`发送给第一个观察者。
6. `next`值`1`发送给第二个观察者。
7. 第一个观察者取消订阅多播Observable。
8. `next`值`2`发送给第二个观察者。
9. 第二个观察者取消订阅多播Observable。
10. 多播Observable的连接中断(底层进行的操作是取消订阅)。
要实现这些需要显示的调用`connect()`, 代码如下:
``` js
import { interval, Subject } from 'rxjs';
import { multicast } from 'rxjs/operators';

const source = interval(500);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
let subscription1, subscription2, subscriptionConnect;

subscription1 = multicasted.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
// 这里我们应该调用connect(), 因为multicasted的第一个订阅者需要消费值。
subscriptionConnect = multicasted.connect();

setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 600);

setTimeout(() => {
  subscription1.unsubscribe();
}, 1200);

// 我们这里应该取消共享的observable执行的订阅, 因为此后multicasted不再有订阅者
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe(); // for the shared Observable execution
}, 2000);
```
如果我们期望去避免显示调用`connect()`, 我们可以使用ConnectableObservable's`refCount`方法(引用计数), 它会返回一个Observable并且追踪了订阅者的数量。 当订阅者数量从`0`变成`1`时, 它会替我们调用`connect()`去开始共享的执行。只有当订阅者数量从`1`变成`0`即完全不被订阅时, 它才会不再执行。
> refCount可以让多播Observable在第一个订阅者抵达时自动执行, 并在最后一个订阅者离开时停止执行。
下面这个例子: 
```js
import { interval, Subject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

const source = interval(500);
const subject = new Subject();
const refCounted = source.pipe(multicast(subject), refCount());
let subscription1, subscription2;

// 这里会隐式调用connect(), 因为这里第一个订阅者被计数追踪了。
console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: v => console.log(`observerA: ${v}`)
});

setTimeout(() => {
  console.log('obsreverB subscribed');
  subscription2 = refCounted.subscribe({
    next: v => console.log(`observerB: ${v}`)
  })
}, 600);
setTimeout(() => {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200)
// 这时共享的Observable会停止执行, 因为refCounted在此之后将不再有订阅者。
setTimeout(() => {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000)
// Logs
// observerA subscribed
// observerA: 0
// observerB subscribed
// observerA: 1
// observerB: 1
// observerA unsubscribed
// observerB: 2
// observerB unsubscribed

```
`refCount`方法只存在于ConnectableObservable, 并且返回的是一个`Observable`, 而不是另一个ConnectableObservable。

#### BehaviorSubject

Subject的另一种变体就是`BehaviorSubject`, 它是一个"当前值"的概念。 它存储了一个最新派发给消费者的值, 并且只要一个新的观察者订阅, 它会立刻从`BehaviorSubject`那接收到一个"当前值"。
> BehaviorSubjects适合用来表示"随时间推移的值"。举个例子, 生日的流是一个Subject, 年龄的流应该是一个BehaviorSubject。
下面的例子中, BehaviorSubject使用值`0`初始化, 当第一个观察者订阅时会得到`0`。第二个观察者订阅时会得到值`2`, 尽管它是在值`2`发送后订阅的。
```js
import { BehaviorSubject } from 'rxjs';
const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(3);

// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```
#### ReplaySubject
`ReplaySubject`同`BehaviorSubject`类似可以将旧值发送给新的订阅者, 但它还可以保存Observable执行的一部分。
> ReplaySubject记录Observable执行中的多个值并且将它们回放给新的订阅者。
创建一个`ReplaySubject`, 你可以指定回放多少个值。
```js
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(3); // 为新的订阅者缓存3个值(即指定回放3个值)

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(5);

// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5
```
除了缓存值, 你还可以指定window time(以毫秒为单位)来确定多久之前的值可以记录。 在下面的示例中, 我们使用了较大的缓存数量`100`, 但window time参数只设置了`500`毫秒。
```js
import { ReplaySubject } from 'rxjs';
const subject = new ReplaySubject(100, 500 /* windowTime */);

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

let i = 1;
setInterval(() => subject.next(i++), 200);

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
  });
}, 1000);

// Logs
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerA: 5
// observerB: 3
// observerB: 4
// observerB: 5
// observerA: 6
// observerB: 6
// ...
```

#### AsyncSubject
AsyncSubject是另一种变体, 只有当Observable执行完成时(执行`complete()`), 它才会将执行的最后一个值发送给观察者。
```js
import { AsyncSubject } from 'rxjs';
const subject = new AsyncSubject();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(5);
subject.complete();

// Logs:
// observerA: 5
// observerB: 5
```
AsyncSubject类似于[<font color=#B7178C>last()</font>](xxx)操作符, 它也是等待`complete`通知才能发送一个单个值。
