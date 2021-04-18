### Subject <icon badge type='class'/>
> Subject是Observable的一种特殊类型, 它允许将值多播给多个观察者。Subjects类似于EventEmitters。
```ts
class Subject<T> extends Observable implements SubscriptionLike {
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
### 子类
* `BehaviorSubject`
* `ReplaySubject`
* `AsyncSubject`
### 描述
每个Subject都是一个Observable和Observer。你可以订阅一个Subject,也可以调用`next`来获得values, error, complete通知。
### 静态属性
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| create | Function | |
### 构造函数
```ts
constructor()
```
#### 参数
没有参数
### 属性
| 属性 | 类型 | 描述 | 
| observers | Observer<T>[] | |
| closed | false | |
| isStopped | false | |
| hasError | false | |
| thrownError | false | |
### 方法
* lift()

```ts
lift<R>(operator: Operator<T, R>): Observable<R>
```
#### 参数
| 键名 | 描述 |
| operator | Type: `Operator` |
#### 返回
`Observable<R>`

---
* next()
```ts
next(value?: T)
```
#### 参数
| value | 可选项。默认值是`undefined`。Type:`T` |

---
* error()

```ts
error(err: any)
```
#### 
参数
| 键名 | 描述 |
| --- | --- |
| err | Type: `any` |

---
* complete()

complete()
#### 参数
没有参数

---
* unsubscribe()
unsubscribe()
#### 参数
没有参数

---
* _trySubscribe()
```ts
_trySubscribe(subscriber: Subscriber<T>): TeardownLogic
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| subscriber | Type:`Subscriber` |
#### 返回
`TeardownLogic`

---
* _subscribe()

```ts
_subscribe(subscriber: Subscriber<T>): Subscription
```
#### 参数
| 键名 | 描述 |
| subscriber | Type:`Subscriber` |
#### 返回
`Subscription`

---
* asObservable()
通过Subject创建一个新的Observable作为源。你执行此操作来创建自定义的Observer端逻辑, 并将其从使用Observable的代码中隐藏。
```ts
asObservable(): Observable<T>
```
#### 参数
没有参数
#### 返回
`Observable<T>`:Subject广播的Observable