const asc = (str) => {
  return str.charCodeAt(0)
}

const criptoRule = (strCripto, cypher = true) => {
  let valorFinal = ''

  let Valor

  const aChaves = [77, 84, 79, 65, 73, 78, 67, 70, 82]

  const arrayCaracteres = strCripto.split('')

  arrayCaracteres.forEach((el, i) => {
    let numeroCalculo = asc(el)

    if (numeroCalculo > 31) {
      numeroCalculo = numeroCalculo - 32
      if (cypher) {
        Valor = 1
      } else {
        Valor = -1
      }
      numeroCalculo = numeroCalculo + aChaves[i % 9] * Valor

      numeroCalculo = numeroCalculo % 224

      if (numeroCalculo < 0) {
        numeroCalculo = 224 + numeroCalculo
      }

      numeroCalculo = numeroCalculo + 32
    }

    valorFinal = valorFinal + String.fromCharCode(numeroCalculo)
  })

  return valorFinal
}

module.exports = {
  encrypt: (strCripto) => criptoRule(strCripto),

  decrypt: (strCripto) => criptoRule(strCripto, false),
}
