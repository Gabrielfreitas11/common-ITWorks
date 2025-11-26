
const aChaves = [77, 84, 79, 65, 73, 78, 67, 70, 82];

const transformarCaracteres = (input: string, multiplicador: number) => {
  let resultado = "";

  for (let i = 0; i < input.length; i++) {
    let n = input.charCodeAt(i);

    if (n > 31) {
      n = n - 32;
      n = n + (aChaves[i % aChaves.length] * multiplicador);
      n = n % 224;
      if (n < 0) n = 224 + n;
      n = n + 32;
    }

    resultado += String.fromCharCode(n);
  }

  return resultado;
}

const encrypt = (strOriginal: string) => {
  const transformado = transformarCaracteres(strOriginal, 1);
  const buffer = Buffer.from(transformado, 'utf-8');
  return buffer.toString('hex');
}

const decrypt = (hexString: string) => {
  const buffer = Buffer.from(hexString, 'hex');
  const input = buffer.toString('utf-8');
  return transformarCaracteres(input, -1);
}

export { encrypt, decrypt };
