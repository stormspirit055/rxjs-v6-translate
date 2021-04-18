### ReplaySubject <icon badge type='function'/>
> 一种`Subject`的变体, 它会"回复"或者派发旧值给新的订阅者。它缓冲了一定数量的值, 除了将这些值发送给现有订阅者外, 还会立即将这些值发送给任何新的订阅者。
```ts
class ReplaySubject<T> extends Subject {
  constructor(bufferSize: number = Number.POSITIVE_INFINITY, windowTime: number = Number.POSITIVE_INFINITY, scheduler?: SchedulerLike)
  _subscribe(subscriber: Subscriber<T>): Subscription
  _getNow(): number
 
  // inherited from index/Subject
  static create: Function
  constructor()
  observers: Observer<T>[]
  closed: false
  isStopped: false
  hasError: false
  thrownError: any
  lift<R>(operator: Operator<T, R>): Observable<R>
  next(value?: T)
  error(err: any)
  complete()
  unsubscribe()
  _trySubscribe(subscriber: Subscriber<T>): TeardownLogic
  _subscribe(subscriber: Subscriber<T>): Subscription
  asObservable(): Observable<T>
 
  // inherited from index/Observable
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
### 构造函数
```ts
constructor(bufferSize: number = Number.POSITIVE_INFINITY, windowTime: number = Number.POSITIVE_INFINITY, scheduler?: SchedulerLike)
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| bufferSize | 可选项。默认值是`Number.POSITIVE_INFINITY`。Type: `number` |
| windowTime | 可选项。默认值是`Number.POSITIVE_INFINITY`。Type: `number` |
| scheduler | 可选项。默认值是`undefined`。Type: `SchedulerLike`。 |
### 方法
* _subscribe()

```ts
_subscribe(subscriber: Subscriber<T>): Subscription
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| subscriber | Type: `Subscriber`。|
#### 返回
`Subscription`

---
* _getNow()

```ts
_getNow(): number
```
#### 参数
没有参数
#### 返回
`number`
