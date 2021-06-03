/*Envia as informações do vendas*/
function DadosVendas(){
    const form_vendas = document.getElementById('form-vendas')
    const in_codigo = document.getElementById('codigo')
    const in_produto = document.getElementById('produto')
    const in_cliente = document. getElementById('cliente')
    const in_preco = document.getElementById('preco')
    const in_quantidade = document.getElementById('quantidade')
    const in_tipo_pagamento = document.getElementById('tipo-pagamento')

    form_vendas.onsubmit = async (event) =>{
        event.preventDefault()
        const id_codigo = in_codigo.value
        const id_produto = in_produto.value
        const id_preco = in_preco.value
        const id_quantidade = in_quantidade.value
        const id_tipo_pagamento = in_tipo_pagamento.value
        const id_cliente = in_cliente.value

        await axios.post('http://localhost:8000/vendas',{
            codigo: id_codigo,
            nome: id_produto,
            preco: id_preco,
            quantidade: id_quantidade,
            tipo_de_pagamento: id_tipo_pagamento,
            nome_cliente: id_cliente
        })
        alert("Produto vendido com sucesso!")
    }
    
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

function App(){
    console.log('App Iniciada')
    DadosVendas()
}
App()