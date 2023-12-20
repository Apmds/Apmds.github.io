const githubRepoUrl = 'https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json';
/*
function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    ajaxHelper(githubRepoUrl, "get").done(function (data) {
        console.log(data)
        vm.messages(data)
    })
*/

var vm = {
    messages: ko.observableArray([]),
    user_here: ko.observable(JSON.parse(localStorage.getItem("conta_login")).email),
    user_there: ko.observable('Outra pessoa')
}

$(document).ready(function () {
    var chat_log = localStorage.getItem("chat_log")
    if (chat_log == null) {
        localStorage.setItem("chat_log", JSON.stringify([]))
    }
    

    ko.applyBindings(vm)
})

function send_message() {
    $("#chat-input").val($("#chat-input").val().trim())
    if ($("#chat-input").val() != "") {
        vm.messages.push({user: JSON.parse(localStorage.getItem("conta_login")).email, message: $("#chat-input").val()})
        $("#chat-input").val("")
    }

    
    console.log(vm.messages())
    setTimeout(function () {
        var responses = [
            "Olá! Agradeço o contacto.",
            "eu💀",
            "A sua camisola está quase pronta, D.Anastácia! :)",
        ]
        
        var randomItem = responses[Math.floor(Math.random()*responses.length)];
        vm.messages.push({user: "Outra pessoa", message: randomItem})
    }, Math.floor(Math.random() * 1000) + 1)
}

function toggle_chat() {
    $("#chat-banner").toggleClass("d-none")

    if ($("#chat-banner").hasClass("d-none")) {
        $("#chat_toggle_btn").css("right", "1%")
    } else {
        $("#chat_toggle_btn").css("right", "16%")
    }
    
}