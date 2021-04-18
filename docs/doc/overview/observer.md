### Observer(观察者)
什么是Observer(观察者)?观察者是由Observable发送的值的消费者。观察者只是一组回调函数的集合, 每个回调函数对应一种Observable发送的通知类型: `next`, `error`, `complate`。下面的示例是一个典型的观察者对象:
```js
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
```
要使用观察者, 需要把它提供给Observable的`subscribe`的方法。
```js
observable.subscribe(observer);
```
> Observers 只是有三个回调函数的对象, 每个回调函数对应一种Observable发送的通知类型
RxJS中的观察者不一定需要完整的(即3种类型的回调), 如果你没有提供某个回调函数, Observable的执行也会正常运行, 只是某些通知类型会被忽略, 因为观察者中没有相对应的回调函数。
下面的例子是没有`complate`回调函数的观察者。
```js
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
};
```
当订阅Observable时, 你可能只提供了一个回调函数作为参数, 而并没有将其附加到观察者身上, 例如这样:
``` js
observable.subscribe(x => console.log('Observer got a next value: ' + x));
```
在`observable.subscribe`内部, 它会创建一个观察者对象并使用第一个回调函数参数作为`next`的处理方法。三种类型的回调函数都可以直接作为参数的来提供:
```js
observable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);
```


