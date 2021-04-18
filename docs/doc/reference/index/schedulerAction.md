### schedulerAction <icon badge type='interface'/>
```ts
interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription

  // inherited from index/Subscription
  static EMPTY: Subscription
  constructor(unsubscribe?: () => void)
  closed: [object Object]
  unsubscribe(): void
  add(teardown: TeardownLogic): Subscription
  remove(subscription: Subscription): void
}
```
### 方法
* schedule()

```ts
schedule(state?: T, delay?: number): Subscription
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| state | 可选项。默认值是`undefined`。Type: `T`。|
| delay | 可选项。默认值是`undefined`。Type: `number`。 |
#### 返回
`subscription`