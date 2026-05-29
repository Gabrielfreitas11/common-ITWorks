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
    /**
     * Marca uma resposta para NÃO receber o campo `awsFilter` (link do CloudWatch).
     * Composável com qualquer um dos demais métodos.
     *
     * @example
     * return HttpResponse.noAwsFilter(HttpResponse.ok(body));
     * return HttpResponse.noAwsFilter(HttpResponse.custom(body));
     */
    static noAwsFilter<T extends object>(response: T): T & {
        disableAwsFilter: boolean;
    };
}
