//Função responsável por trocar o CSS
function styleCSS(css){
    document.getElementById("css").setAttribute("href",css);
}

// Função que retorna o nome da estação com base no código da estação
function getEstacaoNome(clima) {
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
    return nomeEstacao;
}


//Função responsável por criar uma url,
// buscar as informações usando a API e
// Apresentá-las no HTML 
function consultaClima() {
    // Obtém o select e o valor selecionado
    var clima = document.getElementById('clima').value;
    var nomeEstacao = getEstacaoNome(clima);
    // Obtém o select e o valor selecionado
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

    // Elemento div onde os resultados serão exibidos
    var div = document.getElementById('resultado');
    // URL da API com o código da estação selecionada
    var url = 'http://servicos.cptec.inpe.br/XML/estacao/' + clima + '/condicoesAtuais.xml';
    console.log(url);

    var xmlhttp;
    // URL da API com o código da estação selecionada
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType("application/xml;charset=utf-8");
    } else {
        // Compatibilidade com IE
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Função de erro para lidar com falhas na requisição
    xmlhttp.onerror = function(){
        div.innerHTML = 'VALOR INVÁLIDO!';
    }


    xmlhttp.onload = function() {
        if (xmlhttp.status === 200) {
            // Função para processar a resposta da requisição
            var xmlDoc = xmlhttp.responseXML;
            // Verifica se o XML foi recebido corretamente
            if (xmlDoc) {
                var metar = xmlDoc.getElementsByTagName("metar")[0];
                // Verifica se o elemento <metar> está presente no XML
                if (metar) {
                    var codigo = metar.getElementsByTagName("codigo")[0].textContent;
                    var temperatura = metar.getElementsByTagName("temperatura")[0].textContent;
                    var atualizacao = metar.getElementsByTagName("atualizacao")[0].textContent;
                    var descricao = metar.getElementsByTagName("tempo_desc")[0].textContent;
                    var umidade = metar.getElementsByTagName("umidade")[0].textContent;
                    var pressao = metar.getElementsByTagName("pressao")[0].textContent;
                    var sig = metar.getElementsByTagName("tempo")[0].textContent;

                    //Troca o CSS do site de acordo com a sigla
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

                    // Exibe os dados na div id 'resultado'
                    div.innerHTML = `<div class="d-flex justify-content-center"><h5 style="color: white; justify-content: center; padding: 40px 20px 40px;">
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
                    // Caso o elemento <metar> não esteja presente no XML
                    div.innerHTML = 'Dados não disponíveis para a estação.';
                }
            } else {
                // Caso o XML não possa ser processado
                div.innerHTML = 'Erro ao processar a resposta XML.';
            }
        } else {
            // Caso o XML não possa ser processado
            div.innerHTML = 'Erro ao realizar a requisição: ' + xmlhttp.status;
        }
    };

    // Abre e envia a requisição
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//Função responsavel por limpar os dados exibidos na div com id 'resultado'
function limpar(){
    var el = document.getElementById("resultado");
    el.innerHTML = "";
    styleCSS("./css/estilo.css")
}