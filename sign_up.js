function first_page() {
    document.getElementById("page1").classList.remove("d-none")
    document.getElementById("page2").classList.add("d-none")
}

function second_page() {
    document.getElementById("page2").classList.remove("d-none")
    document.getElementById("page1").classList.add("d-none")
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

    localStorage.setItem("conta_login", JSON.stringify({email: email, password: password, nome: name, data_nascimento: birthdate, codigo_postal: post_code, distrito: district, concelho: city}))

    
    window.location.href = 'index.html';
});
