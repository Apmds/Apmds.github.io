
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


var viewModel = {
    distritos: ko.observableArray(),
    distritoSelecionado: ko.observable(),
    concelhos: ko.observableArray([]),
    concelhoSelecionado: ko.observable(),

    opConcelhos: function() {
        const distritoSelecionado = viewModel.distritoSelecionado()
        const concelhosDistrito = distritosData[distritoSelecionado]
        viewModel.concelhos(concelhosDistrito)

    }
}

var distritosData

fetch("distritos.json")
    .then(response => response.json())
    .then(data => {
        distritosData = data
        viewModel.distritos(Object.keys(data))
        viewModel.opConcelhos()

        viewModel.distritoSelecionado.subscribe(viewModel.opConcelhos)

    })
    .catch(error => console.log(error))


$(document).ready(function (){
    ko.applyBindings(viewModel)
})


function validarMedidas() {
    var cintura = document.getElementById("input-cintura").value.trim()
    var peito = document.getElementById("input-peito").value.trim()
    var pescoco = document.getElementById("input-pescoco").value.trim()
    var data_nascimento = document.getElementById("input-data-nascimento").value.trim()
    var codigo_postal = document.getElementById("input-codigo-postal").value.trim()
    var distrito_selecionado = document.getElementById("perfil-select-distrito").value
    var concelho_selecionado = document.getElementById("perfil-select-concelho").value
    var codigoPostalArray = codigo_postal.split("-")
    var cintura_validada = true
    var peito_validado = true
    var pescoco_validado = true
    var data_nascimento_validada = true
    var codigo_postal_validado = true
    var distritoValido = true
    var concelhoValido = true

    var regexMedidasCintura = /^\d+(\.\d{1,2})?$/;

    function validarAlgarismos() {
        let tudoAlgarismo = true
        for (let i = 0; i < codigoPostalArray.length; i++) {
            const number = codigoPostalArray[i]

            for (let j = 0; j < number.length; j++) {
                const digit = number[j]

                if (!/\d/.test(digit)) {
                    tudoAlgarismo = false
                    break
                }
            }

            if (!tudoAlgarismo) {
                break
            }
        }
        return tudoAlgarismo
    } 
    
   
    if (!codigo_postal || !validarAlgarismos() || codigoPostalArray.length !== 2 || codigoPostalArray[0].trim().length !== 4 || codigoPostalArray[1].trim().length !== 3) {
        document.getElementById("erro-perfil-postal").classList.remove("d-none")
            codigoPostalValido = false
    } else {
        document.getElementById("erro-perfil-postal").classList.add("d-none")
    }

    if (!regexMedidasCintura.test(cintura)) {
        $("#input-erro-cintura").removeClass("d-none");
        cintura_validada = false;
    } else {
        $("#input-erro-cintura").addClass("d-none");
        cintura_validada = true;
    }

    if (!regexMedidasCintura.test(peito)) {
        $("#input-erro-peito").removeClass("d-none");
        peito_validado = false;
    } else {
        $("#input-erro-peito").addClass("d-none");
        peito_validado = true;
    }

    if (!regexMedidasCintura.test(pescoco)) {
        $("#input-erro-pescoco").removeClass("d-none");
        pescoco_validado = false;
    } else {
        $("#input-erro-pescoco").addClass("d-none");
        pescoco_validado = true;
    }

    if (distrito_selecionado === "Selecione o distrito") {
        distritoValido = false
        document.getElementById("erro-perfil-distrito").classList.remove("d-none")
    } else {
        document.getElementById("erro-perfil-distrito").classList.add("d-none")
    }

    if (concelho_selecionado === "Selecione o concelho") {
        concelhoValido = false
        document.getElementById("erro-perfil-concelho").classList.remove("d-none")
    } else {
        document.getElementById("erro-perfil-concelho").classList.add("d-none")
    }

    conta_atual = JSON.parse(localStorage.getItem("conta_login"));
    console.log(conta_atual);
    var email_atual = conta_atual["email"]
    console.log(email_atual)

    if (cintura_validada && peito_validado && pescoco_validado && concelhoValido && distritoValido) {
        var medidas = {
            "cintura": cintura,
            "peito": peito,
            "pescoco": pescoco
        }

        conta_atual["data_nascimento"] = data_nascimento
        conta_atual["codigo_postal"] = codigo_postal
        conta_atual["distrito"] = distrito_selecionado
        conta_atual["concelho"] = concelho_selecionado
        conta_atual["medidas"] = medidas

        localStorage.setItem("conta_login", JSON.stringify(conta_atual))

        // Use Fetch API to get the contents of the JSON file
        fetch(githubRepoUrl)
        .then(response => response.json())
        .then(data => {
        // Update the data as needed
        data[email_atual]["data_nascimento"] = data_nascimento
        data[email_atual]["codigo_postal"] = codigo_postal
        data[email_atual]["distrito"] = distrito_selecionado
        data[email_atual]["concelho"] = concelho_selecionado

        data[email_atual]["medidas"] = medidas

        console.log(data)
        // Call the function to update the file on GitHub
        updateFileOnGitHub(JSON.stringify(data, null, 2));
        })
        .catch(error => console.error('Error fetching JSON:', error));
        
        return true

    }


}