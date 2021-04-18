### behaviorSubject <icon badge type='class'/> 
> 一种Subject的变体, 需要一个初始值并且无论何时被订阅它都会派发当前值。
```ts
class BehaviorSubject<T> extends Subject {
  constructor(_value: T)
  get value: T
  _subscribe(subscriber: Subscriber<T>): Subscription
  getValue(): T
  next(value: T): void
 
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
#### 构造函数(Constructor)
  ```ts
    constructor(_value: T)
  ```
  ##### 参数
  | 键名 | 描述 | 
  | --- | --- | 
  | _value | Type: `T` |

#### 属性(Properties)
  | Prototy | Type | Description |
  | value | T | Read-only |

#### 方法(Methods)
  * _subscribe()

  ```ts
  _subscribe(subscriber: Subscriber<T>): Subscription
  ```
  ##### 参数
  | 键名 | 描述 |
  | --- | --- |
  | subscriber | Type: `Subscriber` | 
  ##### 返回
  `Subscription`

  * getValue()

  ```ts
  getValue(): T
  ```
  ##### 参数
  没有参数
  ##### 返回
  `T`
  * next()
  
  ```ts
  next(value: T): void
  ```
  ##### 参数
  | 键名 | 描述 |
  | --- | --- 
  | value | Type: `T` | 
  ##### 返回
  `void`


