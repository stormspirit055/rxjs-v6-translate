### race <icon badge type='function'/> 
> 返回一个Observable, 该Observable是第一个源Observable发出项的镜像
```ts
race<T>(...observables: any[]): Observable<T>
```
#### 参数
| 键名 | 描述 | 
| --- | --- |
| osbervables | Type: `any[]` |
#### 返回
`Observable<T>`:该Observable是第一个源Observable发出项的镜像
### 举例
订阅一个最先派发值的Observable
```ts
import { race, interval } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const obs1 = interval(1000).pipe(mapTo('fast one'));
const obs2 = interval(3000).pipe(mapTo('medium one'));
const obs3 = interval(5000).pipe(mapTo('slow one'));

race(obs3, obs1, obs2)
.subscribe(
  winner => console.log(winner)
);

// result:
// a series of 'fast one'
```
### 重载
* 详见[<font color=#B7178C>官方原文档</font>](https://rxjs-dev.firebaseapp.com/api/index/function/race)
