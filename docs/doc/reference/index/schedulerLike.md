### schedulerLike <icon badge type='interface'/>
> SCHEDULER 接口
```ts
interface SchedulerLike {
  now(): number
  schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription
}
```
### 类实现
* `Scheduler`
### 方法
* now()

```ts
now(): number
```
#### 参数
没有参数
#### 返回
`number`

---
* schedule()
```ts
schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| work | Type:`(this: SchedulerAction, state?: T) => void` |
| delay | 可选项。默认值是`undefined`。Type: `number` |
| state | 可选项。默认值是`undefined`。Type:`T` |
#### 返回
`Subscription`
