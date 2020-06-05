class Despesa {
    constructor(data, tipo, descricao, valor) {
        this.ano = data.getFullYear()
        this.mes = data.getMonth()
        this.dia = data.getDate()
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}

function isNumeric (...dados) {    
    if (dados.length > 0) {
        for(const e in dados) {
            console.log(dados[e]); 
            if (isNaN(parseInt(dados[e]))){
                return false; 
            }
        }
    }
    return true;
}

function cadastrarDespesa() {
    
    let ano = document.getElementById('ano'); 
    let mes = document.getElementById('mes'); 
    let dia = document.getElementById('dia'); 
    let data = new Date(ano.value, mes.value-1, dia.value); 
    let tipo = document.getElementById('tipo'); 
    let descricao = document.getElementById('descricao'); 
    let valor = document.getElementById('valor'); 
    
    let despesa = new Despesa(data, tipo, descricao, valor); 
    console.log(despesa); 

    return despesa; 
}