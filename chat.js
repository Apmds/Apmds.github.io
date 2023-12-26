var vm = {
    messages: ko.observableArray([]),
    user_here: ko.observable(JSON.parse(localStorage.getItem("conta_login")).email),
    user_there: ko.observable('Outra pessoa')
}

$(document).ready(function () {
    var chat_log = JSON.parse(localStorage.getItem("chat-log"))
    if (chat_log == null) {
        localStorage.setItem("chat-log", JSON.stringify([]))
    }
    vm.messages(chat_log)

    ko.applyBindings(vm)
})

function send_message() {
    $("#chat-input").val($("#chat-input").val().trim())
    if ($("#chat-input").val() != "") {
        vm.messages.push({user: JSON.parse(localStorage.getItem("conta_login")).email,
        message: $("#chat-input").val(),
        float: vm.messages.user_here == JSON.parse(localStorage.getItem("conta_login")).email ? "left" : "right"})
        $("#chat-input").val("")
        console.log(JSON.parse(localStorage.getItem("conta_login")).email)
    }
    if (vm.messages().length > 9) {
        while (vm.messages().length > 9) {
            vm.messages.shift()
        }
    }
    localStorage.setItem("chat-log", JSON.stringify(vm.messages()))

    setTimeout(function () {
        var responses = [
            "Olá! Agradeço o contacto.",
            "A sua camisola está quase pronta!",
        ]
        
        var randomItem = responses[Math.floor(Math.random()*responses.length)];
        vm.messages.push({user: "Outra pessoa", message: randomItem, float: vm.messages.user_there == JSON.parse(localStorage.getItem("conta_login")).email ? "right" : "left"})


        if (vm.messages().length > 9) {
            while (vm.messages().length > 9) {
                vm.messages.shift()
            }
        }

        localStorage.setItem("chat-log", JSON.stringify(vm.messages()))
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