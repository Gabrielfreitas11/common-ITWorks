/**
 * @param controllersPath - Caminho(s) para a(s) pasta(s) contendo os controllers das rotas.
 * @param allowMethodsDiableCors - Métodos com CORS desabilitado.
 * @param publicMethods - Métodos que não exigem autenticação.
 *                        O nome deve corresponder ao nome do arquivo/pasta do controller.
 * @param middlewares - Middlewares adicionais que processam a requisição/resposta.
 */
declare const AutoHandler: (controllersPath: any, allowMethodsDiableCors: any, publicMethods?: string[], ...middlewares: any[]) => {};
export default AutoHandler;
