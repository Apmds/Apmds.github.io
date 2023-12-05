function check_login() {
    error_msg = document.getElementById("error_msg")
    email = document.getElementById("email").value.trim()
    password = document.getElementById("password").value
    logins = {
        "samuel.ramos.sgfr@gmail.com": {
            "password": "1234"
        },
        "goncalosimoes511@gmail.com": {
            "password": "4321"
        },
        "goncaloliveirasilva@gmail.com": {
            "password": "gsil"
        },
        "ap1mrfj@gmail.com": {
            "password": "A1Sd"
        }
    }
    if (Object.keys(logins).includes(email)) {
        var right_password = logins[email]["password"]
        console.log(password)
        console.log(right_password)
        if (password == right_password) {
            return true
        } else {
            error_msg.style.display = ""
        return false
        }
    } else {
        error_msg.style.display = ""
        return false
    } 
}



/*
// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('userData.json');
    self.displayName = 'Data';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getArenas...');
        var composedUri = self.baseUri()
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.records(data.Records);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalRecords);
            //self.SetFavourites();
        });
    };

    //--- Internal functions
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

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function showLoading() {
        //$("#myModal").modal('show', {
        //    backdrop: 'static',
        //    keyboard: false
        //});
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    //$("#myModal").modal('hide');
})
*/

/*
var data
fetch('https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json')
    .then((response) => response.json())
    .then((json) => {
        data = json
        console.log(json);
        for (let i = 0; i < json.length; i++) {
            if ("a" in Object.keys(json)) {
                console.log("AAAA")
            }
        }
    });
*/

/*
let response = await fetch("https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json'"); 
let parsed = await response.json();
console.log(parsed)
*/

/*
var data
console.log($.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json",
    dataType: 'json',
    contentType: 'application/json',
    data: data ? JSON.stringify(data) : null,
    error: function (jqXHR, textStatus, errorThrown) {
        console.log("AJAX Call[" + "https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json" + "] Fail...");
        //hideLoading();
        //self.error(errorThrown);
    }
}))

function check_login() {
    var self = this
    self.url = ko.observable("https://raw.githubusercontent.com/Apmds/Apmds.github.io/main/userData.json")
    self.data = ko.observable("")
    console.log($.ajax({
        type: "GET",
        url: self.url(),
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
    }))
    //self.data()
    console.log()
    
}
*/

