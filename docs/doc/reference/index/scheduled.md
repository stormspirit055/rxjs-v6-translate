### scheduled <icon badge type='function'/>
> 将一个通用的[<font color=#B7178C>ObservableInput</font>](/doc/reference/index/ObservableInput.html)类型转换成一个Observable, 该Observable的订阅和派发都是基于给定的调度器安排的。
```ts
scheduled<T>(input: any, scheduler: SchedulerLike): Observable<T>
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| input | 你想要调度的可观察对象, 数组, promise, 迭代器等等 |
| scheduler | 用来调度返回的可观察对象的订阅和派发的调度器 |
#### 返回
`Observable<T>`
### 参见
* [<font color=#B7178C>form</font>](/doc/reference/index/from.html)
* [<font color=#B7178C>of</font>](/doc/reference/index/of.html)