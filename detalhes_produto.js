const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';

var user_logins = []
var dados_artesao = {}

fetch(githubRepoUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON file: ${response.status} ${response.statusText}`);
        }
      return response.json();
    })
    .then(data => {
        
        // Process the JSON data here
        var user = getUrlParameter("user")
        Object.entries(data).forEach(login => {
            if (login[0] == user) {
                dados_artesao = login[1]
                return
            }
            user_logins[login[0]] = login[1]
        })
        console.log(user_logins);
        update_html()
    })
    .catch(error => {
        console.error('Error fetching JSON file:', error);
    });

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    console.log("sPageURL=", sPageURL);
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function update_html() {
    $("#nome").text(dados_artesao.nome)
    $("#localizacao").text(`${dados_artesao.concelho}, ${dados_artesao.distrito}`)

    var artigo = dados_artesao.artesao_dados.artigos[parseInt(getUrlParameter("prodId"))]
    $("#produto-nome").text(artigo.nome)

    var descricao = artigo.descricao.split(/\r?\n/)
    for (let i = 0; i < descricao.length; i++) {
        $("#produto-descricao").html( $("#produto-descricao").html() + descricao)
    }
    var preco = dados_artesao.artesao_dados.artigos["preco"]
    $("#preco").text(artigo.preco + " €")
    console.log(preco)
}