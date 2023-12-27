var conta_atual;
const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';



window.onload = function () {
    conta_atual = JSON.parse(localStorage.getItem("conta_login"));
    console.log(conta_atual);
    $("#ver-perfil-artesao").attr("href", "detalhes_artesao.html?user=" + JSON.parse(localStorage.getItem("conta_login")).email)
    
    if (conta_atual) {
        $("#nome").text("Nome: " + conta_atual["nome"]);
        $("#email").text("Email: " + conta_atual["email"]);
        $("#cintura").text(conta_atual["cintura"]);
        $("#peito").text( conta_atual["peito"]);
        $("#pescoco").text( conta_atual["pescoco"]);
        $("#data_nascimento").text("Data de nascimento:" + conta_atual["data_nascimento"]);
        $("#morada").text("Morada: " + conta_atual["codigo_postal"] + ", " +conta_atual["concelho"] + ", " + conta_atual["distrito"]);
        
        display_page()
    }
};

function fetch_data (url) {
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch JSON")
        }
        return response.json()
    })
    .catch(error => {
        console.log(error)
        throw error
    })
}


function display_page() {
    if (conta_atual) {
        var artesao = conta_atual["artesao"]
        if (artesao === true) {
            $("#ver-produtos").removeClass("d-none")
            $("#vender-produtos").removeClass("d-none")
            $("#container-aderir-artesao").addClass("d-none")
        } else {
            $("#ver-produtos").addClass("d-none")
            $("#vender-produtos").addClass("d-none")
            $("#container-aderir-artesao").removeClass("d-none")
        }
    }
}


