export function getClient() {
    return ({
        post: (request: Request) => (
            {
                result: "model result",
                uri: request.uri
            })
        });
};

export interface Request {
    uri: string;
    model: string;
}

export interface Response {
    result: string;
    uri: string;
}


/*
Instead of create a real span, I create a dummy object using mappers instead
*/
export function trace<Arguments, Return>(
    args: Arguments, methodToTrace: () => Return, 
    paramAttributeMapper?: (args: Arguments) => Map<string, any>, 
    returnAttributeMapper?: (rt: Return) => Map<string, any>): Return {

    const span: any = {};
    if (paramAttributeMapper) {
        const mappedArgs = paramAttributeMapper(args);
        for (let [key, value] of mappedArgs) {
            span[key] = value;
            }        
    } else {
        span["args"] = JSON.stringify(args);
    }

    const rt = methodToTrace();
    if (returnAttributeMapper) {
        const mappedReturn = returnAttributeMapper(rt);
        for (let [key, value] of mappedReturn) {
            span[key] = value;
        }       
    } else {
        span["return"] = JSON.stringify(rt);
    }

     console.log(span);

     return rt;
}


