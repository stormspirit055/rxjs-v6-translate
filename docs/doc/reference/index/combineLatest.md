### combineLatest <icon badge type='function'/> 
> 结合多个Observable去创建一个Observable, 其值是根据每个输入的Observable的最新值计算得出的。
```ts
combineLatest<O extends ObservableInput<any>, R>(...observables: (SchedulerLike | O | ((...values: ObservedValueOf<O>[]) => R))[]): Observable<R>
```
#### 参数
 | 键名 | 描述 | 
 | --- | --- |
 | observables | Type: `(SchedulerLike | O | ((...values: ObservedValueOf[]) => R))[]`|

### 描述
> 每当任何输入的Observable派发值时, 它都会使用来自所有输入的Observable的最新值来计算公式, 然后派发该公式的输出。
![An image](../images/combineLatest.png)
`combineLatest`合并所有作为参数传递的Observable的值。这是通过按顺序订阅Observable来完成的, 并且每当有任何Observale发出新值时, 就从每个Observable中收集最新值的数组。 所以如果你将`n`个Observable传递给该操作符, 则返回的Observable将始终发出n个值的数组, 其顺序与传递的Observables的顺序相对应。(第一个Observable的值在第一个位置, 以此类推)

静态版本的`combineLatest`接受一个Observable数组, 或者每个Observable都可以直接作为参数。注意, Observable数组是更好的选择, 如果你预先不知道有多少个Observable将会结合, 传递空数组将导致Observable立即完成。

为了确保输出的数组长度始终保持一致, `combineLatest`实际上将会等待所有输入的Observable至少派发一次值, 然后才开始派发结果。这意味着如果一个Observable在其他Observable开始派发值之前派发值, 那么所有这些值(除了最后一个)都会丢失。 另一方面, 如果一些Observable不派发值就结束了, 那么结果Observable将会在同时结束, 并且不派发任何值, 因为这时将不可能在结果数组中包含来自已完成的Observable的值。同时, 如果一个输入observable不派发任何值也不完成, `combineLatest`也将永远不会完成, 因为, 同样的, 它将等待所有流去派发值。

如果至少一个Observable被传递给`combineLatest`以及所有被传递的Observable都派发了值, 那么结果Observable将会在所有结合的流完成时完成。 所以即使一些Observable完成了, 当其他的Observable执行时, `combineLatest`的结果依旧会发出值。在已完成的Observable中, 它的值从现在开始将会变成最后一个派发的值。 另一方面, 如果有任何Observable发生错误了, `combineLatest`将会同时出错, 并且其他Observable将会被取消订阅。

`combineLatest`接受作为可选参数的`project`函数, 该函数接受通常由结果Observable发出的所有值作为参数。 `project`可以返回任意类型的值, 这些值之后将会被Observable派发以取代默认数组。注意, `project`不需要值的数组作为参数, 而是值本身作为参数。 这意味着可以将默认`project`当成具有所有参数并将其放入数组的函数。

### 举例

集合两个`timer`Observable
```ts
import { combineLatest, timer } from 'rxjs';

const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
const combinedTimers = combineLatest(firstTimer, secondTimer);
combinedTimers.subscribe(value => console.log(value));
// Logs
// [0, 0] after 0.5s
// [1, 0] after 1s
// [1, 1] after 1.5s
// [2, 1] after 2s
```
结合一个数组的Observable
```ts
import { combineLatest, of } from 'rxjs';
import { delay, starWith } from 'rxjs/operators';

const observables = [1, 5, 10].map(
  n => of(n).pipe(
    delay(n * 1000),   // emit 0 and then emit n after n seconds
    startWith(0),
  )
);
const combined = combineLatest(observables);
combined.subscribe(value => console.log(value));
// Logs
// [0, 0, 0] immediately
// [1, 0, 0] after 1s
// [1, 5, 0] after 5s
// [1, 5, 10] after 10s
```
使用project函数动态计算BMI
```ts
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

const weight = of(70, 72, 76, 79, 75);
const height = of(1.76, 1.77, 1.78);
const bmi = combineLatest(weight, height).pipe(
  map(([w, h]) => w / (h * h)),
);
bmi.subscribe(x => console.log('BMI is ' + x));

// With output to console:
// BMI is 24.212293388429753
// BMI is 23.93948099205209
// BMI is 23.671253629592222
```
### 重载
* 详见[<font color=#B7178C>官方原文档</font>](https://rxjs-dev.firebaseapp.com/api/index/function/combineLatest)
