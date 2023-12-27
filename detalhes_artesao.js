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
    console.log(dados_artesao)
    $("#localizacao").text(`${dados_artesao.concelho}, ${dados_artesao.distrito}`)

    var paragrafos = dados_artesao.artesao_dados.descricao.split(/\r?\n/)
    for (let i = 0; i < paragrafos.length; i++) {
        $("#descricao").html($("#descricao").html() + `<p>${paragrafos[i]}</p>`)
    }

    var artigos = dados_artesao.artesao_dados.artigos
    for (let i = 0; i < artigos.length; i++) {
        $("#produtos").html($("#produtos").html() + `<div class='container position-relative d-flex flex-column align-items-center'><a href='detalhes_produto.html?user=${getUrlParameter("user")}&prodId=${i}'><img src='images/produto1.jpg' class='img-produto' /></a><p class='text-white'>${artigos[i].nome}</p></div>`)
    }

    let favoritos_lista = localStorage.getItem("favoritos")
    console.log(favoritos_lista)
    if (favoritos_lista == null) {
        favoritos_lista = "[]"
    }
    favoritos_lista = JSON.parse(favoritos_lista)

    if (favoritos_lista.includes(getUrlParameter("user"))) {
        $("#favourite-btn").addClass("text-danger")
    }
}

$("#favourite-btn").click(function () {
    $("#favourite-btn").toggleClass("text-danger")

    let favoritos_lista = localStorage.getItem("favoritos")
    console.log(favoritos_lista)
    if (favoritos_lista == null) {
        favoritos_lista = "[]"
    }
    favoritos_lista = JSON.parse(favoritos_lista)

    if ($("#favourite-btn").hasClass("text-danger") && !favoritos_lista.includes(getUrlParameter("user"))) {
        favoritos_lista.push(getUrlParameter("user"))
    } else {
        favoritos_lista.splice(favoritos_lista.indexOf(getUrlParameter("user")), 1)
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos_lista))
})

$(document).ready(function () {

})