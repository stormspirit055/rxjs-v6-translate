### fromEventPattern <icon badge type='function'/>
> 一个Observable不会发送任何东西给观察者也永远不会结束。
```ts
const NEVER: any;
```
#### 描述
一个Observable, 既不会派发任何值, 也不会派发任何错误, 也不会发出完成通知。 它可以用来测试目的(?)或和其他Observable组成。请注意由于该Observable从不发出完成通知, 所以其可以防止自动处理订阅。订阅需要手动处理。
### 举例
发送一个数字7, 之后永不发送任何东西(也不会结束)
```ts
import { NEVER } from 'rxjs';
import { startWith } from 'rxjs/operators';

function info() {
  console.log('Will not be called');
}
const result = NEVER.pipe(startWith(7));
result.subscribe(x => console.log(x), info, info);
```
### 参见
* [<font color=#B7178C>Observable</font>](/doc/reference/index/observable.html)
* [<font color=#B7178C>EMPTY</font>](/doc/reference/index/empty.html)
* [<font color=#B7178C>of</font>](/doc/reference/index/of.html)
* [<font color=#B7178C>throwError</font>](/doc/reference/index/throwError.html)