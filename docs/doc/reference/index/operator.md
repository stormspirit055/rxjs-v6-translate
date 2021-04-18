### Operator <icon badge type='interface'/> 
```ts
interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: any): TeardownLogic
}
```
### 方法
* call()

```ts
call(subscriber: Subscriber<R>, source: any): TeardownLogic
```
####  参数
| 键名 | 描述 |
| subscriber | Type: `Subscriber` |
| source | Type: `any` |
#### 返回
`TeardownLogic`