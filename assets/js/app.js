$(document).ready(function () {
    $('#btn').click(function () {
        $("#Features").addClass("d-none");
        $("#testresultfree").addClass("d-none");
        $("#errorresult").addClass("d-none");
        var email = $('#email').val();
        var testStart = Date.now();
        var openAPISpectemp = $('#openAPISpec').val();
        var openAPISpec = openAPISpectemp.replace("getpostman", "postman");
        $("#email").next().hide();
        $("#openAPISpec").next().hide();
        if (openAPISpec == '') {
            $('.invalid-tooltip').show()
            return false;
        }
        if (IsEmail(email) == false) {
            $('#email').next().show();
            return false;
        }
        $(this).prop('disabled', true);
        $('#btnpro').prop('disabled', true);
        $('.freebtn').prop('disabled', true);
        $('.probtn').prop('disabled', true);
        $("#testresultfree").addClass("d-none");
        $('.testdomain').text(openAPISpec);
        $("#loadingresultfree").removeClass("d-none");
        var jsonData = { 'email': email, 'openAPISpec': openAPISpec, 'sourceName': "APIsec EthicalCheck", "sourceURL": "https://www.ethicalcheck.dev/" };


        var hutk = document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var HSData = {
            "submittedAt": testStart,
            "fields": [
                {
                    "objectTypeId": "0-1",
                    "name": "email",
                    "value": email
                },
                {
                    "objectTypeId": "0-1",
                    "name": "api_specification_url",
                    "value": openAPISpec
                }
            ],
            "context": {
                "pageUri": window.location.href,
                "pageName": "Free API Test",
                "ipAddress": "{ip_address}"
            }
        };
        event.preventDefault();

        $.ajax({
            url: 'https://pentest.apisec.ai/api/v1/pentest',
            method: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(jsonData),
            success: function (result) {
                $('#email').val("");
                $('#openAPISpec').val('');
                $('#btn').prop('disabled', false);
                $('.freebtn').prop('disabled', false);
                $('.probtn').prop('disabled', false);
                $('#btnpro').prop('disabled', false);
                $("#loadingresultfree").addClass("d-none");
                // $("#errorresult2").addClass("d-none");
                // $("#displayerrormessage").addClass("d-none");
                $("#errorresult").addClass("d-none");
                $("#errorscreen").addClass("d-none")
                $("#Features").removeClass("d-none");
                $("#testresultfree").removeClass("d-none");
                $('html, body').animate({
                    scrollTop: $("#Features").offset().top
                }, 1000);


                if (result.errors === true) {
                    errorDisplay();
                }

                function errorDisplay() {
                    $("#testresultfree").addClass("d-none");
                    $("#testresultpro").addClass("d-none");
                    $("#displayerrormessage").addClass("d-none");
                    $("#errorscreen").addClass("d-none")
                    for (var i = 0; i < result.messages.length; i++) {
                        if (result.messages[i].type == "ERROR") {
                            keyMessage = result.messages[i].key;
                            messageValue = result.messages[i].value;
                            $('#keyerror').text(keyMessage);
                            $('#errorvalue').html(messageValue);
                        }
                    }
                    $("#errorresult").removeClass("d-none")

                }
            },
            error: function (error) {

                var err = eval("(" + error.responseText + ")");
                console.log(err.messageValue)
                var errmsg = error.responseText
                if (err.status == '500') {
                    $('#email').val("");
                    $('#openAPISpec').val('');
                    $('#btn').prop('disabled', false);
                    $('.freebtn').prop('disabled', false);
                    $('.probtn').prop('disabled', false);
                    $("#loadingresultfree").addClass("d-none");
                    $("#Features").removeClass("d-none");
                    $("#errorscreen").removeClass("d-none")
                }
                else {
                    errorDisplay();
                }
                // console.log(error);
            }

        });

    });

    $("#apiurl").addClass("d-none");
    $("#bearertoken").addClass("d-none");
    $("#emailpro2").addClass("d-none");
    $("#licensekey2").addClass("d-none");


    $('#btnpro').click(function () {



        $("#apiurl").addClass("d-none");
        $("#bearertoken").addClass("d-none");
        $("#emailpro2").addClass("d-none");
        $("#licensekey2").addClass("d-none");
        $("#invalidLicense").addClass("d-none");
        $("#displayerrormessage").addClass("d-none");
        $("#testresultpro").addClass("d-none");
        $("#errorresult").addClass("d-none");
        $('html, body').animate({
            scrollTop: $("#Features").offset().top
        }, 1000);
        var testStart = Date.now();
        var email = $('#emailPro').val();
        var openAPISpectemp = $('#openAPISpecPro').val();
        var licenseKey = $('#licenseKey').val();
        var headers = $('#tokenField').val();
        var openAPISpec = openAPISpectemp.replace("getpostman", "postman");
        $("#emailPro").next().hide();
        $("#openAPISpecPro").next().hide();
        $("#licenseKey").next().hide();
        $("#headers").next().hide();
        if (openAPISpecPro == '') {
            $('.invalid-tooltip').show()
        }
        validatepro();
        if (IsEmail(email) == false || openAPISpectemp == '' || licenseKey == '' || headers == '') {
            $('#emailPro').next().show();
            $('#openAPISpecPro').next().show();
            $('#licenseKey').next().show();
            $('#tokenField').next().show();
            return false;
        }
        if (openAPISpectemp !== '' && headers !== '' && email !== '' && licenseKey !== '') {
            $('.freebtn').prop('disabled', true);
            $('.probtn').prop('disabled', true);
            $('#btnpro').prop('disabled', true);
            $(this).prop('disabled', true);
            $("#testresultpro").addClass("d-none");
            $('.testdomain').text(openAPISpec);
            $("#loadingresultpro").removeClass("d-none");
            var jsonData = { 'email': email, 'openAPISpec': openAPISpec, 'licenseKey': licenseKey, 'headers': [headers], 'sourceName': "ethicalcheck pro", "sourceURL": "https://www.ethicalcheck.dev/" };
            event.preventDefault();
            $.ajax({
                url: 'https://pentest.apisec.ai/api/v1/pentest',
                method: 'POST',
                dataType: 'json',
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(jsonData),
                success: function (result) {
                    $('#emailPro').val("");
                    $('#openAPISpecPro').val('');
                    $('#licenseKey').val('');
                    $('#tokenField').val('');
                    $('#btn').prop('disabled', false);
                    $('#btnpro').prop('disabled', false);
                    $('.freebtn').prop('disabled', false);
                    $('.probtn').prop('disabled', false);
                    $("#invalidLicense").addClass("d-none");
                    $("#loadingresultpro").addClass("d-none");
                    $("#displayerrormessage").addClass("d-none");
                    $("#errorresult").addClass("d-none");
                    $("#Features").removeClass("d-none");
                    if (result.errors == true) {
                        errorDisplay();

                        $("#testresultpro").addClass("d-none");
                    }
                    else {
                        $("#testresultpro").removeClass("d-none");
                        $('html, body').animate({
                            scrollTop: $("#Features").offset().top
                        }, 1000);

                    }

                    function errorDisplay() {


                        $("#testresultpro").addClass("d-none");
                        $("#displayerrormessage").addClass("d-none");
                        for (var i = 0; i < result.messages.length; i++) {
                            if (result.messages[i].type == "ERROR") {

                                keyMessage = result.messages[i].key;
                                messageValue = result.messages[i].value;
                                $('#keyerror').text(keyMessage);
                                $('#errorvalue').text(messageValue);
                                console.log('keymessahe', keyMessage);
                                console.log('keymessahe', messageValue);

                            }
                        }
                        $("#errorresult").removeClass("d-none")

                    }

                },
                error: function (error) {

                    $('#keyerror') = keyerror;
                    $('#errorvalue') = errorvalue;
                    $("#errorresult").removeClass("d-none")

                    console.log(error);

                }

            });
        }
        function validatepro() {
            if (openAPISpectemp == '') {
                $("#apiurl").removeClass("d-none");
            }
            if (headers == '') {
                $("#bearertoken").removeClass("d-none");
            }
            if (email == '' || IsEmail(email) == false) {
                $("#emailpro2").removeClass("d-none");
            }
            if (licenseKey == '') {
                $("#licensekey2").removeClass("d-none");
            }
        }
        function IsEmail(email) {
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(email)) {
                return false;
            } else {
                return true;
            }
        }
    })

});