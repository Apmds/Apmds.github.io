var conta_atual;

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
        

    }
};
