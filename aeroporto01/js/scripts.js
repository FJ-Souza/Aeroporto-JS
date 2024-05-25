function inicializa(){
    var bt = document.getElementById('botao');
    bt.onclick = consultaClima;
}

function consultaClima(){
    var clima = document.getElementById('clima');
    var div = document.getElementById('resultado');
    var url = 'http://servicos.cptec.inpe.br/XML/estacao/' + clima.value + '/condicoesAtuais.xml/';
    console.log(url);

 
    xmlhttp = new XMLHttpRequest();
    
    //abre o arquivo xml utilizando o metodo get
    xmlhttp.open("GET",url,true);
    // envia o conteudo
    xmlhttp.send();
    // especifica o tipo de retorno
    xmlDoc = xmlhttp.responseXML;
    //cria o objeto x que recebe os objetos metar do XML
    xmlDoc.onerror = function(e){
        div.innerHTML = 'VALOR INVÁLIDO!';
    }

    xmlDoc.onload =()=>{
        var response = responseXML(xmlDoc.responseText);
        if(response.erro === true){
            div.innerHTML = 'CEP NÃO ENCONTRADO!';
        } else {
            let x = xmlDoc.getElementsByTagName("metar");
            div.innerHTML(x.getElementsByTagName("codigo").childNodes.nodeValue);    
        }
    }
    xmlDoc.send();
}