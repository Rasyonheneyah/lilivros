

// ------- Classe Livro -------
class Livros {
    constructor(titulo, autor, capa, paginas, sinopse, nota, id) {
        //   Inicializa um novo objeto com as informações do livro
        this.titulo = titulo
        this.autor = autor
        this.capa = capa
        this.paginas = paginas
        this.sinopse = sinopse
        this.nota = nota
        this.id = crypto.randomUUID().slice(0, 8) 
        // fatia o código pra apenas 8 caracteres
        
        while (livrosLista.some(livro => livro.id === this.id)) {
            this.id = crypto.randomUUID().slice(0, 8)
        }
    }
}

// ------- VARIÁVEIS NECESSARIAS -------

const livrosLista = [] // array kakkaa
const acresclivros = document.getElementById(`acreslivros`)
const blockaddbooks = document.getElementById(`blockaddbooks`)
const novapagina = document.getElementById(`novapagina`)
const bpgeral = document.getElementById(`bp-geral`)

// -------- Barrar HTML EXTERNO --------------

function BarHTMLExterno(contAtual) {

    const blockCarac = [
        { Carac: '<', substituto: '&lt;'  },
        { Carac: '>', substituto: '&gt;'  },
        { Carac: '&', substituto: '&amp;'  },
        { Carac: '"', substituto: '&quot;'  },
        { Carac: `'`, substituto: '&apos;'  },
        { Carac: '`', substituto: '&#x60;'  },
    ]

    var contFinal = ''
    // Percorre cada letra da string e substitui caracteres especiais
    for (let i = 0; i < contAtual.length; i++) {
        let c = contAtual[i] // Caractere atual
        for (let n = 0; n < blockCarac.length; n++) {
            c = c == blockCarac[n].Carac ? blockCarac[n].substituto : c;
        }
        contFinal = contFinal + c // Acumula no resultado final
    }   
    
    return contFinal;
} 



function AbrirAdicionar() {
    // // Cria dinamicamente o formulário para adicionar um novo livro no DOM
  
    document.getElementById(`sombra`).style.display = "flex"; // ocupa toda a tela
    document.getElementById(`sombra`).style.zIndex = "10"; // Sombra fica acima do conteúdo normal
    
    document.querySelector(`.menu-geral`).style.display =  "block" // dá pra usar 

}


function AddLivroNaLista() {
    // PARA MELHORAR: 
    // O código dos livros tem sido reescrito continuamente, gastando processamento desnecessário. Será necessário acrescentar individualmente.
    /*for (let i = 0; i < livrosLista.length; i++) { // índice da lista de livros
        acresclivros.innerHTML += `
    <div class="livro-padrao" id="id${livrosLista[i].id}">
                    <div class="livro-titulo">
                        <p class="livro-titulo-texto">${livrosLista[i].titulo}</p> 
                    </div>
                </div>
    
    
    Código Anterior ACIMA
    Iterava toda a lista repepetidamente, solucionado usando o .length -1 na lista, porque dessa forma o elemento a ser adicionado sempre será o último da lista.
    `*/

     acresclivros.innerHTML += `
    <div class="livro-padrao" id="id${livrosLista[livrosLista.length - 1].id}">
                    <div class="livro-titulo">
                        <p class="livro-titulo-texto">${livrosLista[livrosLista.length - 1].titulo}</p> 
                    </div>
                </div>
    `
        
        var titlivros = document.querySelector(`p.livro-titulo-texto`) // Pega a tag do título
       // titlivros.innerText = ``
        var idatual = document.getElementById(`id${livrosLista[livrosLista.length - 1].id}`) // transforma o id atual em uma variável para ser usada para manipular o livro pelo id

        // Manipulações pelo id
        idatual.style.backgroundImage = `url(${livrosLista[livrosLista.length - 1].capa})` 
        idatual.style.backgroundSize = "contain";
    idatual.style.backgroundPosition = "center";
    idatual.style.backgroundRepeat = 'no-repeat'
    /*}*/
}

function AdicionarLivro(titulo, autor, capa, paginas, sinopse, nota) {
    const novoLivro = new Livros(titulo, autor, capa, paginas, sinopse, nota)
    livrosLista.push(novoLivro)
    
    //Cria um novo objeto da classe Livros com os dados fornecidos e adiciona esse objeto à lista de livros.
}

function ValidarLivro() {
 
   // Pega os valores dos inputs
var titulo = document.getElementById('form-titulo').value;
var autor = document.getElementById('form-autor').value;
var capa = document.getElementById('form-capa').value;
var paginas = document.getElementById('form-paginas').value;
var sinopse = document.getElementById('form-sinopse').value;
var nota = document.getElementById('form-nota').value;

// Aplica a função BarHTMLExterno depois
titulo = BarHTMLExterno(titulo);
autor = BarHTMLExterno(autor);
capa = BarHTMLExterno(capa);
sinopse = BarHTMLExterno(sinopse);


    // flag por padrão é false
    flagLivroIgual = false


    // Verificar se há livro com mesmo título e autor
    for (const i of livrosLista){
        if (i.autor.toLowerCase() === autor.toLowerCase() && i.titulo.toLowerCase() === titulo.toLowerCase()) { 
            flagLivroIgual = true
            break
        }
    }

    // Verificar se REALMENTE Digitou um nome pro titulo
    if (titulo == "") {
        alert(`Você precisa digitar um NOME no título do seu livro.`)
        
        
    } // Verificar se a nota está válida
    else if (nota < 0 || nota > 10) {
        window.alert(`Digite uma nota VÁLIDA! \n Ela precisa estar entre 0 e 10.`)
        
    } // Verificar se não já existe um livro com esse nome e autor 
    else if (flagLivroIgual != true) { // no caso se Se não tiver a flag True de livro igual, adiciona o livro
        AdicionarLivro(titulo, autor, capa, paginas, sinopse, nota)
        console.log(livrosLista)
        AddLivroNaLista()
        fecharmenu()
    } // senão vai bloquear a adição
    else {
        var blockaddbooks = document.getElementById(`blockaddbooks`)
        alert( ` Não é possível adicionar um livro com mesmo nome e mesmo autor!`)
    }

}
    
function fecharmenu() {
    document.getElementById(`sombra`).style.display = "none";
    
}
/*
bpgeral.addEventListener('input', () => {
    let bpinput = bpgeral.value
    for (let i of livrosLista) {
        let livroBP = document.getElementById(`id${i.id}`)
        if  (bpinput.toLowerCase ||  i.titulo.toLowerCase || i.autor.toLowerCase || bpinput == '') {
            livroBP.style.display = 'flex'
        } else {
            livroBP.style.display = 'none'
        }
    }
});

    
*/