const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';
var user_logins = {}


fetch(githubRepoUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON file: ${response.status} ${response.statusText}`);
        }
      return response.json();
    })
    .then(data => {
        // Process the JSON data here
        Object.entries(data).forEach(user => {
            user_logins[user[0]] = user[1]
        })
    
      console.log(user_logins);
    })
    .catch(error => {
        console.error('Error fetching JSON file:', error);
    });

var localStorageUser = false

function check_login() {
    localStorageUser = false
    error_msg = document.getElementById("error_msg")
    email = document.getElementById("email").value.trim()
    password = document.getElementById("password").value
    
    console.log(JSON.parse(localStorage.getItem("conta_login")).email)
    console.log(email)

    if (Object.keys(user_logins).includes(email)) {
        var right_password = user_logins[email]["password"]
        console.log(password)
        console.log(right_password)
        if (password == right_password) {
            return true
        } else {
            error_msg.classList.remove("d-none")
        return false
        }
    } else if (email != null && email != "" && JSON.parse(localStorage.getItem("conta_login")).email == email) {
        var right_password = JSON.parse(localStorage.getItem("conta_login")).password
        console.log(password)
        console.log(right_password)
        if (password == right_password) {
            localStorageUser = true
            return true
        } else {
            error_msg.classList.remove("d-none")
        return false
        }
    } else {
        error_msg.classList.remove("d-none")
        return false
    } 
}

document.getElementById('login_form').addEventListener('submit', function (event) {
    event.preventDefault();

    email = document.getElementById("email").value.trim()

    
    if (localStorageUser) {
        var account_data = JSON.parse(localStorage.getItem("conta_login"))
    } else {
        var account_data = user_logins[email]
    }
    
    localStorage.setItem("conta_login", JSON.stringify({nome: account_data.nome, email: email, password: account_data.password, data_nascimento: account_data.data_nascimento, codigo_postal: account_data.codigo_postal, distrito: account_data.distrito, concelho: account_data.concelho}))

    
    window.location.href = 'main_page.html';
});

