### Notification <icon badge type='class'/>
> 代表observable可以发出的基于推送的事件或值。这个类对于那些管理通知的操作符(类似于[<font color=#B7178C>materialize</font>](/doc/reference/operators/materialize.html), [<font color=#B7178C>dematerialize</font>](/doc/reference/operators/dematerialize.html),[<font color=#B7178C>observeOn</font>](/doc/reference/operators/observeOn.html)以及一些其他)非常有用。除了包裹着真实传递的值, 它还用源元数据注释它, 例如, 它是什么类型的推送消息(next, error, complete)。
```ts
class Notification<T> {
  static createNext<T>(value: T): Notification<T>
  static createError<T>(err?: any): Notification<T>
  static createComplete(): Notification<any>
  constructor(kind: "N" | "E" | "C", value?: T, error?: any)
  hasValue: boolean
  kind: 'N' | 'E' | 'C'
  value?: T
  error?: any
  observe(observer: PartialObserver<T>): any
  do(next: (value: T) => void, error?: (err: any) => void, complete?: () => void): any
  accept(nextOrObserver: NextObserver<T> | ErrorObserver<T> | CompletionObserver<T> | ((value: T) => void), error?: (err: any) => void, complete?: () => void)
  toObservable(): Observable<T>
}
```
### 静态方法
* createNext()

根据给定的值创建`next`类型的Notification实例的快捷方法。
```ts
static createNext<T>(value: T): Notification<T>
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| value | `next`的值 | 
#### 返回
`Notification<T>`: 代表参数的'next'通知

---
* createError

根据给定的值创建`error`类型的Notification实例的快捷方法。
```ts
static createError<T>(err?: any): Notification<T>
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| err | 可选项。默认值是`undefined`。The`error`error| 
#### 返回
`Notification<T>`: 代表参数的'error'通知

---
* createComplete

根据给定的值创建`complete`类型的Notification实例的快捷方法。
```ts
static createComplete(): Notification<any>
```
#### 参数
没有参数
#### 返回
`Notification<T>`: 没有价值的'complete'通知。

### 构造函数
```ts
constructor(kind: "N" | "E" | "C", value?: T, error?: any)
```
#### 参数
| 键名 | 描述 | 
| --- | --- | 
| kind | Type: `"N" | "E" | "C"`。 |
| value | 可选项。默认值是`undefined`。Type: `T`。|
| error | 可选项。默认值是`undefined`。Type:`any`。|
### 属性
| 属性 | 类型 | 描述 | 
| --- | --- | --- | 
| hasValue | boolean | | 
| kind | 'N' | 'E' | 'C' |  在构造函数中声明 |
| value | T | 在构造函数中声明 | 
| error | any | 在构造函数中声明 | 

---
### 方法
* observe()

传递给给定的`observer`被Notification包裹的值。
```ts
observe(observer: PartialObserver<T>): any
```
#### 参数
| 键名 | 描述 |
| observer | Type: `PartialObserver` |
#### 返回
`any`

---
* do()

给定一些Observer回调, 将当前Notification代表的值传递给正确对应的回调。
```ts
do(next: (value: T) => void, error?: (err: any) => void, complete?: () => void): any
```
#### 参数
| 键名 | 描述 | 
| --- | --- | 
| next | 一个Observer的`next`回调 | 
| error | 可选项。默认值是`undefined`。一个Observer的`error`回调 |
| complete | 可选项。 默认值是`undefined`。一个Observer的`complete`回调 |
#### 返回
`any`

---
* accept()

接受一个Observer或者其各个回调函数, 并相应地调用`observer`或`do`方法。
```ts
accept(nextOrObserver: NextObserver<T> | ErrorObserver<T> | CompletionObserver<T> | ((value: T) => void), error?: (err: any) => void, complete?: () => void)
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| nextOrObserver | 一个Observer或`next`回调 |
| error | 可选项。默认值是`undefined`。一个Observer的`error`回调 | 
| complete | 可选项。默认值是`undefined`。一个Observer的`complete`回调。

---
* toObservable()

返回一个简单的Observable, 其仅仅是传递被这个Notification实例代表的通知。
```ts
toObservable(): Observable<T>
```
#### 参数
没有参数
#### 返回
`Observable<T>`

---
### 参见
* [<font color=#B7178C>materialize</font>](/doc/reference/operators/materialize.html)
* [<font color=#B7178C>dematerialize</font>](/doc/reference/operators/dematerialize.html)
* [<font color=#B7178C>observeOn</font>](/doc/reference/operators/observeOn.html)