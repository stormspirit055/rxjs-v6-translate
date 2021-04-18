### animationFrame <icon badge type='const'/> 

>  动画帧调度器
```ts
const animationFrame: any;
```
### 描述
> 当window.requestAnimationFrame执行时运行任务。
当`animationFrame`调度器和延时一起使用, 它的行为会回退到`async`调度器。
没有延时, `animationFrame`调度器可以用来创建流畅的浏览器动画。 它能保证在下一次浏览器重绘前调度任务, 从而尽可能高效的执行动画。

### 例子

调度div高度的动画。
```js
// html: <div style="background: #0ff;"></div>
import { animationFrameScheduler } from 'rxjs';

const div = document.querySelector('div');

animationFrameScheduler.schedule(function(height) {
  div.style.height = height + "px";
  // this 指向当前正在执行的Action, 我们用新的状态来重新调度它。
  this.schedule(height + 1);  

}, 0, 0);

// 你会看到div高度一直增长
```
