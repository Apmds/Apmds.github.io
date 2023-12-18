function first_page() {

}

function second_page() {

}

function sign_up() {
    error_msg = document.getElementById("error_msg")
    email = document.getElementById("email").value.trim()
    password = document.getElementById("password").value
    
    
    
}

document.getElementById('sign_up_form').addEventListener('submit', function (event) {
    event.preventDefault();

    
    email = document.getElementById("email").value.trim()
    password = document.getElementById("password").value.trim()

    localStorage.setItem("conta_login", JSON.stringify({email: email, password: password}))

    
    window.location.href = 'index.html';
});

