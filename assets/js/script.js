class Produto {
    constructor() {
        this.id = 1
        // a gente tem um objeto dentro do nosso array
        this.arrayProdutos = []
    }

    salvar() {
        // quando clica no salvar, estará lendo nossos dados
        let produto = this.lerDados();
        if(this.validaCampo(produto)) {
            this.adicionar(produto);
        }

        this.listaTabela();
        this.cancelar();
    }


    // funçao q vai listar os dados de dentro do nosso array
    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acao = tr.insertCell();

            // inserção dos textos
            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = 'R$ ' + this.arrayProdutos[i].valorProduto;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'assets/img/editar-texto.png';

            let imgDelete = document.createElement('img');
            imgDelete.src = 'assets/img/excluir.png';
            // agr temos que atribuir uma função ao nosso delete com setattribute
            // damos um evento e uma ação como atributo
            // para acessarmos deletar(), devemos acessar o objeto produto e o nome da função
            // e temos q passar dentro desse método qual o id que queremos deletar
            // "+ this.arrayProdutos[i].id +"
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id +")");

            td_acao.appendChild(imgEdit);
            td_acao.appendChild(imgDelete);
        }
    }

    adicionar(produto){
        this.arrayProdutos.push(produto);
        this.id++;
    }

    lerDados() {
        let produto = {}
        // ok adicionamos pra dentro do produto esses 3 campos
        // pra podermos receber o id, tivemos q ir no salvar e botar como um var
        produto.id = this.id;
        // nós q estamos dando o nomeProduto
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valorProduto = document.getElementById('valor').value;

        return produto;
    }

    validaCampo(produto) {
        let res = ''
        // pq se estiver vazia, é pq o user não está dentro das condiçoes abaixo
        if(produto.nomeProduto == ''){
            res += '- Informe o nome do produto!\n';
        }

        if(produto.valorProduto == ''){
            res += '- Informe o valor do produto';
        }

        if(res != ''){
            alert(res);
            return false
        }
        return true
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';
    }

    deletar(id){
        // vamos ter que percorrer os itens do nosso array p verificar se nosso id recebido é o mesmo id que tem no array
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                // aqui vai acontecer o deletar do nosso registro array
                // splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
                // passando índice do array e segunda arg é quantos registros queremos deletar
                this.arrayProdutos.splice(i, 1)
                
            }
        }
    }

    editar(){
        alert('editar')
    }
}

// temos q instaciar esse nosso objeto

var produto = new Produto()