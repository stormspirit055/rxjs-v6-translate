### Observer <icon badge type='interface'/>
```ts
interface Observer<T> {
  closed?: boolean
  next: (value: T) => void
  error: (err: any) => void
  complete: () => void
}
```
### 类实现
* `Subscriber`
### 属性
| 属性| 类型 | 描述 |
| --- | --- | --- |
| closed | boolean | | 
| next | (value: T) => void | |
| error | (err: any) => void | |
| complete | () => void | |