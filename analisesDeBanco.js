/*
X Descobrir qual o aluno com a maior nota da turma e o aluno com a menor nota;
X Descobrir uma relação entre a quantidade de horas de sono e a nota dos estudantes;
X Descobrir uma relação de nível de estresse dos estudantes com a renda familiar do mesmo;
X Descobrir uma relação entre a nota dos estudantes com o gênero do mesmo.
*/

const { log, table } = require("console");
const { json } = require("stream/consumers");

let jsonString

try{
    const fs = require("fs")
    jsonString = fs.readFileSync(__dirname + "/banco.json")
} catch (erro){
    console.log('Ocorreu algum erro ao ler arquivo:', erro);
    return
}

const listaAlunos = JSON.parse(jsonString)


function maiorNotaRepetida(){
    console.log("Alunos com a nota mais alta: ");

    // Cópia da lista com ... > spread
    const alunosOrdenados = [...listaAlunos]

    // Arrow function com ordem descrescente de número
    const ordDecr = (a, b) => b.Nota_Total - a.Nota_Total;

    // Armazena a maior nota achada
    const aNotaMaisAlta = alunosOrdenados.sort(ordDecr)[0].Nota_Total;

    // Filtro comparando itens da lista com a MAIOR nota achada
    const absolutaNotaMaisAlta = e => e.Nota_Total >= aNotaMaisAlta;
    const listaAbsolutaNotas = listaAlunos.filter(absolutaNotaMaisAlta)

    console.table(listaAbsolutaNotas.map((x) => `${x.Nome} ${x.Sobrenome} - Nota: ${x.Nota_Total}`));
}
maiorNotaRepetida()


function relacaoSonoNota(){
    console.log("Relação entre horas de sono e nota dos estudantes: ");

    // Arrow function para calcular a média das notas de uma lista
    const mediaNotas = lista => lista.reduce((soma, e) => soma + e.Nota_Total, 0) / lista.length;

    // Arrow functions para categorizar as horas de sono
    const sonoBaixo = e => e.Horas_Sono_Noite < 6;
    const sonoMedio = e => e.Horas_Sono_Noite >= 6 && e.Horas_Sono_Noite <= 7;
    const sonoAlto = e => e.Horas_Sono_Noite > 7;

    // Filtros com as arrow functions
    const listaSonoBaixo = listaAlunos.filter(sonoBaixo);
    const listaSonoMedio = listaAlunos.filter(sonoMedio);
    const listaSonoAlto = listaAlunos.filter(sonoAlto);

    // Tabela com a média de notas por categoria de sono
    console.table([
        { Categoria: "Menos de 6h", Alunos: listaSonoBaixo.length, MediaNota: mediaNotas(listaSonoBaixo).toFixed(2) },
        { Categoria: "Entre 6h e 7h", Alunos: listaSonoMedio.length, MediaNota: mediaNotas(listaSonoMedio).toFixed(2) },
        { Categoria: "Mais de 7h", Alunos: listaSonoAlto.length, MediaNota: mediaNotas(listaSonoAlto).toFixed(2) },
    ]);
}
relacaoSonoNota()


function relacaoEstresseRenda(){
    console.log("Relação entre nível de estresse e renda familiar: ");

    // Arrow function para calcular a média do nível de estresse de uma lista
    const mediaEstresse = lista => lista.reduce((soma, e) => soma + e["Nivel_Estresse (1-10)"], 0) / lista.length;

    // Arrow functions para filtrar por renda familiar
    const rendaBaixa = e => e.Renda_Familiar === "Baixa";
    const rendaMedia = e => e.Renda_Familiar === "Média";
    const rendaAlta = e => e.Renda_Familiar === "Alta";

    // Filtros com as arrow functions
    const listaRendaBaixa = listaAlunos.filter(rendaBaixa);
    const listaRendaMedia = listaAlunos.filter(rendaMedia);
    const listaRendaAlta = listaAlunos.filter(rendaAlta);

    // Tabela com a média de estresse por renda familiar
    console.table([
        { Renda: "Baixa", Alunos: listaRendaBaixa.length, MediaEstresse: mediaEstresse(listaRendaBaixa).toFixed(2) },
        { Renda: "Média", Alunos: listaRendaMedia.length, MediaEstresse: mediaEstresse(listaRendaMedia).toFixed(2) },
        { Renda: "Alta", Alunos: listaRendaAlta.length, MediaEstresse: mediaEstresse(listaRendaAlta).toFixed(2) },
    ]);
}
relacaoEstresseRenda()


function relacaoNotaGenero(){
    console.log("Relação entre nota e gênero dos estudantes: ");

    // Arrow function para calcular a média das notas de uma lista
    const mediaNotas = lista => lista.reduce((soma, e) => soma + e.Nota_Total, 0) / lista.length;

    // Arrow functions para filtrar por gênero
    const generoFeminino = e => e.Genero === "Feminino";
    const generoMasculino = e => e.Genero === "Masculino";

    // Filtros com as arrow functions
    const listaFeminino = listaAlunos.filter(generoFeminino);
    const listaMasculino = listaAlunos.filter(generoMasculino);

    // Tabela com a média de notas por gênero
    console.table([
        { Genero: "Feminino", Alunos: listaFeminino.length, MediaNota: mediaNotas(listaFeminino).toFixed(2) },
        { Genero: "Masculino", Alunos: listaMasculino.length, MediaNota: mediaNotas(listaMasculino).toFixed(2) },
    ]);
}
relacaoNotaGenero()
