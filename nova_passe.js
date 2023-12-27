const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';
const apiUrl = 'https://api.github.com/repos/Apmds/Apmds.github.io/contents/userData.json';
const sha_hash = localStorage.getItem("sha-hash");
const token_encrypted = 'jks_tfgteUzOqxYeUMgdt6TBAQQOALaX3r3bO1cK';
const shiftAmount = 3;
const token = caesarCipherDecrypt(token_encrypted, shiftAmount)


var userLogins = {};

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
  

/*
// Função para buscar dados do repositório GitHub
function fetchDataFromGitHub(url, storageKey) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch JSON file: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem(storageKey, JSON.stringify({
                sha: data.sha
            }));
        })
        .catch(error => {
            console.error('Error fetching JSON file:', error);
        });
}
*/
// Buscar dados do repositório GitHub
fetchDataFromGitHub(apiUrl, 'sha-hash-api')
    .then(() => fetchDataFromGitHub(githubRepoUrl, 'user-logins'))
    .then(() => {
        // Processar os dados JSON aqui
        userLogins = JSON.parse(localStorage.getItem('user-logins')) || {};
        console.log(userLogins);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

var localStorageUser = false;


function updateFileOnGitHub(newContent) {
    console.log(newContent)
    
    fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/vnd.github.v3+json;charset=UTF-8',
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
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Error updating file on GitHub:', error));
    
}

document.getElementById('nova_passe_form').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var confpassword = document.getElementById('confpassword').value;

    var error_msg1 = document.getElementById('error_msg1');
    var error_msg2 = document.getElementById('error_msg2');
    var error_msg3 = document.getElementById('error_msg3');
/*
    if (checkPassword(email, password, confpassword)) {
        var accountData = userLogins[email] || JSON.parse(localStorage.getItem('conta_login')) || {};

        localStorage.setItem('conta_login', JSON.stringify({
            nome: accountData.nome,
            email: email,
            password: accountData.password,
            data_nascimento: accountData.data_nascimento,
            codigo_postal: accountData.codigo_postal,
            distrito: accountData.distrito,
            concelho: accountData.concelho
        }));

        //window.location.href = 'main_page.html';
    }
});*/

function checkPassword(email, password, confpassword) {
    var error_msg1 = document.getElementById('error_msg1');
    var error_msg2 = document.getElementById('error_msg2');
    var error_msg3 = document.getElementById('error_msg3');

    console.log("Password:", password)
    console.log("Right password:", userLogins[email].password)
    if (Object.keys(userLogins).includes(email)) {
        var rightPassword = userLogins[email].password;

        if (password == rightPassword) {
            error_msg1.classList.remove('d-none');
            return false;
        } else {
            error_msg1.classList.add('d-none');
            return true;
        }
    } else if (email !== '' && email !== null && email !== JSON.parse(localStorage.getItem('conta_login')).email) {
        var localStoragePassword = JSON.parse(localStorage.getItem('conta_login')).password;

        if (password === localStoragePassword) {
            localStorageUser = true;
            return true;
        } else {
            error_msg2.classList.remove('d-none');
            return false;
        }
    } else {
        error_msg3.classList.remove('d-none');
        return false;
    }
}