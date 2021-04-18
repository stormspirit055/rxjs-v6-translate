### EMPTY <icon badge type='function'/> 
> 同没有调度器调用empty()返回的Observable实例一样。 最好使用这个去取代empty()
```ts
const EMPTY: any
```

### 举例
```ts
import { EMPTY } from "rxjs";

EMPTY.subscribe({
  next() {
    console.log("no data will arrived");
  },
  complete() {
    console.log("complete");
  },
});
// OUTPUT: complete

```