class Livros {
    constructor(titulo, autor, capa, paginas, sinopse, nota) {
        this.titulo = titulo
        this.autor = autor
        this.capa = capa
        this.paginas = paginas
        this.sinopse = sinopse
        this.nota = nota
        
    }
}

const novapagina = document.getElementById(`novapagina`)

function AbrirAdicionar() {
    novapagina.innerHTML += `
            <div id="sombra">
        <div class="menu-geral">
            <div class="fechar">
                <button onclick="fecharmenu()" class="botao-fechar">x</button>
                </div>
            <p class="menu-geral-titulo">Novo Livro</p>
            <label for="form-titulo">Título do Livro:</label>
            <input type="text" id="form-titulo" name="form-titulo" placeholder="1984">
            <br>
            <label for="form-autor">Nome do Autor:</label>
            <input type="text" id="form-autor" name="form-autor" placeholder="George Orwell">
            <br>
            <label for="form-capa">Link da Capa do Livro:</label>
            <input type="url" id="form-capa" name="form-capa" placeholder="https://capa-1984-george-orwell.png">
            <br>
            <label for="form-paginas">Número de Páginas:</label>
            <input type="number" id="form-paginas" name="form-paginas">
            <br>
            <label for="form-sinopse">Sinopse do Livro:</label>
            <textarea rows="4" cols="50" id="form-sinopse" name="form-sinopse" placeholder="1984 é um famoso romance inglês escrito pelo autor modernista George Orwell. Publicado pela primeira vez em 1949, ele conta a história de Winston Smith, um cidadão inserido em um contexto de repressão. Ele vive na Inglaterra de 1984, chamada de Oceânia. Nesse regime totalitarista, todos são vigiados pelo Grande Irmão."></textarea>
            <br>
            <label for="form-nota">Nota do Livro:</label>
            <input type="number" min="0" max="10" id="form-nota" name="form-nota" placeholder="10" >
            <br>
            <button name="AddLivroslista" id="AddLivroslista" onclick="AddBooks()">Adicionar Livro</button>
            <div id="blockaddbooks"></div>
        </div>
    </div>
    `
    document.getElementById(`sombra`).style.display = "flex";
    document.getElementById(`sombra`).style.zIndex = "10";
    
    document.querySelector(`.menu-geral`).style.display =  "block"

}

const livrosLista = [] // array kakkaa
const acresclivros = document.getElementById(`acreslivros`)
const blockaddbooks = document.getElementById(`blockaddbooks`)


function AddLivroNaLista() {
    for (let i = 0; i < livrosLista.length; i++) {
        acresclivros.innerHTML += `
    <div class="livro-padrao" id="id${i}">
                    <div class="livro-titulo">
                        <p class="livro-titulo-texto">${livrosLista[i].titulo}</p>
                    </div>
                </div>
    
    `
        var idatual = document.getElementById(`id${i}`)
        idatual.style.backgroundImage = `url(${livrosLista[i].capa})`
        idatual.style.backgroundSize = "cover";
        idatual.style.backgroundPosition = "center";
    }
}

function AdicionarLivro(titulo, autor, capa, paginas, sinopse, nota) {
    const novoLivro = new Livros(titulo, autor, capa, paginas, sinopse, nota)
    livrosLista.push(novoLivro)
 }

function AddBooks() {
    var titulo = document.getElementById(`form-titulo`).value
    var autor = document.getElementById(`form-autor`).value
    var capa = document.getElementById(`form-capa`).value
    var paginas = document.getElementById(`form-paginas`).value
    var sinopse = document.getElementById(`form-sinopse`).value
    var nota = document.getElementById(`form-nota`).value

    flagLivroIgual = false

    for (const i of livrosLista) {
        if (i.autor.toLowerCase() === autor.toLowerCase() && i.titulo.toLowerCase() === titulo.toLowerCase()) { 
            flagLivroIgual = true
            break
        }
    }
    if (titulo == "") {
        alert(`Você precisa digitar um NOME no título do seu livro.`)
        
        
    } else if (nota < 0 || nota > 10) {
        window.alert(`Digite uma nota VÁLIDA! \n Ela precisa estar entre 0 e 10.`)
        
    } else if (flagLivroIgual != true) {
        AdicionarLivro(titulo, autor, capa, paginas, sinopse, nota)
        console.log(livrosLista)
        AddLivroNaLista()
    } else {
        var blockaddbooks = document.getElementById(`blockaddbooks`)
        alert( ` Não é possível adicionar um livro com mesmo nome e mesmo autor!`)
    }

}
    
function fecharmenu() {
    document.getElementById(`sombra`).style.display = "none";
    
}