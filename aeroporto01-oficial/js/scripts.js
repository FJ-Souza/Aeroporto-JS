function inicializa(){
    var bt = document.getElementById('botao');
    bt.onclick = consultaClima;
}

function consultaClima() {
    var clima = document.getElementById('clima').value;
    var nomeEstacao = '';
    switch (clima) {
        case 'SBAR':
            nomeEstacao = 'Santa Maria - SE';
            break;
        case 'SBGR':
            nomeEstacao = 'Guarulhos - SP';
            break;
        case 'SBUL':
            nomeEstacao = 'Uberlândia - MG';
            break;
        case 'SBBH':
            nomeEstacao = 'Pampulha - MG';
            break;
        case 'SBCB':
            nomeEstacao = 'Cabo Frio - RJ';
            break;
        default:
            nomeEstacao = 'Estação Desconhecida';
            break;
    }
    
    var div = document.getElementById('resultado');
    var url = 'http://servicos.cptec.inpe.br/XML/estacao/' + clima + '/condicoesAtuais.xml';
    console.log(url);

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onerror = function(){
        div.innerHTML = 'VALOR INVÁLIDO!';
    }


    xmlhttp.onload = function() {
        if (xmlhttp.status === 200) {
            var xmlDoc = xmlhttp.responseXML;
            if (xmlDoc) {
                var metar = xmlDoc.getElementsByTagName("metar")[0];
                if (metar) {
                    var codigo = metar.getElementsByTagName("codigo")[0].textContent;
                    var temperatura = metar.getElementsByTagName("temperatura")[0].textContent;
                    var umidade = metar.getElementsByTagName("umidade")[0].textContent;
                    var pressao = metar.getElementsByTagName("pressao")[0].textContent;

                    div.innerHTML = `
                        Código: ${codigo}<br>
                        Aeroporto: ${nomeEstacao}<br>
                        Temperatura: ${temperatura}°C<br>
                        Umidade: ${umidade}%<br>
                        Pressão: ${pressao} hPa
                    `;
                } else {
                    div.innerHTML = 'Dados não disponíveis para a estação.';
                }
            } else {
                div.innerHTML = 'Erro ao processar a resposta XML.';
            }
        } else {
            div.innerHTML = 'Erro ao realizar a requisição: ' + xmlhttp.status;
        }
    };

  
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
