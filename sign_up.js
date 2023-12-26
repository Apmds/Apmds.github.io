const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';
const apiUrl = `https://api.github.com/repos/Apmds/Apmds.github.io/contents/userData.json`;
const sha_hash = localStorage.getItem("sha-hash");
const token = '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';

function first_page() {
    document.getElementById("page1").classList.remove("d-none")
    document.getElementById("page2").classList.add("d-none")
}

function second_page() {
    document.getElementById("page2").classList.remove("d-none")
    document.getElementById("page1").classList.add("d-none")
}

function updateFileOnGitHub(newContent, sha) {
    // Make a PUT request to update the file
    fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Added new user data',
            content: btoa(newContent), // Encode the content in base64
            sha: localStorage.getItem("sha-hash") // Provide the current SHA hash of the file
        }),
    })
    .then(response => response.json())
    .then(data => console.log('File updated on GitHub:', data))
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
        "concelho": city
    } 

    // Call the function to update the file on GitHub
    updateFileOnGitHub(JSON.stringify(data, null, 2));
    })
    .catch(error => console.error('Error fetching JSON:', error));

    //localStorage.setItem("conta_login", JSON.stringify({email: email, password: password, nome: name, data_nascimento: birthdate, codigo_postal: post_code, distrito: district, concelho: city}))

    
    window.location.href = 'index.html';
});






