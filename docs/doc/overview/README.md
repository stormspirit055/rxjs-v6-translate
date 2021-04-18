## 概览

### 简介
RxJs是一个库, 它通过使用observable(可观察对象)序列来编写异步和基于事件的程序. 它提供了一个核心的类型[<font color=#B7178C>Oberservable</font>](xxx), 附属类型(Observer, Shcedulers, Subjects) 以及受[<font color=#B7178C>Array#etras</font>](xxx)启发的操作符(map, filter, reduce, every等等), 这些操作符可以把异步事件当做集合来处理。
> 可以把RxJS当做处理事件的lodash

ReactiveX结合了[<font color=#B7178C>观察者模式</font>](xxx), [<font color=#B7178C>迭代器模式</font>](xxx), [<font color=#B7178C>使用集合的函数式编程</font>](xxx), 以满足以一种理想的方式来管理事件序列所需要的一切。

以下是一些处理异步事件管理所必要的基础概念: 
* Observable(可观察对象): 是一个概念, 这个概念是一个可调用未来值和事件的集合。
* Observer(观察者): 是一个回调集合, 它知道如何去监听由Obervable提供的值。
* Subscription(订阅): 代表一个Observable的执行, 主要用于取消Observable的执行。
* Operators(操作符): 采用函数式编程风格的纯函数, 使用像```map```, ```filter```, ```concat```, ```reduce```这样的操作符来处理一些集合
* Subject(主题): 等同于一个事件派发器(EventEmitter), 是将值或事件[<font color=#B7178C>多播</font>](xxx)给Observer的唯一方式
* Schedulers(调度器): 用来控制并发并且是中央集权的调度员, 允许我们在计算发生时进行协调, 例如```setTimeout``` 或 ```requestAnimationFrame``` 或其他

### 第一个示例

通常你注册事件监听器
``` js
document.addEventListener('click', () => console.log('Clicked!'));
```
用RxJS你可以创建一个`observable`替代
``` js
import { fromEvent } from 'rxjs';
fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));
```
#### Purity(纯净性)
使得RxJS强大的正是他使用纯函数来产生值的能力。这意味着你的代码不容易出错。
通常你会创建一个非纯函数, 在这个函数之外也使用了共享变量的代码, 这将使得你的应用状态一团糟。
``` js
let count = 0;
const button = document.querySelector('button');
button.addEventListener('click', () => console.log(`Clicked ${count++} times`}))
```
使用RxJS你可以隔离(isolate)状态
``` js
import { fromEvent } from 'rxjs'
import { scan } from  'rxjs/operators'
fromEvent(document, 'click')
  .pipe(scan(count => count + 1, 0))
  .subscribe(count => console.log(`Clicked ${count} times`))
```
`scan`操作符的工作原理与数组的`reduce`相似。它需要一个暴露给回调函数当参数的初始值, 每次回调函数运行后返回的值将成为下次回调函数运行时的参数。

#### Flow(流动性)
RxJS提供了一整套操作符来帮助你去控制事件如何去流经`observables`。
下面的代码展示的是如何控制一秒钟内最多点击一次, 先来看普通Js版本
``` js
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
document.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${count++} times`);
    lastClick = Date.now();
  }
})
```
RxJS版本: 
``` js
import { fromEvent } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';

fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    scan(count => count + 1, 0)
  )
  .subscribe(count => console.log(`Clicked ${count} times`));
```
其他流程控制操作符还有[<font color=#B7178C>filter</font>](xxx), [<font color=#B7178C>delay</font>](xxx), [<font color=#B7178C>debounceTime</font>](xxx), [<font color=#B7178C>take</font>](xxx), [<font color=#B7178C>takeUntil</font>](xxx), [<font color=#B7178C>distinct</font>](xxx), [<font color=#B7178C>distinctUntilChanged</font>](xxx), etc

#### Values(值)

对于流经`observables`的值, 你可以转化它们。
下面展示的是如何累计鼠标点击的x坐标, 普通JS版本:
``` js
let count = 0;
const rate = 1000;
let laskClick = Date.now() - rate;
document.addEventListener('click', event => {
  if (Date.now() - lastClick >= rate) {
    count += event.clientX;
    console.log(count);
    lastClick = Date.now();
  }
});
```
RxJS版本:
``` js
import { fromEvent } from 'rxjs';
import { throttleTime, map, scan } from 'rxjs/operators';
fromEvent(document, 'click')
  .pipe(
    throttleTime(1000),
    map(event => event.clientX),
    scan((count, clientX) => count + clientX, 0)
  )
  .subscribe(count => console.log(count));
```
其他产生值的操作符有[<font color=#B7178C>pluck</font>](xxx), [<font color=#B7178C>pairwise</font>](xxx), [<font color=#B7178C>sample</font>](xxx) etc。