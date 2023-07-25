1. Functions, it's effect
2. Dependencies array -> determines when effect is run.
   By default effects run after every completed render.

   ### Part2_Altering data on the server

   **REST**
Individual data objects in REST are called _resources_.
Every _resource_ has a unique address, ie. its url.
HTTP PUT: _replace_ resource.
HTTP PATCH: Change some of the resource properties.

**Promises and errors**
`.catch` can be used to handle promise rejection.

```
.then().catch(error => console.log(error))
```

If you place a `.catch` at the end of a _promise chain_, it will be called once any promise in the chain throws an error and the promise becomes rejected.