### NotificationKind <icon badge type='enum'/>
#### 弃用说明
不推荐使用`NotificationKind`, 因为const枚举与隔离模块不兼容。请改用字符串文字。
```ts
enum NotificationKind {
  NEXT: 'N'
  ERROR: 'E'
  COMPLETE: 'C'
}
```
### 属性
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| Next | 'N' | |
| ERROR | 'E' | |
| COMPLETE | 'C' | |