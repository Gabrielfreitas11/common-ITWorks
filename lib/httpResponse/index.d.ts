export declare class HttpResponse {
    static ok(body: any, status?: string): {
        [status]: number;
        body: any;
    };
    static custom(body: any, status?: string): {
        [status]: number;
        body: any;
        custom: boolean;
    };
    static created(body: any, status?: string): {
        [status]: number;
        body: any;
    };
    static notFound(body: any, status?: string): {
        [status]: number;
        body: any;
    };
    static badRequest(body: any, status?: string): {
        [status]: number;
        body: any;
    };
    static serverError(body: any, status?: string): {
        [status]: number;
        body: any;
    };
}
