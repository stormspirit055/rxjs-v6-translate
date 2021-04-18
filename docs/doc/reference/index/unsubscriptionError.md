### UnsubscriptionError <icon badge type='interface'/>
> 当对某个[<font color=#B7178C>Subscription</font>](/doc/reference/index/Subscription.html)`unsubscribe`碰到一个或多个异常时抛出的异常
```ts
interface UnsubscriptionError extends Error {
  get errors: any[]
}
```
### 属性
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| errors | any[] | 只读 |