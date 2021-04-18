### observedValueOf <icon badge type='type-alias'/>
```ts
type ObservedValueOf<O> = O extends ObservableInput<infer T> ? T : never;
```