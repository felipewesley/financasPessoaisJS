class Despesa {

    constructor(dia, mes, ano, tipo, descricao, valor) {
        
        this.status = true; 

        if (!this.validarInformacoes(tipo, descricao, valor)) {
            this.setStatus(false); 
            return false; 
        }

        let data = this.validarData(dia, mes, ano); 
        
        if (!data){
            this.setStatus(false); 
            return false; 
        }

        this.ano = data.getFullYear()
        this.mes = data.getMonth()
        this.dia = data.getDate()
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    dataIsNumeric (...dados) {
        if (dados.length > 0) {
            for(const e in dados) {
                // console.log(dados[e]); 
                if (isNaN(parseInt(dados[e]))){
                    return false; 
                }
            }
        }
        return true;
    }
    
    validarData(dia, mes, ano) {
        
        let data = new Date(); 

        if (!this.dataIsNumeric(dia, mes, ano)) {
            let validacao = `A data não foi informada corretamente.\n
                        Deseja cadastrar esta despesa na data de hoje? 
                        (${new Date().toDateString()})`; 
            if (confirm(validacao)) {
                return data; 
            }
        } else{
            data.setDate(dia); 
            data.setMonth(mes-1); 
            data.setFullYear(ano); 
            
            return data; 
        }
        
        return false; 
    }

    isEmpty(str) {
        if (str == ''.trim()) {
            return true; 
        }
        return false; 
    }

    validarInformacoes(...dados) {
        for(const i in dados) {
            if(this.isEmpty(dados[i])) {
                return false; 
            }
        }
        return true; 
    }

    getStatus() {
        return this.status; 
    }

    setStatus(status) {
        this.status = status; 
    }
}

class Database {
    constructor() {
        let id = localStorage.getItem('id'); 
        
        if(id === null){
            localStorage.setItem('id', 0); 
        }
    }
    getNextId() {
        let nextId = localStorage.getItem('id'); 
        return parseInt(nextId) + 1; 
    }
    gravar(d) {
        let id = this.getNextId(); 
        localStorage.setItem('id', id); 
        return localStorage.setItem(id, JSON.stringify(d)); 
    }
}

const bd = new Database(); 

function cadastrarDespesa() {
    
    let dia = document.getElementById('dia'); 
    let mes = document.getElementById('mes'); 
    let ano = document.getElementById('ano'); 
    let tipo = document.getElementById('tipo'); 
    let descricao = document.getElementById('descricao'); 
    let valor = document.getElementById('valor'); 
    
    let despesa = new Despesa(dia.value, mes.value, ano.value, tipo.value, descricao.value, valor.value); 
    
    if(despesa.getStatus()){
        console.log(despesa); 
        alert('Despesa cadastrada com sucesso'); 
        dia.value = ''; 
        mes.value = ''; 
        ano.value = ''; 
        tipo.value = ''; 
        descricao.value = ''; 
        valor.value = ''; 
        // return bd.gravar(despesa); 
    } else{
        console.log('validacao: tem coisa vazia'); 
        // return alert('Não foi possível criar a despesa.'); 
    }
    
}
