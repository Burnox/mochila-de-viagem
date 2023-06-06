// MINHA TENTATIVA
// var nomeItem = document.querySelector('#nome').value
// var quantidadeItem = document.querySelector('#quantidade').value

// var listaObjetos = document.querySelector('.lista')

// function adicionaItem(nomeItem, quantidadeItem) {
//   let objetoNovo = document.createElement('li')
//   objetoNovo.classList.add('item')

//   let numeroStrong = document.createElement('strong')
//   numeroStrong.innerHTML = quantidadeItem

//   let conteudoObjeto = document.createTextNode(numeroStrong + nomeItem)

//   objetoNovo.appendChild(conteudoObjeto)
//   listaObjetos.appendChild(objetoNovo)
// }

// ALURA
const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')

// consulta o localStorage para verificar se já existe dados armazenados, se não houver cria uma lista vazia para começar a armazenar
const itens = JSON.parse(localStorage.getItem('itens')) || []

itens.forEach(elemento => {
  criaElemento(elemento)
})

form.addEventListener('submit', evento => {
  evento.preventDefault()

  const nome = evento.target.elements['nome']
  const quantidade = evento.target.elements['quantidade']

  const existe = itens.find(elemento => elemento.nome === nome.value)

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value
  }

  if (existe) {
    itemAtual.id = existe.id

    atualizaItem(itemAtual)
    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
  } else {
    itemAtual.id = itens[itens.length] - 1 ? itens[itens.length - 1].id + 1 : 0

    criaElemento(itemAtual)

    //adiciona o itemAtual em um array de itens
    itens.push(itemAtual)
  }

  //armazena os valores do array de itens no localStorage
  //o localStorage só permite string, a função stringify transforma o array em JSON
  localStorage.setItem('itens', JSON.stringify(itens))

  //reseta os valores do formulário
  nome.value = ''
  quantidade.value = ''
})

function criaElemento(item) {
  const novoItem = document.createElement('li')
  novoItem.classList.add('item')

  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.quantidade
  numeroItem.dataset.id = item.id

  novoItem.appendChild(numeroItem)
  novoItem.innerHTML += item.nome
  novoItem.appendChild(botaoDeleta(item.id))

  lista.appendChild(novoItem)
}

function atualizaItem(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement('button')
  elementoBotao.innerText = 'X'

  elementoBotao.addEventListener('click', function () {
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento(tag, id) {
  tag.remove()

  //remover um item do array
  itens.splice(
    itens.findIndex(elemento => elemento.id === id),
    1
  )

  //escrever no localStorage
  localStorage.setItem('itens', JSON.stringify(itens))
}
