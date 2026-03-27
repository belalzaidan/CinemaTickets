
function bilett() {

    film = $('#films').val()
    antall = $('#antall').val()
    fornavn = $('#fornavn').val()
    etternavn = $('#etternavn').val()
    telefon = $('#telefon').val()
    epost = $('#email').val()


    isValid = true;

    if (film === "default") {
        isValid = false;
        $("#result_films").html('Vennligst velg en film');
    } else {
        $("#result_films").html('');
    }

    if (antall === '') {
        isValid = false;
        $("#result_antall").html('Vennligst fyll ut antall biletter');
    } else if (antall <= 0 || antall > 5) {
        isValid = false;
        $("#result_antall").html('Kun mellom (1-5) biletter!');
    } else {
        $("#result_antall").html('');
    }

    if (fornavn === '') {
        isValid = false;
        $("#result_fornavn").html('Vennligst fyll ut fornavn');
    } else {
        $("#result_fornavn").html('');
    }

    if (etternavn === '') {
        isValid = false;
        $("#result_etternavn").html('Vennligst fyll ut etternavn');
        $("#result_films").html("You are a sucker");
    } else {
        $("#result_etternavn").html('');
    }

    if (telefon === '' || !Number(telefon)) {
        isValid = false;
        $("#result_telefon").html('Vennligst fyll ut gyldig telefonnummer');
    } else {
        $("#result_telefon").html('');
    }

    if (epost === '') {
        isValid = false;
        $("#result_email").html('Vennligst fyll ut epost');
    } else {
        $("#result_email").html('');
    }

    if (isValid) {
        let bilett = {
            film: film,
            antall: antall,
            fornavn: fornavn,
            etternavn: etternavn,
            telefon: telefon,
            epost: epost
        };

        $.post("/Lagre", bilett, function () {
            hentBilett(false);
        });

        $("#films").val("default");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefon").val("");
        $("#email").val("");
    }
}

function hentBilett(skipifstatement) {
    $("#result").html("");
    let sort = $("#order").val();
    let dsort = "/hentAlle/";

    switch (sort) {
        case "t":
            dsort = dsort + "0";
            break;
        case "fi":
            dsort = dsort + "1";
            break;
        case "a":
            dsort = dsort + "2";
            break;
        case "fo":
            dsort = dsort + "3";
            break;
        case "et":
            dsort = dsort + "4";
            break;
        default:
            dsort = dsort + "0";
            console.log("Error has occured: " + sort);
    }

    $.get(dsort, function (data) {
        console.log(data);
        let alleBiletter = data;
        if (alleBiletter.length === 0 && !skipifstatement){
            $("#msg").html("Ingen biletter til å vise.").fadeIn();
            setTimeout(function() {
                $("#msg").fadeOut();
            }, 3000);
            return;
        }

        var ut = "<h1>Bestilte biletter</h1>" +
            "<table class='table table-borderless' id='tickets'>" +
            "<tr>" +
            "<th> Valgt film </th>" +
            "<th> Antall </th>" +
            "<th> Navn </th>" +
            "<th> TelefonNr </th>" +
            "<th> Email </th>" +
            "<th></th>" +
            "<th></th>" +
            "</tr>";

        for (let i = 0; i < alleBiletter.length; i++) {
            ut += "<tr>" +
                "<td>" + alleBiletter[i].film + "</td>" +
                "<td>" + alleBiletter[i].antall + "</td>" +
                "<td>" + alleBiletter[i].fornavn + " " + alleBiletter[i].etternavn + "</td>" +
                "<td>" + alleBiletter[i].telefon + "</td>" +
                "<td>" + alleBiletter[i].epost + "</td>" +
                "<td><button onclick='slettBilett(" + alleBiletter[i].id + ")'><i id='slett' class=\"fas fa-trash\"></i></button></td>" +
                "<td><button onclick='slettBekreft(" + alleBiletter[i].id + ")'><i id='bekreft' class=\"fa-solid fa-check \"></i></button></td>" +
                "<td><button onclick='slettAvbryt(" + alleBiletter[i].id + ")'><i id='avbryt' class=\"fa-solid fa-xmark \"></i></button></td>" +

                "</tr>";
        }

        ut += "</table>" +
            "<div class='buttons'><button class='btn btn-danger' onclick='slettAlle()'> Slett alle bilettene </button></div>";
        $('#result').html(ut);
        if (alleBiletter.length === 0) {
            $("#result").html("");
        }
    });
}


function slettBilett(ticketId){

    var slettBtn = $(`#slett-${ticketId}`)
    var bekreftBtn = $(`#bekreft-${ticketId}`)
    var avbrytBtn = $(`#avbryt-${ticketId}`)

    slettBtn.addClass('hidden')
    bekreftBtn.removeClass('hidden')
    avbrytBtn.removeClass('hidden')
}

function slettAvbryt(ticketId){

    var slettBtn = $(`#slett-${ticketId}`)
    var bekreftBtn = $(`#bekreft-${ticketId}`)
    var avbrytBtn = $(`#avbryt-${ticketId}`)

    slettBtn.removeClass('hidden')
    bekreftBtn.addClass('hidden')
    avbrytBtn.addClass('hidden')
}
$(document).on('click', '.slettBtn', function () {
    var ticketId = $(this).data('ticketId');
    slettBekreft(ticketId);
});

$(document).on('click', '.avbrytBtn', function () {
    var ticketId = $(this).data('ticketId');
    slettAvbryt(ticketId);
});

function endreBilett(bilett){

}

function slettBekreft(ticketId){
    $("#result").html("");
    $.get("/slettBilett/", ticketId, function() {
        hentBilett(true);
        $("#msg").html("En bilett er slettet!").fadeIn();
        setTimeout(function() {
            $("#msg").fadeOut();
            }, 3000);
    });
}


function slettAlle(){
    $.get('/slettAlle', function (){
        $("#result").html("");
        $("#msg").html("Alle bilettene er slettet!").fadeIn();
        setTimeout(function() {
            $("#msg").fadeOut();
        }, 3000);
    });
}