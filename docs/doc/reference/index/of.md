### of <icon badge type='function'/>
> 将入参转换成一个可观察的序列。
```ts
of<T>(...args: (SchedulerLike | T)[]): Observable<T>
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| args | Type: `(SchedulerLike | T)[]` |
#### 返回
`Observable<T>`: 一个依次发出你提供的参数然后完成的Observable
### 描述
> 每个参数变成一个`next`通知。
![An image](../images/of.png)
不同于[<font color=#B7178C>from</font>](/doc/reference/index/from.html), 他不会做任何展开(flattening)操作, 并且他会将每个参数作为一个单独的`next`通知发出。
### 举例
派发值`10`, `20`, `30`
```ts
import { of } from 'rxjs';

of(10, 20, 30)
.subscribe(
  next => console.log('next:', next),
  err => console.log('error:', err),
  () => console.log('the end'),
);
// result:
// 'next: 10'
// 'next: 20'
// 'next: 30'
```
派发数组[1,2,3]
```ts
import { of } from 'rxjs';

of([1,2,3])
.subscribe(
  next => console.log('next:', next),
  err => console.log('error:', err),
  () => console.log('the end'),
);
// result:
// 'next: [1,2,3]'
```
### 重载
* 详见[<font color=#B7178C>官方原文档</font>](https://rxjs-dev.firebaseapp.com/api/index/function/of)