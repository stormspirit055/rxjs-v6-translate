### MonoTypeOperatorFunction <icon badge type='interface'/> 
```ts
interface MonoTypeOperatorFunction<T> extends OperatorFunction {

  // inherited from index/OperatorFunction

  // inherited from index/UnaryFunction
  (source: T): R
}
```