class Produto {
    constructor() {
        this.id = 1;
        // a gente tem um objeto dentro do nosso array
        this.arrayProdutos = [];
        // o item q estiver diferente de null, vai significar q está então fazendo uma edição
        // se estiver igual null, então é uma inserção de dados, o q fará o btn trocar o nome para salvar
        this.editId = null;
    }

    salvar() {
        // quando clica no salvar, estará lendo nossos dados
        let produto = this.lerDados();
        if(this.validaCampo(produto)) {
            if(this.editId == null){
                this.adicionar(produto);
            } else {
                // arg passado será trocado pelo número do id que está sendo editado
                this.atualizar(this.editId, produto)
                // a gente passa outro param outro obj produto e no atualizar() recebemos nosso produto
            }
        }

        this.listaTabela();
        this.blank();
    }

    atualizar(id, produto){
        let btn = document.getElementById('btn1');
        btn.innerText = 'Atualizar';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            // verificando se os ids são iguais
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valorProduto = produto.valorProduto;
            }
            
        }
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

            // passamos para json para manipular no html. e na posição i pois agora estamos dentro do for()
            imgEdit.setAttribute("onclick", "produto.editar("+ JSON.stringify(this.arrayProdutos[i]) +")");

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
        // vamos converter p número decimal
        produto.valorProduto = parseFloat(produto.valorProduto)
        this.arrayProdutos.push(produto);
        this.id++;
    }

    editar(dados){
        this.editId = dados.id
        // a gente quer pegar os dados q "readicioná-los" nos inputs Produto e Valor
        // então estamos pegando pelo id do input e atribuindo a eles os nomes q havíamos dados no lerDados()
        this.atualizar()
        document.getElementById('nproduct').value = dados.nomeProduto;
        document.getElementById('vproduct').value = dados.valorProduto;
    }

    lerDados() {
        let produto = {}
        // ok adicionamos pra dentro do produto esses 3 campos
        // pra podermos receber o id, tivemos q ir no salvar e botar como um var
        produto.id = this.id;
        // nós q estamos dando o nomeProduto e valorProduto aqui
        produto.nomeProduto = document.getElementById('nproduct').value;
        produto.valorProduto = document.getElementById('vproduct').value;

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

    blank() {
        document.getElementById('nproduct').value = '';
        document.getElementById('vproduct').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        // após realizar edição, então tbm temos q limpar os dados, então voltando o editid para null novamente
        this.editId = null;
    }

    deletar(id){
        // se confirmar
        if(confirm('Você tem certeza que deseja excluir o ID ' + id + '?')){
            let tbody = document.getElementById('tbody');
            // vamos ter que percorrer os itens do nosso array p verificar se nosso id recebido é o mesmo id que tem no array
            for(let i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    // aqui vai acontecer o deletar do nosso registro array
                    // splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
                    // passando índice do array e segunda arg é quantos registros queremos deletar
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }


}

// temos q instaciar esse nosso objeto

var produto = new Produto()