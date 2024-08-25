
Let's say we have this function

```js
function post(request: Request): Response {
    return getClient().post(request);
}
```

To add tracing with request.model and response.result as span attributes, we will do this:

```js
function post(request: Request): Response {

    const impl = () => getClient().post(request);

    // the mapper is optional
    return trace(arguments, impl, requestMapper, responseMapper);
}

function requestMapper(args: IArguments): Map<string, any> {
    const map = new Map<string, any>();
    map.set("gen.ai.request.model", args[0].model);
    return map;
}

function responseMapper(response: Response): Map<string, any> {
    const map = new Map<string, any>();
    map.set("gen.ai.request.result", response.result);
    return map;
}
```
