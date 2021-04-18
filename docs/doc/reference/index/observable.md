### Observable <icon badge type='class'/>
> 表示在任意时间量内的任何一组值。 这是RxJS的基石。
```ts
class Observable<T> implements Subscribable {
  static create: Function
  static if: typeof iif
  static throw: typeof throwError
  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic)
  _isScalar: boolean
  source: Observable<any>
  operator: Operator<any, T>
  lift<R>(operator: Operator<T, R>): Observable<R>
  subscribe(observerOrNext?: NextObserver<T> | ErrorObserver<T> | CompletionObserver<T> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): Subscription
  _trySubscribe(sink: Subscriber<T>): TeardownLogic
  forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void>
  pipe(...operations: OperatorFunction<any, any>[]): Observable<any>
  toPromise(promiseCtor?: PromiseConstructorLike): Promise<T>
}
```
### 子类
* `ConnectableObservable`
* `GroupedObservable`
* `Subject`
  * `BehaviorSubject`
  * `ReplaySubject`
  * `AsyncSubject`

### 静态属性
| 属性 | 类型 | 描述 |
| create | Function | 通过调用Observable的构造函数来创建一个新的(cold?)Observable。
| if | typeof iif | |
| throw | typeof throwError | |

### 构造函数
```ts
constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic)
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| subscribe | 可选项。默认值是`undefined`。该方法会在Observable订阅时被调用。该函数会被提供一个订阅者, 该订阅者上新值可以被`next`函数传递, 或者可以调用`error`方法引发异常, 或者可以调用`complete`来通知完成。|

### 属性
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| _isScalar | boolean | 内部实现细节, 不要直接去使用 |
| source | `Observable<any>` | |
| opeartor | `Operator<any, T>` | |

### 方法
* lift()

创建一个新的Observable, 将其作为源, 并将传递的运算符定义为新的Observable的运算符。
```ts
lift<R>(operator: Operator<T, R>): Observable<R>
```
#### 返回
`Observable<R>:` 使用了某个操作符的新Observabble。

---
* subscribe()

触发Observable的执行(工作)并注册Observer的手柄已获得它将要发出的通知。
> 当你有Observable但没什么任何东西发生时使用它(说白点就是用subcribe可以把Observable用起来)
`subscribe`不是一个常规的操作符, 而是一个调用Observable内部`subscribe`函数的方法。例如, 这可能是一个你传递给Observable构造器的函数, 但是多数时间它只是一个定义什么东西在什么时候会被Observable派发的依赖。这意味着调用`subscribe`实际上标志着Observable开始去工作而不是被创建。

抛开Observable的开始执行, 这个方法允许你去监听Observable派发的值, 以及它发生异常或完成的通知。你可以通过以下两种方式来实现这个。
第一种方法是创建一个实现了[<font color=#B7178C>Observer</font>](/doc/reference/index/observer.html)接口的对象。它拥有`Observer`接口定义的方法, 但是注意它只是一个普通的JS对象, 你可以通过任何你想要的方法(ES6 class, classic function constructor, object literal etc.)来实现。需要注意的是不要用任何RxJS实现细节去创建Observers - 你们不要用到它们。记住你的对象不需要去实现所有的方法。 如果你发现自己创建了一种不做任何操作的方法, 你可以忽略它。记住, 无论如何如果你不提供`error`方法, 那么所有异常将不会被捕获。
第二种方法是完全放弃Observer对象, 只提供回调函数代替其方法。这意味着你可以向`subscribe`提供三个函数作为参数, 第一个函数等价于`next`方法, 第二个等价于`error`
方法, 第三个等价于`complete`方法。就像Observer一样, 如果你不需要监听任何东西, 你可以忽略对应的函数, 不过最好是传递`undefined`或者`null`, 因为`subscribe`会根据它们是函数中所调用的位置来区分它们。至于`error`函数, 和之前一样, 如果你不提供回调方法, 原本被Observable派发的异常将会被丢弃。
无论你以何种方式调用`subscribe`, 他都会返回一个订阅对象(Subscription object)。这个对象允许你去通过调用它的`unsubscribe`, 以此来停止Observable所做的工作并释放其占用的资源。注意取消订阅并不会调用你提供了的`complete`回调。
注意提供给`subscribe`的回调函数不一定会被异步调用。这是由Observable自己决定什么时候去调用这些方法。举个例子, 默认情况下[<font color=#B7178C>of</font>](/doc/reference/index/of.html)会同步发出其所有值。始终检查文档以了解给定的Observable在订阅时将如何运行，以及其默认行为是否可以通过调度程序进行修改。

### 举例
结合一个Observer的订阅
```ts
import { of } from 'rxjs';

const sumObserver = {
  sum: 0,
  next(value) {
    console.log('Adding: ' + value);
    this.sum = this.sum + value;
  },
  error() {
    // We actually could just remove this method,
    // since we do not really care about errors right now.
  },
  complete() {
    console.log('Sum equals: ' + this.sum);
  }
};

of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
  .subscribe(sumObserver);

// Logs:
// "Adding: 1"
// "Adding: 2"
// "Adding: 3"
// "Sum equals: 6"
```
结合一个函数的订阅
```ts
import { of } from 'rxjs'

let sum = 0;

of(1, 2, 3).subscribe(
  value => {
    console.log('Adding: ' + value);
    sum = sum + value;
  },
  undefined,
  () => console.log('Sum equals: ' + sum)
);

// Logs:
// "Adding: 1"
// "Adding: 2"
// "Adding: 3"
// "Sum equals: 6"
```
取消订阅
```ts
import { interval } from 'rxjs';

const subscription = interval(1000).subscribe(
  num => console.log(num),
  undefined,
  () => {
    // 该函数不会被调用, 即使取消订阅时也不会被调用。
    console.log('completed!');
  }
);

setTimeout(() => {
  subscription.unsubscribe();
  console.log('unsubscribed!');
}, 2500);

// Logs:
// 0 after 1s
// 1 after 2s
// "unsubscribed!" after 2.5s
```
---
### 方法
* _trySubscribe()

```ts
_trySubscribe(sink: Subscriber<T>): TeardownLogic
```
#### 参数
| 键名 | 描述 | 
| --- | --- |
| sink | Type: `Subscriber`|
#### 返回
`TeardownLogic`

---
* forEach()

```ts
forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void>
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| next | 处理每个被Observable派发的值的手柄函数 | 
| promiseCtor | 可选项。默认值是`undefined`。用于实例化Pormise的构造函数 |
#### 返回
`Promise<void>`: 返回个Promise, 其状态可能是resolve(Observable的完成)或者是reject(手柄的异常)。

---
* pipe()

用来将多个操作符符串联起来执行。

---
* toPromise()

### 重载
* 详见[<font color=#B7178C>官方原文档</font>](https://rxjs-dev.firebaseapp.com/api/index/class/Observable)
