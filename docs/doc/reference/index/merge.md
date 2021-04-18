### merge <icon badge type='function'/> 
> 创建一个输出Observable, 该Observale会同时派发所有从给定的输入Observable中获得的值。
```ts
merge<T, R>(...observables: any[]): Observable<R>
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| observables | 用来合并的Observable |
#### 返回
`Observable<R>`: 一个Observable派发所有输入的Observable的结果。
### 描述
> 通过融合多个Observable的value至单个Observable, 以此来讲多个Observable一起展开。
![An image](../images/merge.png)
`merge`会订阅每个传入的Observable(作为参数), 并且转发(不做任何转换)所有输入Observable的value至输出Observable。 输出Observable会在所有输入Observable完成时立即完成。 任何输入Observable发送的错误都会被立即派发到输出Observable。
### 举例
将一个1s interval(Observable) 和 clicks(Observable)合并在一起。
```ts
import { merge, fromEvent, interval } from 'rxjs';

const clicks = fromEvent(document, 'click');
const timer = interval(1000);
const clicksOrTimer = merge(clicks, timer);
clicksOrTimer.subscribe(x => console.log(x));

// 结果:
// timer会每隔一秒发送一个升序值, 
// clicks会在触发document点击是输出MouseEvent
// 由于两个流合并所以你会看到如上结果
```
合并三个Observable, 但是只有2个同步执行
```ts
import { merge, interval } from 'rxjs';
import { take } from 'rxjs/operators';

const timer1 = interval(1000).pipe(take(10));
const timer2 = interval(2000).pipe(take(6));
const timer3 = interval(500).pipe(take(10));
const concurrent = 2; // the argument
const merged = merge(timer1, timer2, timer3, concurrent);
merged.subscribe(x => console.log(x));

// 结果:
// - timer1和timer2会同步执行
// - timer1会每个1秒派发一个值并迭代10次
// - timer2会每个2秒派发一个值并迭代6次
// - 在timer1完成它的最大迭代次数后, timer2会继续迭代, 然后timer3会开始与timer2同步执行
// - 当timer2完成它的最大迭代次数后便会终止, 然后timer3会继续每个500ms派发一个值直到它完成
```
### 重载
* 详见[<font color=#B7178C>官方原文档</font>](https://rxjs-dev.firebaseapp.com/api/index/function/merge)