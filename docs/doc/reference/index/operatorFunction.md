### OperatorFunction <icon badge type='interface'/> 
```ts
interface OperatorFunction<T, R> extends UnaryFunction, Observable> {

  // inherited from index/UnaryFunction
  (source: T): R
}
```
### 子接口
* `MonoTypeOperatorFunction`