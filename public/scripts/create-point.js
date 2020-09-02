// API do IBGE
// Estados - https://servicodados.ibge.gov.br/api/docs/localidades?versao=1#api-UFs-estadosGet
// Municípios - https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios
//Função para buscar dados de estados
function popularUF() {
    // Busca campo do html que receberá a atualização da listas com todos os estados
    const stateSelect = document.querySelector("select[name=uf]")
    // Api do IBGE para listar estados
    // fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // Ordenando por estados
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then((res) => { return res.json() }) // Recebe JSON com resposta
        .then(states => {
            // Percorre e lista todos os estados
            for (const state of states) {
                //Adicona todos os estados na lista de opções de estados dinamicamente usando id e nome dos estados
                stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}
// Chamar e executar a função
popularUF()

function getCities(event) {

    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    // console.log(event.target.value)
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    //Limpa campo da cidade
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    // Bloqueia campo cidade 
    citySelect.disabled = true
    fetch(url)
        .then((res) => { return res.json() })
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}
// vai entrar no html e pegar um campo input
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
// Pegar todos os <li>'s

const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handelSelectedItem)
}


const collectedItens = document.querySelector("input[name=items]")

let selectedItens = []

function handelSelectedItem(event) {

    const itemLi = event.target

    //Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itenId = itemLi.dataset.id




    // Verificar se existem itens selecionados
    // Pegar itens selecionados

    const alreadySelected = selectedItens.findIndex(item => {
        const itenFound = item == itenId
        return itenFound
    })

    console.log(alreadySelected >= 0)

    // Se já estiver selecionado,
    if (alreadySelected >= 0) {
        // tirar da selação
        const filteredItens = selectedItens.filter(item => {
            const itenIsDiferent = item != itenId
            return itenIsDiferent
        })

        selectedItens = filteredItens

    } else {
        // Se não estiver selecionado
        // Adicionar á seleção
        selectedItens.push(itenId)
    }

    // console.log(selectedItens)
    // Atualizar o campo escondido com os itens selecionados
    collectedItens.value = selectedItens



}
