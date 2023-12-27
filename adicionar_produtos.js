const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';
const apiUrl = 'https://api.github.com/repos/Apmds/Apmds.github.io/contents/userData.json';
const sha_hash = localStorage.getItem("sha-hash");
const token_encrypted = 'jks_tfgteUzOqxYeUMgdt6TBAQQOALaX3r3bO1cK';
const shiftAmount = 3;
const token = caesarCipherDecrypt(token_encrypted, shiftAmount)
var conta_atual;

var userLogins = {}; 
//para ecriptar dados 
function caesarCipherEncrypt(text, shift) {
    return text
        .split('')
        .map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const isUpperCase = char === char.toUpperCase();
                const shiftAmount = (code - (isUpperCase ? 65 : 97) + shift) % 26;
                const shiftedCode = (shiftAmount + 26) % 26 + (isUpperCase ? 65 : 97);
                return String.fromCharCode(shiftedCode);
            }
        return char;
    })
    .join('');
}
  
function caesarCipherDecrypt(text, shift) {
    return caesarCipherEncrypt(text, -shift);
}

function utf8_to_b64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function updateFileOnGitHub(newContent) {
    console.log(newContent)
    
    
    // Make a PUT request to update the file
    fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': "application/vnd.github.v3+json;charset=UTF-8"
        },
        body: JSON.stringify({
            message: 'Added new user data',
            content: utf8_to_b64(newContent), // Encode the content in base64
            sha: localStorage.getItem("sha-hash") // Provide the current SHA hash of the file
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('File updated on GitHub:', data)
        window.location.href = "conta.html"
    })
    .catch(error => console.error('Error updating file on GitHub:', error));
    
}

function add_product(){
    var nome_produto = document.getElementById("input-nome-produto").value.trim()
    var descricao_produto = document.getElementById("input-descricao-produto").value.trim()
    var preco_produto = document.getElementById("input-preco-produto").value.trim()
    var nome_validado = true
    var descricao_validada = true
    var preco_validado = true

    if (!nome_produto) {
        $("#input-erro-nome").removeClass("d-none")
        nome_validado = false
    } else {
        $("#input-erro-nome").addClass("d-none")
        nome_validado = true
    }

    if (!descricao_produto) {
        $("#input-erro-descricao").removeClass("d-none")
        descricao_validada = false
    } else {
        $("#input-erro-descricao").addClass("d-none")
        descricao_validada = true
    }

    var regexPreco = /^\d+(\.\d{1,2})?$/;

    if (!regexPreco.test(preco_produto)) {
        $("#input-erro-preco").removeClass("d-none");
        preco_validado = false;
    } else {
        $("#input-erro-preco").addClass("d-none");
        preco_validado = true;
    }

    

    conta_atual = JSON.parse(localStorage.getItem("conta_login"));
    console.log(conta_atual);
    var email_atual = conta_atual["email"]
    console.log(email_atual)

    if (nome_validado && descricao_validada && preco_validado) {
        conta_atual.artesao_dados.artigos.push({nome: nome_produto, descricao: descricao_produto, preco: preco_produto})
        localStorage.setItem(conta_atual, JSON.stringify(conta_atual))

        // Use Fetch API to get the contents of the JSON file
        fetch(githubRepoUrl)
        .then(response => response.json())
        .then(data => {
        // Update the data as needed
        if (!data[email_atual]["artesao_dados"]) {
            data[email_atual]["artesao_dados"] = {artigos: [], descricao: ""}
        }
        if (!data[email_atual]["artesao_dados"]["artigos"]) {
            data[email_atual]["artesao_dados"]["artigos"] = []
        }
        
        data[email_atual]["artesao_dados"]["artigos"].push({nome: nome_produto, descricao: descricao_produto, preco: preco_produto})
        console.log(data)
        // Call the function to update the file on GitHub
        updateFileOnGitHub(JSON.stringify(data, null, 2));
        })
        .catch(error => console.error('Error fetching JSON:', error));
        
        return true
    }
}



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






