import { codes, reverseCodes } from "./data";

const criptoRule = (strCripto, cypher = true) => {
  let valorFinal = "";

  const aChaves = [77, 84, 79, 65, 73, 78, 67, 70, 82];

  const arrayCaracteres = strCripto.split("");

  arrayCaracteres.forEach((el, i) => {
    let n = reverseCodes[el];

    if (n > 31) {
      n = n - 32;

      const valor = cypher ? 1 : -1;

      n = n + aChaves[i % 9] * valor;

      n = n % 224;

      if (n < 0) {
        n = 224 + n;
      }

      n = n + 32;
    }

    valorFinal = valorFinal + codes[n];
  });

  return valorFinal;
};

const encrypt = (strCripto: string) => criptoRule(strCripto);
const decrypt = (strCripto: string) => criptoRule(strCripto, false);

export { encrypt, decrypt };
