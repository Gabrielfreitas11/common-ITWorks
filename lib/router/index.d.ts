/**
 * Inicializa o roteador automático de rotas Lambda.
 *
 * @param dir - Caminho(s) para a(s) pasta(s) contendo os controllers das rotas.
 *              Pode ser uma string ou um array de strings.
 * @param allowMethodsDiableCors - Lista de métodos (rotas) que terão o CORS desabilitado.
 *                                  Padrão: `[]`
 * @param publicMethods - Lista de métodos (rotas) que **não** exigem autenticação.
 *                        O nome deve corresponder exatamente ao nome do arquivo/pasta do controller.
 *                        Padrão: `[]`
 *
 * @example
 * Router(
 *   [dirUser, dirApi, dirGestores],
 *   [],               // allowMethodsDiableCors
 *   ["login", "webhook"] // rotas públicas, sem autenticação
 * );
 */
declare const handler: (dir: any, allowMethodsDiableCors?: never[], publicMethods?: string[]) => {};
export { handler };
