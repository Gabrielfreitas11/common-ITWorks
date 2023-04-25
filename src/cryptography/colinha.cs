Public Function FormatCriptoInfoCliente(ByVal StrCripto As String, ByVal BolAcao As Boolean) As String
        'BolAcao = true = criptografa / false = descriptografa
        Dim X, i, N, Valor  'Declaração das variáveis.
        Dim aChaves(9) 'Declaração do Array que contem as chaves de criptografia
        aChaves(0) = 77 'Atribuição dos valores dos caracteres que serão utilizados
        aChaves(1) = 84 'como chave de criptografia
        aChaves(2) = 79
        aChaves(3) = 65
        aChaves(4) = 73
        aChaves(5) = 78
        aChaves(6) = 67
        aChaves(7) = 70
        aChaves(8) = 82
        X = "" 'Atribui o valor vazio para a variável X
        For i = 1 To Len(StrCripto) 'Inicia um Loop For que deve ser repetido a quantidade de vezes de acordo com o tamanho da String que deve ser criptografada.
            N = Asc(Mid(StrCripto, i, 1))
            If N > 31 Then 'mantém controles intactos
                N = N - 32 'desconsidera controles (Caracteres de 0 a 31)
                If BolAcao Then
                    Valor = 1
                Else
                    Valor = -1
                End If
                N = N + (aChaves((i - 1) Mod 9)) *Valor
                N = N Mod 224 ' Caracteres 256 - 32 desconsiderados
                If N < 0 Then
                    N = 224 + N
                End If
                N = N + 32 ' Reajusta para caracteres normais
            End If
            X = X & Chr(N) 'Armazena na variável X os caracteres que foram modificados
        Next
        FormatCriptoInfoCliente = X 'Retorna o valor da variável X para a função
    End Function