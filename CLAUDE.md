# common-ITWorks (`@impostograma/common`)

Pacote npm **publicado publicamente** (`registry.npmjs.org`, `publishConfig.access:
"public"`) que fornece o roteamento e utilitários compartilhados pelos 12 microsserviços de
[`serverless-itworks`](https://github.com/IT-Works-Brasil/serverless-itworks). TypeScript,
compilado para `lib/` (`main`/`types` apontam para lá — não edite `lib/`, é gerado por
`npm run build`).

> O remote local deste repo já apontou para um fork pessoal
> (`Gabrielfreitas11/common-ITWorks`) em vez do da org — corrigido nesta sessão. Confirme
> `git remote get-url origin` aponta para `IT-Works-Brasil/common-ITWorks` antes de push.

## O que tem aqui — e onde está documentado o comportamento

| Módulo exportado | Export | Onde o comportamento está descrito em detalhe |
|---|---|---|
| `Router` (`src/router/`, via `AutoHandler`/`BaseHandler`) | `Router` | **[`serverless-itworks/CLAUDE.md`](../serverless-itworks/CLAUDE.md)**, seção "Arquitetura comum" — é lá que está o porquê de cada decisão (roteamento por `readdirSync`, `global.*` a partir de headers, `isAuthorized`, `setAWSLogLink`). Não duplique aqui: se o comportamento mudar, atualize lá. |
| `HttpResponse` | `HttpResponse` | idem — `HttpResponse.ok/created/badRequest/notFound/serverError/custom` |
| `Http` (`src/http/`) | `Http` | cliente HTTP — citado em `serverless-itworks/CLAUDE.md` ("loga toda resposta, inclusive sucesso — caro em rota de alto volume") |
| `Validator` | `Validator` | wrapper de validação (Joi) usado pelos controllers |
| `Cryptography` (`encrypt`/`decrypt`) | `Cryptography` | **não é a mesma implementação** usada em `serverless-auth/common/encrypt.js` (que tem seu próprio `createCipheriv('aes-256-cbc', ...)` independente) — duas implementações de criptografia convivem no ecossistema, não assuma que trocar uma afeta a outra |
| `Lambda`, `S3`, `SQS` (`src/aws/`) | idem | wrappers finos do SDK AWS |
| `Logger`, `Formatter`, `Functions`, `Email` | idem | utilitários de log estruturado, formatação, funções auxiliares, envio de e-mail |

## Cuidados ao editar

- **Este pacote é consumido por 12 serviços em produção via versão publicada no npm** — uma
  mudança de comportamento aqui não se propaga sozinha; cada serviço fixa a versão no seu
  `package.json` e precisa de `npm update @impostograma/common` + redeploy para sentir a
  mudança. Não assuma que editar aqui já corrige o comportamento em produção.
- Ao mudar o `Router`/`BaseHandler`, **atualize também `serverless-itworks/CLAUDE.md`** — a
  documentação detalhada do comportamento vive lá de propósito (perto de quem consome), não
  aqui.
- `version` em `package.json` precisa subir a cada publicação — confirme o fluxo de release
  (não investigado nesta sessão: procure `.github/workflows/` ou pergunte ao time antes de
  assumir que é manual).
