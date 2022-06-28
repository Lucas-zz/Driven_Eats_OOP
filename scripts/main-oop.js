class Produto {
    constructor(produto, tipo) {
        this.nome = produto.nome;
        this.imagem = produto.imagem;
        this.descricao = produto.descricao;
        this.preco = produto.preco;
        this.tipo = tipo;
    }

    criaDisplay() {
        const criaElemento = document.createElement("div");
        criaElemento.classList.add("opcao");
        criaElemento.addEventListener("click", this.selecionar.bind(this));
        criaElemento.innerHTML = `
        <img src="${this.imagem}" />
        <div class="titulo">${this.nome}</div>
        <div class="descricao">${this.descricao}</div>
        <div class="fundo">
            <div class="preco">R$ ${this.preco.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
    `;
        this.criaElemento = criaElemento;
    }

    selecionar() {
        const selecionado = document.querySelector(`.${this.tipo} .selecionado`);
        if (selecionado !== null) selecionado.classList.remove("selecionado");

        this.criaElemento.classList.add("selecionado");

        pedido[this.tipo] = {
            nome: this.nome,
            preco: this.preco,
        }

        pedido.verificaSelecao();
    }
}
class Pedido {
    constructor() {
        this.prato = null;
        this.bebida = null;
        this.sobremesa = null;
    }

    verificaSelecao() {
        if (this.prato && this.bebida && this.sobremesa) {
            btnPedir.classList.add("ativo");
            btnPedir.disabled = false;
            btnPedir.innerHTML = "Fazer pedido";
        }
    }

    verificarPrecoTotal() {
        return (
            this.prato.preco +
            this.bebida.preco +
            this.sobremesa.preco
        );
    }

    verificarPedido() {
        const modal = document.querySelector(".overlay");
        modal.classList.remove("escondido");

        document.querySelector(".confirmar-pedido .prato .nome").innerHTML = this.prato.nome;
        document.querySelector(".confirmar-pedido .prato .preco").innerHTML = this.prato.preco.toFixed(2);

        document.querySelector(".confirmar-pedido .bebida .nome").innerHTML = this.bebida.nome;
        document.querySelector(".confirmar-pedido .bebida .preco").innerHTML = this.bebida.preco.toFixed(2);

        document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML = this.sobremesa.nome;
        document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML = this.sobremesa.preco.toFixed(2);

        document.querySelector(".confirmar-pedido .total .preco").innerHTML = this.verificarPrecoTotal().toFixed(2);
    }

    confirmarPedido() {
        const telefoneRestaurante = 553299999999;
        const mensagem = encodeURIComponent(
            `Olá, gostaria de fazer o pedido: 
            \n - Prato: ${this.prato.nome}
            \n - Bebida: ${this.bebida.nome}
            \n - Sobremesa: ${this.sobremesa.nome}
            \nTotal: R$ ${this.verificarPrecoTotal().toFixed(2)}
            `
        );

        const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${mensagem}`;
        window.open(urlWhatsapp);
    }

    cancelarPedido() {
        const modal = document.querySelector(".overlay");
        modal.classList.add("escondido");
    }
}

const pratos = [
    {
        nome: "Estrombelete de Frango",
        imagem: "img/frango_yin_yang.png",
        descricao: "Um pouco de batata, um pouco de salada",
        preco: 14.9,
    },
    {
        nome: "Asa de Boi",
        imagem: "img/frango_yin_yang.png",
        descricao: "Com molho shoyu",
        preco: 14.9,
    },
    {
        nome: "Carne de Monstro",
        imagem: "img/frango_yin_yang.png",
        descricao: "Com batata assada e farofa",
        preco: 14.9,
    },
];

const bebidas = [
    {
        nome: "Coquinha gelada",
        imagem: "img/coquinha_gelada.png",
        descricao: "Lata 350ml",
        preco: 4.9,
    },
    {
        nome: "Caldo de Cana",
        imagem: "img/coquinha_gelada.png",
        descricao: "Copo 600ml",
        preco: 4.9,
    },
    {
        nome: "Corote Gelado",
        imagem: "img/coquinha_gelada.png",
        descricao: "Garrafa 400ml",
        preco: 4.9,
    },
];

const sobremesas = [
    {
        nome: "Pudim",
        imagem: "img/pudim.png",
        descricao: "Gosto de doce de leite",
        preco: 7.9,
    },
    {
        nome: "Flam",
        imagem: "img/pudim.png",
        descricao: "Gosto de chocolate",
        preco: 7.9,
    },
    {
        nome: "Brigadeiro",
        imagem: "img/pudim.png",
        descricao: "3 unidades",
        preco: 7.9,
    },
];

const pedido = new Pedido();

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

const pratosContainer = document.querySelector(".opcoes.prato");
pratos.forEach((prato) => {
    const produto = new Produto(prato, "prato");
    produto.criaDisplay();
    pratosContainer.appendChild(produto.criaElemento);
});

const bebidasContainer = document.querySelector(".opcoes.bebida");
bebidas.forEach((bebida) => {
    const produto = new Produto(bebida, "bebida");
    produto.criaDisplay();
    bebidasContainer.appendChild(produto.criaElemento);
});

const sobremesasContainer = document.querySelector(".opcoes.sobremesa");
sobremesas.forEach((sobremesa) => {
    const produto = new Produto(sobremesa, "sobremesa");
    produto.criaDisplay();
    sobremesasContainer.appendChild(produto.criaElemento);
});

btnConfirmar.addEventListener("click", () => {
    pedido.confirmarPedido();
});

btnCancelar.addEventListener("click", () => {
    pedido.cancelarPedido();
});

btnPedir.addEventListener("click", () => {
    pedido.verificarPedido();
});