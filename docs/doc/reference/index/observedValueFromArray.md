### observedValueFromArray <icon badge type='type-alias'/>
```ts
type ObservedValuesFromArray<X> = X extends Array<ObservableInput<infer T>> ? T : never;
```