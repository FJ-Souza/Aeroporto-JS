function inicializa(){
    var bt = document.getElementById('botao');
    bt.onclick = consultaClima;
}
function styleCSS(css){
    document.getElementById("css").setAttribute("href",css);
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
        xmlhttp.overrideMimeType("application/xml;charset=utf-8");
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
                    var atualizacao = metar.getElementsByTagName("atualizacao")[0].textContent;
                    var descricao = metar.getElementsByTagName("tempo_desc")[0].textContent;
                    var umidade = metar.getElementsByTagName("umidade")[0].textContent;
                    var pressao = metar.getElementsByTagName("pressao")[0].textContent;
                    var sig = metar.getElementsByTagName("tempo")[0].textContent;

                    switch (sig) {
                        case "in":
                            styleCSS("./css/ensolarado.css")
                            break;
                        case "c":
                            styleCSS("./css/chuvoso.css")
                            break;
                        case "pm":
                            styleCSS("./css/chuvoso.css")
                            break;
                        case "ps":
                            styleCSS("./css/ensolarado.css")
                            break;
                        case "cl":
                            styleCSS("./css/ensolarado.css")
                            break;
                        case "nd":
                            styleCSS("./css/nublado.css")
                            break;
                        default:
                            
                            break;
                    }

                    div.innerHTML = `<div class="d-flex justify-content-center"><h5 style="color: white; justify-content: center;">
                        Código: ${codigo}<br>
                        Aeroporto: ${nomeEstacao}<br>
                        Atualização: ${atualizacao}<br>
                        Temperatura: ${temperatura}°C<br>
                        Sigla: ${sig}<br>
                        Descrição: ${descricao}<br>
                        Pressão: ${pressao} mb <br>
                        Umidade: ${umidade}%<br>
                        </h5></div>
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

function limpar(){
    var el = document.getElementById("resultado");
    el.innerHTML = "";
    styleCSS("./css/estilo.css")
}