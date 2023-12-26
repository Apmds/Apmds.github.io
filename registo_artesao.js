
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

function validarNegocio() {
    const morada = document.getElementById("morada").value.trim()
    const codigoPostal = document.getElementById("codigo-postal").value.trim()
    const moradaArray = morada.split(" ")
    const codigoPostalArray = codigoPostal.split("-")
    const distritoEscolhido = document.getElementById("select-distrito").value
    const concelhoEscolhido = document.getElementById("concelho").value
    const profissoes = document.querySelectorAll("#tipoartesao input[type='checkbox']")
    const profissoesSelecionadas = []
    let codigoPostalValido = true
    let moradaValida = true
    let distritoValido = true
    let concelhoValido = true
    let profissoesValidas = true

    profissoes.forEach(function(profissao) {
        if (profissao.checked) {
            profissoesSelecionadas.push(profissao.value)
        }
    })

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

    if (moradaArray[0] !== "Rua" || moradaArray.length < 2) {
        document.getElementById("erroMorada").classList.remove("d-none")
        moradaValida = false
    } else {
        document.getElementById("erroMorada").classList.add("d-none")
    }

    if (!codigoPostal || !validarAlgarismos() || codigoPostalArray.length !== 2 || codigoPostalArray[0].trim().length !== 4 || codigoPostalArray[1].trim().length !== 3) {
        document.getElementById("erroCodigoPostal").classList.remove("d-none")
            codigoPostalValido = false
    } else {
        document.getElementById("erroCodigoPostal").classList.add("d-none")
    }

    if (distritoEscolhido === "Selecione o distrito") {
        distritoValido = false
        document.getElementById("erroDistrito").classList.remove("d-none")
    } else {
        document.getElementById("erroDistrito").classList.add("d-none")
    }

    if (concelhoEscolhido === "Selecione o concelho") {
        concelhoValido = false
        document.getElementById("erroConcelho").classList.remove("d-none")
    } else {
        document.getElementById("erroConcelho").classList.add("d-none")
    }

    if (profissoesSelecionadas.length < 1) {
        profissoesValidas = false
        document.getElementById("erroprofissao").classList.remove("d-none")
    } else {
        document.getElementById("erroprofissao").classList.add("d-none")
    }

    if (moradaValida && codigoPostalValido && distritoValido && concelhoValido && profissoesValidas) {
        window.location.href = "/registo_artesao_efetuado.html"
    }

    return moradaValida && codigoPostalValido && distritoValido && concelhoValido && profissoesValidas
}

function clearInput() {
    const morada = document.getElementById("morada")
    const codigoPostal = document.getElementById("codigo-postal")
    morada.value = ""
    codigoPostal.value = ""
    document.getElementById("erroMorada").classList.add("d-none")
    document.getElementById("erroCodigoPostal").classList.add("d-none")
    document.getElementById("erroDistrito").classList.add("d-none")
    document.getElementById("erroConcelho").classList.add("d-none")
    document.getElementById("erroprofissao").classList.add("d-none")
    viewModel.distritoSelecionado("Selecione o distrito")
    const profissoes = document.querySelectorAll("#tipoartesao input[type='checkbox']")
    profissoes.forEach(function (profissao) {
        profissao.checked = false
    })

}

