export declare class HttpResponse {
    static ok(body: any, status?: string): {
        [x: string]: any;
        body: any;
    };
    static custom(body: any, status?: string): {
        [x: string]: any;
        body: any;
        custom: boolean;
    };
    static created(body: any, status?: string): {
        [x: string]: any;
        body: any;
    };
    static notFound(body: any, status?: string): {
        [x: string]: any;
        body: any;
    };
    static badRequest(body: any, status?: string): {
        [x: string]: any;
        body: any;
    };
    static serverError(body: any, status?: string): {
        [x: string]: any;
        body: any;
    };
}
