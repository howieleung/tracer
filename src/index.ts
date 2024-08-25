/*
This file contains users implementation

*/


import { Request, Response, getClient, trace } from "./helper";

/*
    let's say we would like to trace this function
    function post(request: Request): Response {
        return getClient().post(request);
    }
    To do this, we move the implementation into an inner function followed by calling trace function
*/
function post(request: Request): Response {

    const impl = () => getClient().post(request);

    // the mapper is optional
    return trace(arguments, impl, requestMapper, responseMapper);
}

post({model: "my model", uri: "uri"});

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
