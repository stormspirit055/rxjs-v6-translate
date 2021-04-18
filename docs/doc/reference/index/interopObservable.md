### interopObservable <icon badge type='type-alias'/> 
```ts
type InteropObservable<T> = {
    [Symbol.observable]: () => Subscribable<T>;
};
```
