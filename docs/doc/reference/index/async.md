### async <icon badge type='const'/> 
> Async调度器

### 描述
> 和setTimeout(task, duration)一样调度任务。
`async`调度器通过将任务放到JavaScript事件循环队列中异步调度任务,  它被认为是适时地延时任务或者按时间间隔重复调用任务的最佳实践。

如果你只想"延时"任务, 即在当前执行同步代码结束后执行它(通常会使用`setTimeout(deferredTask, 0)`实现), `asap`调度器会是更好的选择。
### 举例
使用异步调度器去延时任务
```js
import { asyncScheduler } from 'rxjs';

const task = () => console.log('it works!');

asyncScheduler.schedule(task, 2000);

// After 2 seconds logs:
// "it works!"
```
使用同步调度器按一定时间间隔重复执行任务:
```js
import { asyncScheduler } from 'rxjs';

function task(state) {
  console.log(state);
  this.schedule(state + 1, 1000); // `this` references currently executing Action,
                                  // which we reschedule with new state and delay
}

asyncScheduler.schedule(task, 3000, 0);

// Logs:
// 0 after 3s
// 1 after 4s
// 2 after 5s
// 3 after 6s
```