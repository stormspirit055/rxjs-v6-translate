### bindCallback <icon badge type='function'/> 
> 将回调Api转换成一个返回Observable的函数
```ts
bindCallback<T>(callbackFunc: Function, resultSelector?: Function | SchedulerLike, scheduler?: SchedulerLike): (...args: any[]) => Observable<T>
```
#### 参数
 | 键名 | 描述 |
 | --- | --- |
 | callbackFunc | Type: `Function` |
 | resultSelector | 可选项。默认是`undefined`。Type: `Function | SchedulerLike` |
 | scheduler | 可选项。默认是`undefined`。 调度回调函数的调度器 |

#### 返回
`(...args: any[]) => Observable<T>`:  返回一个方法, 该方法返回一个Observable, 并且其传递的值与回调函数传递的值相同。

#### 描述
> 给定一个`f(x, callback)`类型的函数, 它将会返回一个函数g, 并且在通过`g(x)`调用时会输出一个Observable。
`bindCallbaak`不算是一个操作符, 因为他的输入和输出都不是Observables。 输入是一个带有参数的函数。 最后一个参数必须完成`func`调用的回调函数。

`bindCallback`的输出项也是一个需要参数的方法, 其需要的参数同`func`一样, 需要最后一个参数为回调函数。当输出的方法被调用时它会返回个Observable。如何`func`方法使用一个参数调用它的回调, Observable将会派发一个值。 另一方面, 如果使用多个值调用回调, 则产生的Observable将会派发一个以所述值作为元素的数组。重要的是要记住, 输入函数func在输出函数被调用时不会被调用, 而在输出函数返回的Observable被订阅时会被调用。这意味着, 如果func发出AJAX请求, 则该请求将在有观察者订阅结果Observable时发出, 而不是在这之前。

最后一个可选参数 - `scheduler` - 可以被用作去控制在订阅者订阅Observable后何时去调用`func`, 以及传递给回调函数的结果何时被派发。 通常, Observable的订阅者调用`func`是同步的, 
但是使用[<font color=#B7178C>async</font>](/doc/reference/index/async.html)作为最后一个参数将会延时调用`func`, 就像外面包裹一层`setTimout(func, 0)`一样。如果你要使用异步调度器并订阅输出的Observable, 所以当前正在执行的方法将会在`func`调用前停止。

默认情况下, 传递给回调的结果将在`func`调用回调后立即派发。在某些情况下, 如果回调被同步调用, 那么结果Observable的订阅将会同步调用`next`方法。 如果你想去延时调用, 那么你可以像之前一样调用[<font color=#B7178C>async</font>](/doc/reference/index/async.html)。 这意味着通过使用`Scheduler.async`你可以确保`func`总是异步调用其回调, 以此来避免 terrifying Zalgo。

注意, 函数输出的Observable永远只派发单个值并且紧接着立刻完成(complete)。如果`func`调用回调多次, 再之后几次调用中派发的值将不会出现在流(stream)中。如果你需要去监听多次调用, 那么你可能需要用[<font color=#B7178C>fromEvent</font>](/doc/reference/index/async.html)或者[<font color=#B7178C>fromEventPattern</font>](/doc/reference/index/async.html)来代替

如果`func`依赖某些上下文(比如: `this`)并且没有绑定`this`, 那么`this`将会指向输出函数调用时的上下文。特别的是, 如果`func`被当做一些对象的方法来调用并且如果`func`尚未绑定`this`, 则为了保留上下文, 建议将输出函数的`this`也设置为该对象。

如果在node环境中输入函数调用它的回调(即callback的第一个参数是表示调用是失败的可选错误参数),[<font color=#B7178C>fromEvent</font>](/doc/reference/index/bindNodeCallback.html)提供了方便的错误处理, 可能是一个更好的选择。 `bindCallback`处理这类函数与其他一样, 会将错误参数(无论有没有传)解析为常规回调参数。

#### 示例

将jQuery的`getJSON`转换成Observable API
```ts
import { bindCallback } from 'rxjs';
import * as jQuery from 'jquery';

// Suppose we have jQuery.getJSON('/my/url', callback)
const getJSONAsObservable = bindCallback(jQuery.getJSON);
const result = getJSONAsObservable('/my/url');
result.subscribe(x => console.log(x), e => console.error(e));
```
接受一个参数数组传递给回调
```ts
import { bindCallback } from 'rxjs';

const someFunction = (value, cb) => {
  cb(value)
};
const boundSomeFunction = bindCallback(someFunction);
boundSomeFunction([1, 2]).subscribe(values => {
  console.log(values) // [1, 2]
});
```
比较有和没有`async`调度器的行为
```ts
import { bindCallback } from 'rxjs';
import { asyncScheduler } from 'rxjs';

function iCallMyCallbackSynchronously(cb) {
  cb();
}
const boundSyncFn = bindCallback(iCallMyCallbackSynchronously);
const boundAsyncFn = bindCallback(iCallMyCallbackSynchronously, null, asyncScheduler);
 
boundSyncFn().subscribe(() => console.log('I was sync!'));
boundAsyncFn().subscribe(() => console.log('I was async!'));
console.log('This happened...');
// Logs:
// I was sync!
// This happened...
// I was async!
```
在一个对象上使用`bindCallback`
```ts
import { bindCallback } from 'rxjs';

const obj = {
  a: 2,
  methodCallback: function(value, cb) {
    cb(value, this.a)
  }
}

const boundMethod = bindCallback(obj.methodCallback)
boundMethod.call(obj, 1)
  .subscribe(values => {
    console.log(values)
  })

```
#### 重载

* 详见[<font color=#B7178C>官方原文档</font>](https://rxjs-dev.firebaseapp.com/api/index/function/bindCallback)


