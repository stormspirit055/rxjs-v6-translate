### zip <icon badge type='function'/>
> 结合多个Observable去创建一个Observable, 其值是根据每个输入Observable的值依次计算出来的。
```ts
zip<O extends ObservableInput<any>, R>(...observables: (O | ((...values: ObservedValueOf<O>[]) => R))[]): Observable<ObservedValueOf<O>[] | R>
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| observables | Type:`(O | ((...values: ObservedValueOf[]) => R))[]` |
#### 返回
`Observable<ObservedValueOf<O>[] | R>`
### 描述
如果最后一个参数是方法, 该方法会用来根据传入的值来计算新值。否则将返回输入值的数组。
### 举例
从不同的源中结合年龄和名字
```ts
import { zip, of } from 'rxjs';
import { map } from 'rxjs/operators';

let age$ = of<number>(27, 25, 29);
let name$ = of<string>('Foo', 'Bar', 'Beer');
let isDev$ = of<boolean>(true, true, false);

zip(age$, name$, isDev$).pipe(
  map(([age, name, isDev]) => ({ age, name, isDev })),
)
.subscribe(x => console.log(x));

// outputs
// { age: 27, name: 'Foo', isDev: true }
// { age: 25, name: 'Bar', isDev: true }
// { age: 29, name: 'Beer', isDev: false }
```
### 重载
* [<font color=#B7178C>官方原文档</font>](https://rxjs-dev.firebaseapp.com/api/index/function/zip)