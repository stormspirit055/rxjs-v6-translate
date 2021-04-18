### GroupedObservable <icon badge type='class'/> 
> 一个Observable代表(一些)值, 这些值属于由公共秘钥表示的同一组。由GroupedObservable派发的值的来源是源Observable。 公共秘钥可用作GroupedObservable实例上的字段秘钥。
```ts
class GroupedObservable<K, T> extends Observable {
  constructor(key: K, groupSubject: Subject<T>, refCountSubscription?: RefCountSubscription)
  key: K
  _subscribe(subscriber: Subscriber<T>)
 
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
constructor(key: K, groupSubject: Subject<T>, refCountSubscription?: RefCountSubscription)
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| key | Type: `k` | 
| groupSubject | Type: `Subject` | 
| refCountSubscription | 可选项。 默认值是`undefined`。 Type: `RefCountSubscription` |

### 属性
| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| key | K | 在构造函数中声明 |

### 方法
* _subscribe()

```ts
_subscribe(subscriber: Subscriber<T>)
```
#### 参数
| 键名 | 描述 | 
| --- | --- | 
| subscriber | Type: `Subscriber` |