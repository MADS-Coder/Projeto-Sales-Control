/*Envia as informações do produto*/
function DadosCadastro(){
    const form_cadastrar = document.getElementById('form-cadastrar')
    const input_codigo = document.getElementById('codigo')
    const input_produtos = document.getElementById('produto')
    const input_preco = document.getElementById('preco')
    const input_quantidade = document.getElementById('quantidade')
    const textarea_mensagem = document.getElementById('mensagem')

    form_cadastrar.onsubmit = async (event) =>{
        event.preventDefault()
        const codigo = input_codigo.value
        const produto = input_produtos.value
        const preco = input_preco.value
        const quantidade = input_quantidade.value
        const mensagem = textarea_mensagem.value

        await axios.post('http://localhost:8000/produtos',{
            codigo: codigo,
            nome: produto,
            preco: preco,
            qtd_produtos: quantidade,
            detalhes: mensagem
        })
        alert('Cadastro realizado!') 
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
    DadosCadastro()   
}
App()