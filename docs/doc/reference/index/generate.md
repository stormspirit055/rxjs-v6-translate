### generate <icon badge type='function'/> 
```ts
generate<T, S>(initialStateOrOptions: S | GenerateOptions<T, S>, condition?: ConditionFunc<S>, iterate?: IterateFunc<S>, resultSelectorOrObservable?: SchedulerLike | ResultFunc<S, T>, scheduler?: SchedulerLike): Observable<T>
```

#### 参数
| 键名 | 描述 |
| --- | --- | 
| initialStateOrOptions | Type: `S | GenerateOptions` |
| condition | 可选项。默认值: `undefined`。 Type: `ConditionFunc` | 
| iterate | 可选项。 默认值是`undefined`。 Type: `IterateFunc` |
| resultSelectorOrObservable | 可选项。 默认值是`undefined`。 Type: `SchedulerLike | ResultFunc ` |
| scheduler | 可选项。 默认值是`undefiend`。 Type: `SchedulerLike` |

#### 返回
`Observable<T>`

### 重载
* [<font color=#B7178C>官方原文档</font>](https://rxjs-dev.firebaseapp.com/api/index/function/generate)