class Despesa {

    constructor(dia, mes, ano, tipo, descricao, valor) {
        
        this.status = true; 

        if (!this.validarInformacoes(tipo, descricao, valor)) {
            this.setStatus(false); 
            return false; 
        }

        let data = this.validarData(dia, mes, ano); 
        
        if (!data){
            // this.setStatus(false); 
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
                if (isNaN(parseInt(dados[e]))){
                    return false; 
                }
            }
        }
        return true;
    }
    
    validarData(dia, mes, ano) {
        
        let d = new Date(); 

        if (!this.dataIsNumeric(dia, mes, ano)) {

            // $('#alertaData').modal('show'); 
            return false; 

        } else {

            d.setDate(dia); 
            d.setMonth(mes-1); 
            d.setFullYear(ano); 

            if (d.getDate() != dia || d.getMonth() != mes-1 || d.getFullYear() != ano ) {
                return false; 
            }
            
            return d; 
        }
        
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

function setToday() {
    
    let data = new Date(); 

    document.getElementById('dia').value = data.getDate(); 
    document.getElementById('mes').value = data.getMonth()+1; 
    document.getElementById('ano').value = data.getFullYear(); 

    return cadastrarDespesa(); 
}

function cadastrarDespesa() {
    
    let dia = document.getElementById('dia'); 
    let mes = document.getElementById('mes'); 
    let ano = document.getElementById('ano'); 
    let tipo = document.getElementById('tipo'); 
    let descricao = document.getElementById('descricao'); 
    let valor = document.getElementById('valor'); 
    
    let despesa = new Despesa(dia.value, mes.value, ano.value, tipo.value, descricao.value, valor.value); 
    
    // Informações do modal que serão alteradas de acordo com o status da operação
    let titleClassModal; 
    let titleModal; 
    let contentModal; 
    let btnClass; 
    let btnContent; 

    if(!despesa.getStatus()) {
        
        titleClassModal = 'modal-header text-danger'; 
        titleModal = '<p> Erro ao cadastrar a despesa </p>'; 
        contentModal = '<p> Um ou mais campos obrigatórios não foram preenchidos.  </p>'; 
        btnClass = 'btn btn-danger'; 
        btnContent = 'Voltar e corrigir'; 
        
    } else if (!despesa.validarData(dia.value, mes.value, ano.value)) {

        titleClassModal = 'modal-header text-primary'; 
        titleModal = '<p> Atenção! </p>'; 
        contentModal = '<p> A data informada não é válida.  </p>'; 
        btnClass = 'btn btn-primary'; 
        btnContent = 'Corrigir'; 

    } else {

        let elements = [dia, mes, ano, tipo, descricao, valor]; 
        elements.forEach(e => e.value = ''); 

        titleClassModal = 'modal-header text-success'; 
        titleModal = '<p> Concluído! </p>'; 
        contentModal = '<p> Despesa cadastrada com sucesso.  </p>'; 
        btnClass = 'btn btn-success'; 
        btnContent = 'Concluído'; 
        
        bd.gravar(despesa); 

    }

    document.getElementById('ModalHeader').className = titleClassModal; 
    document.getElementById('ModalLabel').innerHTML = titleModal; 
    document.getElementById('ModalContent').innerHTML = contentModal; 
    document.getElementById('ModalBtn').className = btnClass; 
    document.getElementById('ModalBtn').innerHTML = btnContent; 

    return $('#alertaRegistro').modal('show'); 
    
}
