### ConnectableObservable <icon badge type='class' />

```ts
class ConnectableObservable<T> extends Observable {
  constructor(source: Observable<T>, subjectFactory: () => Subject<T>)
  protected _subject: Subject<T>
  protected _refCount: number
  protected _connection: Subscription
  source: Observable<T>
  protected subjectFactory: () => Subject<T>
  _subscribe(subscriber: Subscriber<T>)
  protected getSubject(): Subject<T>
  connect(): Subscription
  refCount(): Observable<T>
 
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
### 构造器
  ```ts
  constructor(source: Observable<T>, subjectFactory: () => Subject<T>)
  ```
  #### Parameters
  | 键名 | 描述 | 
  | --- | --- | 
  | source | Type: `Observable` | 
  | subjectFactory | Type: `() => Subject` |

### 属性
  | 属性 | 类型 | 描述 |
  | --- | --- | --- | 
  | _subject | `Subject<T>` | |
  | _refCount | number | | 
  | _connection | Subscription | | 
  | source | `Observable<T>` | <font color=#B7178C>Declared in constructor</font> |
  | subjectFactory | () => `Subject<T>` | <font color=#B7178C>Declared in constructor</font> |

### 方法

  * _subscribe()

  ```ts
    _subscribe(subscriber: Subscriber<T>)
  ```
  #### 参数
  | 键名 | 描述 | 
  | --- | --- |
  | subscriber | Type: `Subscriber` | 

  * getSubject()

  ``` ts
    protected getSubject(): Subject<T>
  ```
  #### 参数
    没有参数
  #### 返回
  `Subject<T>`
  * connect()

  ```ts
    connect(): Subscription
  ```
  #### 参数
  没有参数
  #### 返回
  `Subscription`
  
  * refCount()
  
  ```ts
    refCount(): Observable<T>
  ```
  #### 参数
  没有参数
  #### 返回
  `Observable<T>`

