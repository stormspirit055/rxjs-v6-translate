### animationFrame <icon badge type='class'/> 
> 一种Subject的变体, 只有当Observable执行完成时才派发一个值。它在完成时会派发它的最新的一个值给所有的观察者。
``` ts
class AsyncSubject<T> extends Subject {
  _subscribe(subscriber: Subscriber<any>): Subscription
  next(value: T): void
  error(error: any): void
  complete(): void
 
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
### 方法

* _subscribe()

```ts
_subscribe(subscriber: Subscriber<any>): Subscription
```
  #### 参数
  | 键名 | 描述|
  | --- | --- |
  | subscriber | Type: `Subscriber` |
  #### 返回
  `Subscription`

* next()

```ts
next(value: T): void
```
  #### 参数
  | 键名 | 描述 |
  | --- | ---|
  | value | Type: `T`|

  #### 返回
  `void`
* error()

```ts
error(error: any): void
```
  #### 参数
  | 键名 | 描述 | 
  | --- | --- |
  | error | Type: `any` |
  #### 返回
  `void`

* complete()

```ts
complete(): void
```
#### 参数
没有参数
#### 返回
`void`