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

function check_login() {
    error_msg = document.getElementById("error_msg")
    email = document.getElementById("email").value.trim()
    password = document.getElementById("password").value
    
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
    } else {
        error_msg.classList.remove("d-none")
        return false
    } 
}

document.getElementById('login_form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the default form submission

    // Your form handling logic goes here
    email = document.getElementById("email").value.trim()
    localStorage.setItem("conta_login", JSON.stringify({[email]: user_logins[email]}))

    // Example: Change the page to "newpage.html"
    window.location.href = 'main_page.html';
});

