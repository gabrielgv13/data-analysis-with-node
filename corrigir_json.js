/*
Script para corrigir o banco.json:
- Adiciona uma vírgula após cada entrada (linha que termina com "}"),
  exceto na última entrada.
- Envolve o conteúdo em colchetes [ ] para formar um array JSON válido.
- Não adiciona vírgula duplicada caso a linha já termine com "},".
*/

const fs = require("fs");

const caminho = __dirname + "/banco.json";

try {
    const conteudo = fs.readFileSync(caminho, "utf-8");

    // Divide em linhas, remove espaços extras e linhas vazias
    const linhas = conteudo
        .split("\n")
        .map((linha) => linha.trim())
        .filter((linha) => linha.length > 0);

    // Adiciona vírgula após cada entrada, exceto a última
    const linhasCorrigidas = linhas.map((linha, i) => {
        const ehUltima = i === linhas.length - 1;
        const jaTemVirgula = linha.endsWith("},");

        if (linha.endsWith("}") && !ehUltima && !jaTemVirgula) {
            return linha + ",";
        }
        return linha;
    });

    // Envolve em colchetes para formar um array JSON válido
    const jsonValido = "[\n" + linhasCorrigidas.join("\n") + "\n]";

    fs.writeFileSync(caminho, jsonValido);

    // Valida o resultado
    JSON.parse(jsonValido);
    console.log("Arquivo corrigido com sucesso! JSON válido com " + linhas.length + " entradas.");
} catch (erro) {
    console.log("Ocorreu algum erro ao corrigir o arquivo:", erro);
}