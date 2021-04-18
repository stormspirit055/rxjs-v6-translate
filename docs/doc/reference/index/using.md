### Using <icon badge type='function'/>
> 创建一个Observable, 它可以创建一个与该Observable有相同寿命并且在该Observable结束时会被处理(dispoes)的资源。 
```ts
using<T>(resourceFactory: () => void | Unsubscribable, observableFactory: (resource: void | Unsubscribable) => any): Observable<T>
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| resourceFactory | 创建任意资源对象的工厂函数, 该资源对象实现了`unsubscribe`方法。 |
| observableFactory | 创建一个Observable的工厂函数, 该Observable可使用注入的资源对象。 |
#### 返回
`Observable<T>`: 一个有着同`observableFactory`返回的Observable一样行为的Observable, 但是它在完成(`completed`), 异常(`error`), 取消订阅(`unsubscribe`)时也会对创建的资源对象调用其已实现的`unsubscribe`方法。
#### 描述
> 当你想要在Observable完成时对资源做清理时可以使用该操作符
`using`是一个工厂操作符, 它接受2个参数。第一个方法返回一个可以处理的资源对象。它可以是任意一个实现了`unsubscribe`方法的对象。第二个方法将会被注入一个方法返回的资源对象其自身返回一个Observable。这个Observable可以在其执行期间使用资源对象。上述两个传递给`using`的方法会在被该Observable被订阅时调用。多个订阅之间不会共享两个方法各自返回的资源对象和Observable。

当`using`放回的Observable被订阅时, 第二个函数返回的Observable也会被调用。其(指第二个函数返回的Observable))所有的通知(next, complete, error)也会被`using`返回的Observable(无改变的)派发。如果返回的Observable被取消订阅或者源Observable(第二个函数返回的Observable)完成(或异常)时, 资源对象的`unsubscribe`会被调用。它可以用来做任何必要的清理。注意如果操作者对Observable执行`unsubscribe`则不会触发完成或者异常的通知派发, 所以`using`可以被用作一个钩子, 来确保所有需要在Observable执行期间存在的资源能够在合适的时候被处置。

### 举例
```ts
import { using, Observable } from 'rxjs';
function DisposableResource(value) {
  this.value = value;
  this.disposed = false;
}

DisposableResource.prototype.getValue = function () {
  if (this.disposed) {
    throw new Error('Object is disposed');
  }
  return this.value;
};

DisposableResource.prototype.unsubscribe = function () {
  this.disposed = true
  this.value = null
  console.log('unsubscribbe')
}

const result = using(
  function () { return new DisposableResource(42); },
  function (resource: any) {
    var subject = new Observable(subscriber => {
      subscriber.next(resource.getValue())
      setTimeout(() => {
        console.log(resource.getValue())
      }, 3000)
      subscriber.unsubscribe()
    })
    return subject;
  }
)
result.subscribe(x => console.log(x));
```
### 参见
* [<font color=#B7178C>defer</font>](/doc/reference/index/defer.html)