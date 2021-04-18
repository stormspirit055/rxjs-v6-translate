### iif <icon badge type='function'/> 
> 在订阅时决定哪个Observable会被真实订阅。
```ts
iif<T = never, F = never>(condition: () => boolean, trueResult: SubscribableOrPromise<T> = EMPTY, falseResult: SubscribableOrPromise<F> = EMPTY): Observable<T | F>
```
#### 参数
| 键名 | 描述 | 
| condition | 影响哪个Observable被选择 | 
| trueResult | 可选项。默认值是`EMPTY`。Type: `SubscribableOrPromise` |
| falseResult | 可选项。默认值是`EMPTY`。Type: `SubscribableOrPromise` | 
#### 返回
`Observable<T | F>`: 第一个还是第二个Observable, 都取决于`condition`。

### 描述
> Observables的`if`语句。
`iif`接受一个状态方法(`condition function`)和两个Observable。 当一个由操作符返回的Observable被订阅时, 状态方法会被调用。 基于被调用时返回的布尔值, 消费者会订阅第一个Observable(如果condition为true)或第二个(如果condition为false)。 状态方法可能不会返回任何东西 - 在这种情况下, condition会被估算成`false`并且第二个Observable会被订阅。

注意, 对于两种情况(condition为true或false), Observable都是可选项。 如果condition指向的Observable为`undefined`, 结果流会立即结束。这样你可以在运行时确定使用者是否应有权访问给定的Observable, 而不是控制将订阅哪个Observable。

如果你有更复杂的逻辑, 需要在两个以上的Observable做选择, [<font color=#B7178C>defer</font>](/doc/reference/index/defer.html)是更好的选择。事实上`iif`可以被`defer`简单实现, 并且`iif`存在的意义仅仅是方便和可读性。

### 举例
在运行时改变那个将会被订阅的Observable。
```ts
import { iif, of } from 'rxjs';

let subscribeToFirst;
const firstOrSecond = iif(
  () => subscribeToFirst,
  of('first'),
  of('second'),
);

subscribeToFirst = true;
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "first"

subscribeToFirst = false;
firstOrSecond.subscribe(value => console.log(value));

// Logs:
// "second"
```
控制对Obervable的访问
```ts
let accessGranted;
const observableIfYouHaveAccess = iif(
  () => accessGranted,
  of('It seems you have an access...'), // 注意, 这里只能传递一个Observable给操作符
);

accessGranted = true;
observableIfYouHaveAccess.subscribe(
  value => console.log(value),
  err => {},
  () => console.log('The end'),
);

// Logs:
// "It seems you have an access..."
// "The end"

accessGranted = false;
observableIfYouHaveAccess.subscribe(
  value => console.log(value),
  err => {},
  () => console.log('The end'),
);

// Logs:
// "The end"
```

### 参见
* [<font color=#B7178C>defer</font>](/doc/reference/index/defer.html)

