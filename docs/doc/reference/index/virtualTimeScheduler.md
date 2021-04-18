### VirtualTimeScheduler <icon badge type='class'/>
```ts
class VirtualTimeScheduler extends AsyncScheduler {
  protected static frameTimeFactor: number
  constructor(SchedulerAction: typeof AsyncAction = VirtualAction as any, maxFrames: number = Number.POSITIVE_INFINITY)
  frame: number
  index: number
  maxFrames: number
  flush(): void
}
```
### 子类
* `TestScheduler`
### 静态属性
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| frameTimeFactor | number | |
### 构造函数
```ts
constructor(SchedulerAction: typeof AsyncAction = VirtualAction as any, maxFrames: number = Number.POSITIVE_INFINITY)
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| SchedulerAction | 可选项。默认值是`VirtualAction as any`。Type: `typeof AsyncAction` | 
| maxFrames | 可选项。默认值是`number.POSITIVE_INFINITY`。Type:`number` |

### 属性
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| frame | number | |
| index | number | |
| maxFrames | number | 构造函数内声明 |
### 方法
* flush

提示调度器执行其所有排队的操作, 以此来清空队列。
```ts
flush(): void
```
#### 参数
没有参数
#### 返回
`void`