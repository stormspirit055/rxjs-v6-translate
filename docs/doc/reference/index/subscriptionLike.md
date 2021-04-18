### SubscriptionLike <icon badge type='interface'/>
```ts
interface SubscriptionLike extends Unsubscribable {
  get closed: boolean
  unsubscribe(): void

  // inherited from index/Unsubscribable
  unsubscribe(): void
}
```
### 类实现
* Subject
  * BehaviorSubject 
  * ReplaySubject
  * AsyncSubject
* Subscription
  * Subscriber
### 属性
| 属性 | 类型 | 描述 |
| closed | boolean | 只读 |
### 方法
* unsubscribe()

```ts
unsubscribe(): void
```
#### 参数
没有参数
#### 返回
`void`