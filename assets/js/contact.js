$("#contact").ready(function () {
    $(".alertDanger").hide()
    $(".alertSuccess").hide()
    $("#sendMessage").on("click", function (e) {
        e.preventDefault()
        const fullName = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        let html = '';
        let array
        if (!validateFullName(fullName)) {
            html += `<li> Unesite ispravno ime i prezime </li>`
        }
        if (!validateEmail(email)) {
            html += `<li> Unesite ispravan e-mail </li>`
        }
        if (!validateSubject(subject)) {
            html += `<li> Unesite ispravan naslov poruke </li>`
        }
        if (!validateMessage(message)) {
            html += `<li> Unesite ispravan naslov poruke </li>`
        }
        if (html !== '') {
            document.getElementById("errorMessage").innerHTML = html;
            $(".alertDanger").show()
            $(".alertSuccess").hide()
            // $("alert-dange").removeClass('d-none');
        } else {
            $.ajax({
                "method": "POST",
                "url": "contact.php",
                "dataType": "json",
                "data": {fullName, email, subject, message},
                "success": function (data) {

                    $(".alertDanger").hide()
                    $(".alertSuccess").show()
                },
                "error": function (error) {
                    html += `<li> Došlo je do greške </li>`
                    document.getElementById("errorMessage").innerHTML = html;
                    $(".alertDanger").show()
                    $(".alertSuccess").hide()
                }
            })

        }
    })
});

function validateFullName(fullName) {
    const fullNameRegex = /^(?!\s*$)[a-zA-Z\s]{2,100}$/;
    return fullNameRegex.test(fullName);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    const subjectRegex = /^(?!\s*$)[\s\S]{1,100}$/

    return subjectRegex.test(subject);
}

function validateMessage(message) {
    const messageRegex = /^(?!\s*$)[\s\S]{1,1000}$/
    return messageRegex.test(message);
}