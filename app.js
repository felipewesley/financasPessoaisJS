
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
        this.descricao = this.setDescricao(descricao)
        this.valor = valor
    }

    setDescricao(descricao) {
        let str = new String(descricao); 

        return str.toLowerCase(); 
    }

    /**
     * Método que verifica se os valores informados 
     * referentes a data são numéricos ou não
     */
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
    
    /**
     * Método que verifica se a data informada no construtor da classe
     * corresponde a uma data válida. Caso a data informada seja inválida, 
     * o objeto é instanciado com o atributo status = false
     */
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

    /**
     * Método que verifica se os dados passados em parâmetro
     * são vazios com base no método isEmpty desta mesma classe
     */
    validarInformacoes(...dados) {
        for(const i in dados) {
            if(this.isEmpty(dados[i])) {
                return false; 
            }
        }
        return true; 
    }

    /**
     * Método que verifica se um conteúdo é vazio
     */
    isEmpty(str) {
        if (str == ''.trim()) {
            return true; 
        }
        return false; 
    }

    /**
     * Método acessor do atributo status
     * Recupera valor de status
     */
    getStatus() {
        return this.status; 
    }

    /**
     * Método acessor do atributo status
     * Define um valor para status
     */
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

    /**
     * Gera o próximo id a ser armazenado em localStorage
     */
    getNextId() {
        let nextId = localStorage.getItem('id'); 
        return parseInt(nextId) + 1; 
    }

    /**
     * Método que insere um registro em localStorage
     * @param d Objeto Depesa no formato JSON
     */
    gravar(d) {
        let id = this.getNextId(); 
        localStorage.setItem('id', id); 
        return localStorage.setItem(id, JSON.stringify(d)); 
    }

    /**
     * Método que retorna todos os registros armazenados em localStorage
     */
    getAllRegisters() {
        let id = localStorage.getItem('id'); 
        let arr = []; 
        for (let i = 0; i <= id; i++) {

            let despesa = JSON.parse(localStorage.getItem(i)); 

            if (despesa === null) {
                continue; 
            }
            arr.push(despesa); 
        }
        return arr; 
    }

    /**
     * Método que verifica se um conteúdo é vazio
     */
    isEmpty(str) {
        if (str == ''.trim()) {
            return true; 
        }
        return false; 
    }

    /**
     * Método que recupera um registro específico
     * com base no registro passado em parâmetro
     * @param registro Literal Object - Objeto do tipo Despesa
     */
    searchRegistro(registro) {
        
        let despesas = []; 
        despesas = this.getAllRegisters(); 

        if (!this.isEmpty(registro.ano)) {
            despesas = despesas.filter(e => e.ano == registro.ano); 
        }

        if (!this.isEmpty(registro.mes)) {
            despesas = despesas.filter(e => e.mes == parseInt(registro.mes)-1); 
        }

        if (!this.isEmpty(registro.dia)) {
            despesas = despesas.filter(e => e.dia == registro.dia); 
        }

        if (!this.isEmpty(registro.tipo)) {
            despesas = despesas.filter(e => e.tipo == registro.tipo); 
        }

        if (!this.isEmpty(registro.descricao)) {
            despesas = despesas.filter(e => {
                
                let eStr = new String(e.descricao).toLowerCase(); 
                let registroStr = new String(registro.descricao).toLowerCase(); 
                
                return (eStr.indexOf(registroStr) != -1); 
            }); 
        }

        if (!this.isEmpty(registro.valor)) {
            despesas = despesas.filter(e => e.valor == registro.valor); 
        }

        return despesas; 

    }
}

const bd = new Database(); 

/**
 * Função chamada no index ao cadastrar uma nova despesa
 */
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

    // jQuery que exibe o modal
    return $('#alertaRegistro').modal('show'); 
    
}

/**
 * Função chamada no carregamento da página consulta
 * Lista todos os registros se filter == undefined
 * Se filter != undefined, a função retorna apenas os 
 * registros filtrados de acordo com o registro em parâmetro
 */
