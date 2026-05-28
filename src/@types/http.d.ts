export interface HttpResponseModel {
  statusCode: number;
  body: any;
  headers?: any;
  /**
   * Quando `true`, esta resposta NÃO recebe o campo `awsFilter`
   * (link do CloudWatch) injetado pelo middleware. A flag é removida
   * antes do retorno, então não aparece no body enviado ao cliente.
   */
  disableAwsFilter?: boolean;
}
