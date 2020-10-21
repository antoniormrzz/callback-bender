declare function wrap_EFC_multiple(func: Function, names?: string[]): (...args: any[]) => Promise<any>;
declare function wrap_EFC_single(func: Function): (...args: any[]) => Promise<any>;
declare function wrap_EFC(func: Function): (...args: any[]) => Promise<any>;
declare function wrap_CP_multiple(func: Function, names?: string[]): (...args: any[]) => Promise<any>;
declare function wrap_CP_single(func: Function): (...args: any[]) => Promise<any>;
declare function wrap_CP(func: Function): (...args: any[]) => Promise<any>;
export namespace efc {
    export { wrap_EFC_multiple as multiple };
    export { wrap_EFC_single as single };
    export { wrap_EFC as none };
}
export namespace node {
    export { wrap_EFC_multiple as multiple };
    export { wrap_EFC_single as single };
    export { wrap_EFC as none };
}
export namespace cp {
    export { wrap_CP_multiple as multiple };
    export { wrap_CP_single as single };
    export { wrap_CP as none };
}
export namespace normal {
    export { wrap_CP_multiple as multiple };
    export { wrap_CP_single as single };
    export { wrap_CP as none };
}
export {};