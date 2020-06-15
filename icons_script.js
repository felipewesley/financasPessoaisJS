function getIcons() {
    
    let i = new String('icon_'); 
    let ext = '.png'; 
    let arrImg = [
        i.concat('html5').concat(ext), 
        i.concat('css3').concat(ext), 
        i.concat('bootstrap').concat(ext), 
        i.concat('amCharts').concat(ext)
    ]; 
    let arrDesc = [
        'HTML5', 
        'CSS3', 
        'Bootstrap', 
        'amCharts', 
    ]; 
    
    let r = []; 
    r.push(arrImg); 
    r.push(arrDesc); 

    return r; 
    
}

function setContent() {
    
    let tech = getIcons(); 
    let lista = document.getElementById('lista_tech'); 
    let listaItens = document.createElement("div"); 
    
    for(const i in tech[0]) {
        
        let card = document.createElement("div"); 
        card.className = 'card'; 
        card.style.width = '180px'; 
        card.style.display = 'inline-flex'; 
        card.style.margin = '7px'; 
        let img = document.createElement("img"); 
        img.className = 'card-img-top'; 
        img.style.width = '180px'; 
        img.src = `./img/${tech[0][i]}`; 
        img.alt = `${tech[1][i]}`; 
        let cardBody = document.createElement("div"); 
        cardBody.className = 'card-body text-center'; 
        let desc = document.createElement("p"); 
        desc.className = 'card-text'; 
        desc.innerHTML = `${tech[1][i]}`; 
        cardBody.append(desc); 
        card.append(img, cardBody); 
        
        listaItens.append(card); 
    }

    return lista.append(listaItens); 

}