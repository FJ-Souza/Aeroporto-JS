function inicializa(){
    var bt = document.getElementById('botao');
    bt.onclick = consultaClima;
}

function consultaClima(){
    var clima = document.getElementById('clima');
    var div = document.getElementById('resultado');
    var url = 'http://servicos.cptec.inpe.br/XML/estacao/' + clima.value + '/condicoesAtuais.xml/';
    console.log(url);

    var request = new XMLHttpRequest();
    request.open('GET',url);

    request.onerror = function(e){
        div.innerHTML = 'VALOR INVÁLIDO!';
    }

    request.onload =()=>{
        var response = JSON.parse(request.responseText);
        if(response.erro === true){
            div.innerHTML = 'DADOS NÃO ENCONTRADO!';
        } else {
            div.innerHTML = 'Cósdigo: ' + response.codigo + '<br>' + 'Aeroporto: Nome' + '<br>' + 'Atualização: ' + response.atualizacao + '<br>' + 'Temperatura: ' + response.temperatura + '<br>' + 'Descrição: ' + response.tempo_desc + '<br>' + 'Pressão: ' + response.pressao + '<br>' + 'Umidade: ' + response.umidade;
        }
    }
    request.send();
}