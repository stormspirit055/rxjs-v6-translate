### asap <icon badge type='const'/> 

> Asap 调度器。
```ts
  const asap: any;
```

### 描述
> 尽可能快的异步运行任务。
当你使用它来延时任务的时候, `asap`调度器的行为和`async`一样。如果你将延时时间设置为0, `asap`会等待当前同步执行结束后欧立刻执行给定的任务。

`asap`调度器会尽可能的压缩在当前执行代码结束时和下个调度任务开始时之间的时间。 这使得它成为执行"deferring"的最佳候选人。以前这是通过调用`setTimeout(deferredTask, 0)`去实现的, 但是这种实现方式会引起一些非期望的延迟(即使延时设为最小)。

注意, 使用`asap`调度器不是意味着你的任务将会在当前结束后最先执行。尤其是如果之前有其他`asap`调度器调度的任务, 那么该任务将会首先执行。也就是说, 如果你需要异步地调用任务, 但是尽可能快的执行, 那么`asap`调度器是你最好的选择。

### 示例
比较async和asap调度器:
```js
import { asapScheduler, asyncScheduler } from 'rxjs';

asyncScheduler.schedule(() => console.log('async')); // scheduling 'async' first...
asapScheduler.schedule(() => console.log('asap'));

// Logs:
// "asap"
// "async"
// ... but 'asap' goes first!
```