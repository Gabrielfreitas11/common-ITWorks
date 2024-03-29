interface HttpResponseInterface {
  body: {
    [key: string]: any;
  };
  status: string;
}
export class HttpResponse {
  static ok({ body, status = 'statusCode' }: HttpResponseInterface) {
    return {
      [status]: 200,
      body,
    };
  }

  static created({ body, status = 'statusCode' }: HttpResponseInterface) {
    return {
      [status]: 201,
      body,
    };
  }

  static notFound({ body, status = 'statusCode' }: HttpResponseInterface) {
    return {
      [status]: 404,
      body,
    };
  }

  static badRequest({ body, status = 'statusCode' }: HttpResponseInterface) {
    return {
      [status]: 400,
      body,
    };
  }

  static serverError({ body, status = 'statusCode' }: HttpResponseInterface) {
    return {
      [status]: 500,
      body,
    };
  }
}
