import { HttpResponseModel } from "../../@types/http";
export default class BaseHandler {
    event: any;
    context: null;
    env: NodeJS.ProcessEnv;
    /** Métodos (rotas) que não exigem autenticação */
    publicMethods: string[];
    /** Métodos (rotas) que não devem logar entrada nem saída */
    noLogMethods: string[];
    handle(event: any, context: any, method: any): Promise<{
        statusCode: number;
        body: any;
        headers: any;
    }>;
    setFunctionContext(event: any, context: any): void;
    static httpResponse(data: HttpResponseModel): {
        statusCode: number;
        body: any;
        headers: any;
    };
    isAuthorized(): boolean;
    authHeaderIsTheSameInTheEnvironment(): boolean;
}
