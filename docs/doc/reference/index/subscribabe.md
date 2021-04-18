### Subject <icon badge type='class'/>
> OBSERVABLE 接口
```ts
interface Subscribable<T> {
  subscribe(observer?: PartialObserver<T>): Unsubscribable
}
```
### 类实现
* Observable
  * ConnectableObservable
  * GroupedObservable
  * Subject
    * BehaviorSubject
    * ReplaySubject
    * AsyncSubject
### 方法
* subscribe()
### 重载
* 详见[<font color=#B7178C>官方原文档</font>](https://rxjs-dev.firebaseapp.com/api/index/interface/Subscribable)