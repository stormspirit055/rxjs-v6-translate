### Subscription(订阅)
**什么是订阅?** - Subscription代表一种可清理资源的对象, 通常是Observabl的执行。 Subscription有一个重要的方法, 即`unsubscribe`, 它不需要任何参数, 只要用来清理被Subscription占用的资源。在上一个版本的RxJS中, subscription叫做'Disposable'(可清理对象)。
``` js
import { interval } from 'rxjs';
const observable = interval(1000);
const subscription = observable.subscribe(x => console.log(x))
// later: 
// 这会取消正在执行的Observable, Observable执行是通过使用观察者调用subscribe方法启动的。
```
> Subscription基本上只有一个unsubscribe()函数用来释放资源或是取消Observable的执行。
Subscription是可以合在一起的, 这样一个Subscription调用`unsubscribe()`方法, 可能会有多个subscription取消订阅。你可以通过把一个Subscription添加到另一个上面来做这件事:
```js
import { interval } from 'rxjs';

const observable1 = interval(400);
const observable2 = interval(300);

const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

subscription.add(childSubscription);

setTimeout(() => {
  // 同时对subscription和childSubscription取消订阅
  subscription.unsubscribe();
}, 1000);
```
如下输出:
```js
second: 0
first: 0
second: 1
first: 1
second: 2
```
Subscriptions同样拥有一个`remove(otherSubscription)`方法, 用来取消添加的子订阅(child Subscription)。