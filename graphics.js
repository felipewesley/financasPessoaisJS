/**
 * Função constante que recupera os registros de localStorage
 */
const db = {
    getRegistros() {
        let id = localStorage.getItem('id'); 
        let arr = []; 
        for (let i = 0; i <= id; i++) {

            let despesa = JSON.parse(localStorage.getItem(i)); 

            if (despesa === null) {
                continue; 
            }
            despesa.id = i; 
            arr.push(despesa); 
        }
        return arr; 
    }
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

am4core.ready(() => {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.XYChart); 

    let dados = db.getRegistros(); 
    let anos = years(3); 
    let registrosAno = []; 

    class obj {
        constructor() {
            this.year = null
            this.alimentacao = 0
            this.educacao = 0
            this.lazer = 0
            this.saude = 0
            this.transporte = 0
        }
    }
    // let obj = {
    //     "year": null, 
    //     "alimentacao": 0, 
    //     "educacao": 0, 
    //     "lazer": 0, 
    //     "saude": 0, 
    //     "transporte": 0
    // }

    for (const k in anos) {
        
        let objetoAno = new obj(); 
        objetoAno.year = anos[k].toString(); 

        dados.forEach(element => {
            if (objetoAno.year == element.ano) {
                switch (parseInt(element.tipo)) {
                    case 0:
                        objetoAno.alimentacao += parseInt(element.valor); 
                        break;
                    case 1:
                        objetoAno.educacao += parseInt(element.valor); 
                        break;
                    case 2: 
                        objetoAno.lazer += parseInt(element.valor); 
                        break;
                    case 3: 
                        objetoAno.saude += parseInt(element.valor); 
                        break;
                    case 4:
                        objetoAno.transporte += parseInt(element.valor); 
                        break;
                }
            }
        });
        registrosAno.push(objetoAno); 
    }

    console.log(registrosAno); 

    chart.data = []; 

    registrosAno.forEach(element => {
        return chart.data.push(element); 
    });

    // Add data
    /*
    chart.data = [ {
        "year": "2003",
        "europe": 2.5,
        "namerica": 2.5,
        "asia": 2.1,
        "lamerica": 1.2,
        "meast": 0.2,
        "africa": 0
    }, {
        "year": "2004",
        "europe": 2.6,
        "namerica": 2.7,
        "asia": 2.2,
        "lamerica": 1.3,
        "meast": 0.3,
        "africa": 0.1
    }, {
        "year": "2005",
        "europe": 2.8,
        "namerica": 2.9,
        "asia": 2.4,
        "lamerica": 1.4,
        "meast": 0.3,
        "africa": 4.1
    } ];
    */

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.title.text = "Tipos de despesas";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    // valueAxis.title.text = "Expenditure (M)";
    valueAxis.title.text = "Gasto total (R$)";

    // Create series
    function createSeries(field, name, stacked) {
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field; 
        series.dataFields.categoryX = "year";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]R$ {valueY}[/]";
        series.stacked = stacked;
        series.columns.template.width = am4core.percent(95);
    }

    // createSeries("europe", "Europe", false);
    // createSeries("namerica", "North America", true);
    // createSeries("asia", "Asia", false);
    // createSeries("lamerica", "Latin America", true);
    // createSeries("meast", "Middle East", true);
    // createSeries("africa", "Africa", true);

    createSeries("alimentacao", "Alimentação", false);
    createSeries("educacao", "Educação", true);
    createSeries("lazer", "Lazer", false);
    createSeries("saude", "Saúde", true);
    createSeries("transporte", "Transporte", true);

    // Add legend
    chart.legend = new am4charts.Legend();

}); // end am4core.ready()
