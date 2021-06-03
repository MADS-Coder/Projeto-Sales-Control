//Busca as informações contidas dentro do banco de dados.
async function carregarVendas(){
    
    const response = await axios.get('http://localhost:8000/vendas');

    const vendas = response.data

    const lista = document.getElementById('produtos_vendidos');
    
    lista.innerHTML = ""
    
    //O laço abaixo cria as linhas e as celulas para cada atributo e
    //seguida coloca os dados vindos do formulario cadastrar na lista.
    vendas.forEach(venda => {
        const linha = document.createElement('tr')
        const linha_codigo = document.createElement('td')
        const linha_produdo = document.createElement('td')
        const linha_preco = document.createElement('td')
        const linha_quantidade = document.createElement('td')
        const linha_pagamento = document.createElement('td')
        const linha_cliente = document.createElement('td')
        
        linha_codigo.innerText = venda.codigo
        linha_produdo.innerText = venda.nome
        linha_preco.innerText = venda.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        linha_quantidade.innerText = venda.quantidade
        linha_pagamento.innerText = venda.tipo_de_pagamento
        linha_cliente.innerText =  venda.nome_cliente


        linha.appendChild(linha_codigo)
        linha.appendChild(linha_produdo)
        linha.appendChild(linha_preco)
        linha.appendChild(linha_quantidade)
        linha.appendChild(linha_pagamento)
        linha.appendChild(linha_cliente)
 
        lista.appendChild(linha)
    });    

};


//Afunção serve para inicializar e chamar as outras funções.
function App(){
    console.log('App Iniciada')
    carregarVendas()
   
}
App()