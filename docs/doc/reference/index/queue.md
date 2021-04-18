### queue <icon badge type='const'/> 
> 队列调度器
```ts
const queue: any;
```
### 描述
>  将每个下一个任务放到一个队列中, 以取代立即执行。
`queue`调度器, 当配合延时使用, 其行为和[<font color=#B7178C>async</font>](/doc/reference/index/async.html)一致。
当不配合延时使用时, 它会同步调用给定的任务 - 被调度时立即执行。 然而, 当递归调用时(即在已调度的任务内部), 将使用队列调度程序调度另一个任务, 而不是立即执行, 该任务将被放入队列并等待当前任务完成。

这意味着当你通过`queue`调度器执行任务时, 你可以确保该任务将在开始使用调度器调度任何其他任务前结束。
### 举例
先调度递归, 然后做一些操作。
```ts
import { queueScheduler } from 'rxjs';

queueScheduler.schedule(() => {
  queueScheduler.schedule(() => console.log('second')); // will not happen now, but will be put on a queue

  console.log('first');
});

// Logs:
// "first"
// "second"
```
递归调度自身
```ts
import { queueScheduler } from 'rxjs';

function recursive(state)  {
  if (state !== 0) {
    console.log('before', state)
    recursive(state - 1)
    console.log('after', state)
  }
}
recursive(3)
// 普通递归:
// "before", 3
// "before", 2
// "before", 1
// "after", 1
// "after", 2
// "after", 3

queueScheduler.schedule(function(state) {
  if (state !== 0) {
    console.log('before', state);
    this.schedule(state - 1); // `this` references currently executing Action,
                              // which we reschedule with new state
    console.log('after', state);
  }
}, 0, 3);

// 用queueScheduler递归调度自身:
// "before", 3
// "after", 3
// "before", 2
// "after", 2
// "before", 1
// "after", 1
```