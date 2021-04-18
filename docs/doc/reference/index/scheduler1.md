### scheduled <icon badge type='class'/>
> 执行上下文和数据结构, 用来对任务排序并调度其执行。通过`now()`方法来提供一种(虚拟)时间的概念。
### 弃用说明
Schduler是一种RxJS的内部实现细节, 不应该能别外界直接使用。取而代之的是创建你自己的类来实现[<font color=#B7178C>schedulerLike</font>](/doc/reference/index/schedulerLike.html)
