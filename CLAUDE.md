# CLAUDE.md — Contexto do common-ITWorks para sessões de Claude Code

## ① O que é este projeto

`@impostograma/common` — pacote npm **publicado publicamente**
(`registry.npmjs.org`, `publishConfig.access: "public"`) que fornece o roteamento e os
utilitários compartilhados pelos 12 microsserviços de
[`serverless-itworks`](https://github.com/IT-Works-Brasil/serverless-itworks).
TypeScript, compilado para `lib/`.

No ecossistema ITWorks: é a base de que quase todo serverless da casa depende — o
`Router` que transforma pasta em rota, o `HttpResponse` que dá forma ao envelope, os
wrappers de Lambda/S3/SQS. O [`serverless-emalote`](../serverless-emalote) também o
consome.

## ② Leis do projeto (invioláveis — não proponha exceções)

1. **Este repositório é PÚBLICO.** Tudo que entrar aqui — código, comentário, nome de
   tabela, URL interna, massa de teste — é lido por qualquer pessoa na internet.
   Nenhum dado de cliente, nenhum segredo, nenhuma referência a infraestrutura
   interna que não precise estar exposta.
2. **Não edite `lib/`.** É gerado por `npm run build`; `main` e `types` apontam para
   lá. Editar `lib/` some no próximo build.
3. **Mudança aqui NÃO chega sozinha em produção.** Cada um dos 12 serviços fixa a
   versão no `package.json` dele e precisa de `npm update @impostograma/common` +
   redeploy. Não assuma que editar aqui já corrigiu o comportamento lá.
4. **Ao mudar o `Router`/`BaseHandler`, atualize também
   `serverless-itworks/CLAUDE.md`.** A documentação detalhada do comportamento vive
   lá de propósito — perto de quem consome —, não aqui.
5. **`version` no `package.json` sobe a cada publicação.**
   [confirmar-com-o-dono] — não há `.github/workflows/`, então o release parece ser
   manual; confirme antes de publicar.
6. **Comportamento nasce de SPEC aprovada.** Sem SPEC, não implemente — proponha a
   SPEC. [confirmar-com-o-dono] — a régua da Verdade Única só liga com o checklist de
   prontidão assinado.

## ③ Stack e convenções

**TypeScript, compilado com `tsc` para `lib/`. Jest (com `ts-jest` e babel) para
teste. Nx presente (`.nx/`), mas o `package.json` só declara `test` e `build`.**

Dependências de runtime: `aws-sdk`, `axios`, `joi`, `nodemailer`,
`barcode-validator`.

**Duas implementações de criptografia convivem no ecossistema.** O `Cryptography`
deste pacote **não é o mesmo** de `serverless-auth/common/encrypt.js`, que tem o
próprio `createCipheriv('aes-256-cbc', ...)` independente. Trocar um **não** afeta o
outro — e é fácil supor o contrário.

**Convenção de commit:** `tipo(escopo): descrição` — `feat(router):`,
`feat(httpResponse):`, `chore:`. O histórico antigo tem mensagens livres
(`subindo ajustes`); as recentes seguem o padrão.

**Branches:** `docs/...`, `refactor/...` no remoto.

## ④ Fluxo de trabalho

Branch → commit → push → PR contra `main`. Guardião: **Gabriel**
[confirmar-com-o-dono].

Antes de entregar: `npm run build` (tsc) e `npm test` (jest) passando.

**Confirme o remote antes do push.** O remote local deste repositório já apontou para
um fork pessoal (`Gabrielfreitas11/common-ITWorks`) em vez do da organização — hoje
`git remote get-url origin` responde `IT-Works-Brasil/common-ITWorks`, mas vale
conferir.

**Publicação:** manual, subindo a `version` (lei 5). Não há workflow no repositório.

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

## ⑤ Comandos

```bash
npm install
npm run build   # tsc → lib/
npm test        # jest
```

Não há script de lint nem de publicação no `package.json`.

## ⑥ Mapa

O que é exportado por `src/index.ts`, e onde o comportamento está documentado em
detalhe:

| Módulo exportado | Export | Onde o comportamento está descrito em detalhe |
|---|---|---|
| `Router` (`src/router/`, via `AutoHandler`/`BaseHandler`) | `Router` | **[`serverless-itworks/CLAUDE.md`](../serverless-itworks/CLAUDE.md)**, seção "Arquitetura comum" — é lá que está o porquê de cada decisão (roteamento por `readdirSync`, `global.*` a partir de headers, `isAuthorized`, `setAWSLogLink`). Não duplique aqui: se o comportamento mudar, atualize lá. |
| `HttpResponse` | `HttpResponse` | idem — `HttpResponse.ok/created/badRequest/notFound/serverError/custom` |
| `Http` (`src/http/`) | `Http` | cliente HTTP — citado em `serverless-itworks/CLAUDE.md` ("loga toda resposta, inclusive sucesso — caro em rota de alto volume") |
| `Validator` | `Validator` | wrapper de validação (Joi) usado pelos controllers |
| `Cryptography` (`encrypt`/`decrypt`) | `Cryptography` | **não é a mesma implementação** usada em `serverless-auth/common/encrypt.js` (que tem seu próprio `createCipheriv('aes-256-cbc', ...)` independente) — duas implementações de criptografia convivem no ecossistema, não assuma que trocar uma afeta a outra |
| `Lambda`, `S3`, `SQS` (`src/aws/`) | idem | wrappers finos do SDK AWS |
| `Logger`, `Formatter`, `Functions`, `Email` | idem | utilitários de log estruturado, formatação, funções auxiliares, envio de e-mail |

```
src/router/           handler/AutoHandler.ts, handler/BaseHandler.ts,
                      middleware/setAWSLogLink.ts — o roteamento por pasta
src/httpResponse/     o envelope das respostas
src/http/             cliente HTTP
src/cryptography/     encrypt/decrypt (ver a ressalva das DUAS implementações, §③)
src/aws/              lambda.ts, s3.ts, sqs.ts — wrappers finos do SDK
src/validator/  src/logger/  src/formatter/  src/functions/  src/email/  src/@types/
lib/                  SAÍDA do build — não edite (lei 2)
common-2/             [confirmar-com-o-dono] — diretório paralelo, propósito não documentado
```

## ⑦ Protocolo de Memória e Continuidade (obrigatório)

A memória do sistema NÃO está na cabeça do Claude — vive no vault. Portanto:

1. **Consultar ANTES de pedir ou criar:** `itworks-verdade-unica/_cross-system/` —
   esta biblioteca **é** infraestrutura compartilhada, e o que muda aqui muda para
   todos + `_demandas/` (quadro de voo). [confirmar-com-o-dono] — a Plataforma não
   tem fatia própria na Verdade Única.
2. **Diário = fonte da verdade viva:** decisões são apendadas no diário da fatia na
   hora — nunca reescritas.
3. **Trabalho entra SÓ por SPEC chancelada.** Demanda de corredor volta ao pipeline.
4. **Ritual de abertura:** toda sessão começa pelo
   `itworks-verdade-unica/_processo/PROMPT-BOM-DIA.md`.
5. **Mudou a verdade** (schema/comportamento/contrato)? Sinalizar re-derivação da
   fatia (estágio 7 do pipeline) no PR. Aqui **toda mudança de comportamento do
   `Router` ou do `HttpResponse` é isso**: ela atravessa 12 serviços, com atraso, na
   velocidade em que cada um sobe a versão.

⚠️ E lembre da lei 1 ao escrever qualquer coisa: **este repositório é público.** Nada
que descreva infraestrutura interna, nome de banco ou regra de cliente entra aqui —
esse conteúdo vai para a Verdade Única ou para o vault, que são privados.

Para gravar conhecimento novo no vault Obsidian, use a skill `/nota`.
