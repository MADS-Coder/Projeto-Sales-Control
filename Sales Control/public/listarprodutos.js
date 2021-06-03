var lista_produtos = [];
//Busca as informações contidas dentro do banco de dados.
async function carregarProdutos(){
    
    const response = await axios.get('http://localhost:8000/produtos');

    const produtos = response.data

    const lista = document.getElementById('produtos_cadastrados');
    
    
    lista.innerHTML = ""
    
    //O laço abaixo cria as linhas e as celulas para cada atributo e
    //seguida coloca os dados vindos do formulario cadastrar na lista.
    produtos.forEach(produto => {
        const linha = document.createElement('tr')
        const linha_codigo = document.createElement('td')
        const linha_produdo = document.createElement('td')
        const linha_preco = document.createElement('td')
        const linha_quantidade = document.createElement('td')
        const linha_detalhes = document.createElement('td')
        
        var btEditar = document.createElement('a')
        var btRemover = document.createElement('a')
                
        linha_codigo.innerText = produto.codigo
        linha_produdo.innerText = produto.nome
        linha_preco.innerText = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        linha_quantidade.innerText = produto.qtd_produtos
        linha_detalhes.innerText = produto.detalhes 
        btEditar.innerHTML = '<a a class="fa fa-edit" onclick="openModal()" id="btnEditar"></a>'
        btRemover.innerHTML = '<a class="fa fa-trash" id="btnRemover"></a>'
        

        linha.appendChild(linha_codigo)
        linha.appendChild(linha_produdo)
        linha.appendChild(linha_preco)
        linha.appendChild(linha_quantidade)
        linha.appendChild(linha_detalhes)
        linha.appendChild(btEditar)
        linha.appendChild(btRemover)
        

        lista.appendChild(linha)
        
        btEditar.onclick = () => openModal(produto.id)
        btRemover.onclick = () => openModalConfirmacao(produto.codigo)
        lista_produtos.push([produto.id, produto.codigo, produto.nome, produto.preco, produto.qtd_produtos, produto.detalhes])
    });    
    //-------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------------------
    var tabela = document.getElementById('tdProdutos');
    var linhas = tabela.getElementsByTagName('tr');

    //Evento Click
    for(var i = 0; i < linhas.length; i++){
        var linha = linhas[i];
        linha.addEventListener("click", function(){
            selLinha(this, false); //Selecione apenas um
            //selLinha(this, true); //Selecione quantos quiser
        });
    }

    /**
    A função selLinha() vai ser responsável por adicionar ou remover a class “selecionado” do nó. Passamos também um parâmetro que vai determinar se poderá selecionar mais que uma linha ou apenas uma. O primeiro laço, caso múltiplos seja falso, irá apenas desmarcar todos as linhas antes de marcar a linha clicada
    Caso passe true, você pode selecionar multiplas linhas.
    Caso passe false, você só pode selecionar uma linha por vez.
    **/
    function selLinha(linha, multiplos){
        if(!multiplos){
            var linhas = linha.parentElement.getElementsByTagName("tr");
            for(var i = 0; i <linhas.length; i++){
                var linha_ = linhas[i];
                linha_.classList.remove("selecionado");
            }
        }
        linha.classList.toggle("selecionado");
    }
};


//A função faz com que o icone de editar seja aberto com os dados para serem atualizados.
async function openModal(id_produto){
    const modal = document.getElementById('dv-modal')
    if(typeof modal == 'undefined' || modal == null)
        return;
        modal.style.display = 'Block';
  
    for(var n = 0; n < lista_produtos.length; n++)
    {
        if(lista_produtos[n].includes(id_produto) == true)
        {
            lin_codigos = document.getElementById('codigo');
            lin_produto = document.getElementById('produto')
            lin_preco = document.getElementById('preco')
            lin_quantidade = document.getElementById('quantidade')
            lin_detalhes = document.getElementById('mensagem')  
            
            lin_codigos.value = lista_produtos[n][1]
            lin_produto.value = lista_produtos[n][2]
            lin_preco.value = lista_produtos[n][3]
            lin_quantidade.value = lista_produtos[n][4]
            lin_detalhes.value = lista_produtos[n][5]        
        }  
    } 
    AtualizarDados(id_produto)
}

//Fecha o formulario de edição.
function closeModal(){
    let modal = document.getElementById('dv-modal')

    if(typeof modal == 'undefined' || modal == null)
        return;
    modal.style.display = 'none';
}


//Atualiza as informações no formulario de editar, através da roa PUT.
function AtualizarDados(id_produto){
    const form_editar = document.getElementById('form-editar');
    const input_codigo = document.getElementById('codigo');
    const input_produtos = document.getElementById('produto');
    const input_preco = document.getElementById('preco');
    const input_quantidade = document.getElementById('quantidade');
    const textarea_mensagem = document.getElementById('mensagem');

    form_editar.onsubmit = async (event) =>{
        event.preventDefault()
        const codigo = input_codigo.value
        const produto = input_produtos.value
        const preco = input_preco.value
        const quantidade = input_quantidade.value
        const mensagem = textarea_mensagem.value

        await axios.put('http://localhost:8000/produtos/'+ id_produto,{
            codigo: codigo,
            nome: produto,
            preco: preco,
            qtd_produtos: quantidade,
            detalhes: mensagem
        });
        alert("Produto Atualizado!")
    }
}


//A função faz com que o icone de deletar seja aberto com a confirmação se deseja excluir ou não.
function openModalConfirmacao(produto_codigo){
    const modal = document.getElementById('dv-modal_confirmacao')
    if(typeof modal == 'undefined' || modal == null)
        return;
    modal.style.display = 'Block';

    const btSim = document.getElementById('botao-sim')

    btSim.onclick = async () =>{
        await axios.delete('http://localhost:8000/produtos/' + produto_codigo);  
        alert("Produto Deletado com sucesso!") 
    }
    
}


//Fecha o o botão de confirmação.
function closeModalConfirmacao(){
    let modal = document.getElementById('dv-modal_confirmacao')

    if(typeof modal == 'undefined' || modal == null)
        return;
    modal.style.display = 'none';
}

function formatarMoeda() {
    var elemento = document.getElementById('preco');
    var valor = elemento.value;

    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ".$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}).([0-9]{2}$)/g, ".$1,$2");
    }

    elemento.value = valor;
    if(valor == 'NaN') elemento.value = '';
}




//Afunção serve para inicializar e chamar as outras funções.
function App(){
    console.log('App Iniciada')
    carregarProdutos()
    AtualizarDados()
}
App()