function getDespesas(filter = undefined) {
    
    let despesas = []; 
    let listaDespesas = document.getElementById('listaDespesas'); 
    listaDespesas.innerHTML = ''; 

    if (filter) {
        despesas = filter; 
        if (despesas.length == 0) {
            let line = listaDespesas.insertRow(); 
            let cell = line.insertCell(0); 
            cell.colSpan = 5; 
            return (
                cell.innerHTML = 'Não há despesas correspondentes aos parâmetros solicitados.'
            ); 
        }
    } else {
        
        despesas = bd.getAllRegisters(); 
    }
    despesas.forEach(e => {
        let line = listaDespesas.insertRow(); 
        line.insertCell(0).innerHTML = `${e.dia}/${parseInt(e.mes)+1}/${e.ano}`; 
        line.insertCell(1).innerHTML = getTypes(e.tipo); 
        line.insertCell(2).innerHTML = e.descricao; 
        line.insertCell(3).innerHTML = e.valor; 
    });
    
}

/**
 * Função chamada na tela consulta ao consultar uma determinada despesa com base
 * nos parâmetros fornecidos. A função recupera os dados fornecidos nos campos
 * Esta função fornece seu retorno como parâmetro para a listagem de todos os registros
 */
function pesquisarDespesa() {
    
    let ano = document.getElementById('ano').value; 
    let mes = document.getElementById('mes').value; 
    let dia = document.getElementById('dia').value; 
    let tipo = document.getElementById('tipo').value; 
    let descricao = document.getElementById('descricao').value; 
    let valor = document.getElementById('valor').value; 

    // Objeto literal de despesa passado como parâmetro
    const despesa = {
        "ano": ano, 
        "mes": mes, 
        "dia": dia, 
        "tipo": tipo, 
        "descricao": descricao, 
        "valor": valor
    }; 

    return getDespesas(bd.searchRegistro(despesa)); 
}

/**
 * Função que gera os dados necessários ao cadastro de novas despesas
 * e parâmetros de listagem
 */
function setValues() {
    let ano = document.getElementById('ano'); 
    let anoValues = years(3); 
    anoValues.forEach(e => {
        let op = new Option(e.toString(), e.toString()); 
        ano.add(op); 
    }); 
    let mes = document.getElementById('mes'); 
    let mesValues = months(); 
    for(let e in mesValues){
        let op = new Option(mesValues[e], (parseInt(e)+1).toString()); 
        mes.add(op); 
    }
    let tipo = document.getElementById('tipo'); 
    let tipoValues = types(); 
    for(let e in tipoValues){
        let op = new Option(tipoValues[e], e.toString()); 
        tipo.add(op); 
    }
    return true; 
}

/**
 * Função que retorna os tipos de despesas
 * Novos tipos de despesas devem ser inseridos aqui
 */
function types() {
    return ([
        'Alimentação', 
        'Educação', 
        'Lazer', 
        'Saúde', 
        'Transporte'
    ]); 
}

/**
 * Retorna a string do tipo de uma despesa com base em seu id
 */
function getTypes(id) {
    // id -= 1; 
    let tipo = types(); 
    for(let e in tipo) {
        if (e == id) {
            return tipo[e]; 
        }
    }
    return 'Despesa'; 
}

/**
 * Função que determina a quantidade de anos que ficarão
 * disponíveis para que as despesas sejam cadastradas
 * Quantidade de anos passada em parâmetro, 
 * desde o anoAtual até anoAtual-parametro
 */
function years(quant = 1) {
    // quant = (quant) ? quant : 1; 
    let d = new Date(); 
    let y = []; 
    let i = 0; 
    let q = quant; 
    do {
        y.push(d.getFullYear()-i); 
        i++; 
    } while(i < q); 

    return y; 
}

/**
 * Retorna a listagem (array) dos meses
 * Refatorando arquivo html
 */
function months() {
    return ([
        'Janeiro', 
        'Fevereiro', 
        'Março', 
        'Abril', 
        'Maio', 
        'Junho', 
        'Julho', 
        'Agosto', 
        'Setembro', 
        'Outubro', 
        'Novembro', 
        'Dezembro'
    ]); 
}
