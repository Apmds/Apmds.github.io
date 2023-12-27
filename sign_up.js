const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';
const apiUrl = `https://api.github.com/repos/Apmds/Apmds.github.io/contents/userData.json`;
const sha_hash = localStorage.getItem("sha-hash");
const token_encrypted = 'jks_tfgteUzOqxYeUMgdt6TBAQQOALaX3r3bO1cK';
const shiftAmount = 3;
const token = caesarCipherDecrypt(token_encrypted, shiftAmount)

/*
const tokenUrl = "https://drive.google.com/uc?id=1xLSJw4BWGRBDlnvwqNblo1W1gN0URGgw"

var token = ""

fetch(tokenUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    token = data["token"]
    console.log('File content:', data);
  })
  .catch(error => {
    console.error('Error fetching file:', error);
  });
*/
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

function first_page() {
    document.getElementById("page1").classList.remove("d-none")
    document.getElementById("page2").classList.add("d-none")
}

function second_page() {
    document.getElementById("page2").classList.remove("d-none")
    document.getElementById("page1").classList.add("d-none")
}

function utf8_to_b64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function updateFileOnGitHub(newContent) {
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
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Error updating file on GitHub:', error));
    
}

function sign_up() {
    var email = document.getElementById("email").value.trim()
    var password = document.getElementById("password").value
    var name = document.getElementById("name").value.trim()
    var birthdate = document.getElementById("birthdate").value
    var post_code = document.getElementById("postcode").value.trim()
    var district = document.getElementById("district").value.trim()
    var city = document.getElementById("city").value.trim()

    var data = [email, password, name, birthdate, post_code, district, city]
    for (let i = 0; i < data.length; i++) {
        if (data[i] == "" || data[i] == null) {
            document.getElementById("error_msg").classList.remove("d-none")
            return false
        }
    }
    return true
}

document.getElementById('sign_up_form1').addEventListener('submit', function (event) {
    event.preventDefault();
});

document.getElementById('sign_up_form2').addEventListener('submit', function (event) {
    event.preventDefault();

    
    var email = document.getElementById("email").value.trim()
    var password = document.getElementById("password").value
    var name = document.getElementById("name").value.trim()
    var birthdate = document.getElementById("birthdate").value
    var post_code = document.getElementById("postcode").value.trim()
    var district = document.getElementById("district").value.trim()
    var city = document.getElementById("city").value.trim()

    // Use Fetch API to get the contents of the JSON file
    fetch(githubRepoUrl)
    .then(response => response.json())
    .then(data => {
    // Update the data as needed
    data[email] = {
        "nome": name,
        "data_nascimento": birthdate,
        "password": password,
        "codigo_postal": post_code,
        "distrito": district,
        "concelho": city,
        "artesao": false,
    } 
    console.log(data)
    // Call the function to update the file on GitHub
    updateFileOnGitHub(JSON.stringify(data, null, 2));
    })
    .catch(error => console.error('Error fetching JSON:', error));

    //localStorage.setItem("conta_login", JSON.stringify({email: email, password: password, nome: name, data_nascimento: birthdate, codigo_postal: post_code, distrito: district, concelho: city}))
});






