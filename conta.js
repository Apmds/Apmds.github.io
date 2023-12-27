var conta_atual;
const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';

window.onload = function () {
    conta_atual = JSON.parse(localStorage.getItem("conta_login"));
    console.log(conta_atual);
    
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
        fetch_data(githubRepoUrl)
        .then(data => {
            const email_atual = conta_atual["email"]
            const artesao = data[email_atual]["artesao"]
            console.log(artesao)
            
            if (artesao === true) {
                $("#ver-produtos").removeClass("d-none")
                $("#vender-produtos").removeClass("d-none")
            }
        })
    }
}


