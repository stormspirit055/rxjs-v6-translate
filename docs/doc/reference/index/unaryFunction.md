### UnaryFunction <icon badge type='interface'/>
> 操作符接口
```ts
interface UnaryFunction<T, R> {
  (source: T): R
}
```
子接口
* `OperatorFunction`
  * MonoTypeOperatorFunction

### 方法
* call signature
```ts
(source: T): R
```
#### 参数
| 键名 | 描述 |
| --- | --- |
| source | Type:`T` |
#### 返回
`R`