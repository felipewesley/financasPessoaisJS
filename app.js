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
    let data; 
    try {
        if (!isNumeric(ano.value, mes.value, dia.value)) {
            throw 'Data não informada corretamente. \nCampos de data solicitados não foram preenchidos.'; 
        }
        data = new Date(ano.value, mes.value-1, dia.value); 
        if (data.getDate() != dia.value || data.getMonth()+1 != mes.value || data.getFullYear() != ano.value) {
            throw 'Data informada não corresponde a uma data válida.'
        }
        
    } catch (e) {
        data = new Date(); 
        alert(`${e} \n\nA despesa foi cadastrada na data de hoje (${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()})`); 
    }
    let tipo = document.getElementById('tipo'); 
    let descricao = document.getElementById('descricao'); 
    let valor = document.getElementById('valor'); 
    
    try {
        var despesa = new Despesa(data, tipo.value, descricao.value, valor.value); 
    } catch (e) {
        console.log(`Não foi possível criar o objeto. \n${e}`); 
        return null; 
    }
    // console.log(despesa); 
    return despesa; 
}