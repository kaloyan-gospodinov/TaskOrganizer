(function() {
    var delay = 500,
        mailRe = /^[0-9a-zA-Z_.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        $regName = $('#regName'),
        $regMail = $('#regEmail'),
        $regPass = $('#regPassword'),
        $regDesc = $('#regDescription'),
        $regAlert = $('#regAlert'),
        $regMsg = $('#regMessage'),
        $regSubmit = $('#regSubmit'),
        $regClose = $('#regClose');

    $regSubmit.on('click', function (ev) {
        ev.preventDefault();

        if ($regName.val().length === 0) {
            $regMsg.text('Oops.. Invalid Name..');
            $regAlert.addClass('alert-error');
            $regAlert.fadeIn(delay);
            $regName.focus();
            return;
        }

        if (!mailRe.test($regMail.val())) {
            $regMsg.text('Oops.. Re-check your email..');
            $regAlert.addClass('alert-error');
            $regAlert.fadeIn(delay);
            $regMail.focus();
            return;
        }

        if ($regPass.val().length < 6) {
            $regMsg.text('Oops.. Use at least 6 characters password..');
            $regAlert.addClass('alert-error');
            $regAlert.fadeIn(delay);
            $regPass.focus();
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'ss/controller.php',
            data: {
                action: 'register',
                name : $regName.val(),
                email : $regMail.val(),
                password : $regPass.val(),
                description : $regDesc.val()
             }
        }).done(function (response) {
            $regMsg.text(response.message);

            if (response.error) {
                $regAlert.addClass('alert-error');
                $regAlert.fadeIn(delay);
                $regName.focus();
            } else if (response.success) {
                $regAlert.removeClass('alert-error');
                $regAlert.addClass('alert-success');
                $regAlert.fadeIn(delay);
                $regSubmit.hide(); 
            }
        });
    });

    $regClose.on('click', function () {
        setTimeout(function () {
            $regAlert.removeClass('alert-error');
            $regAlert.removeClass('alert-success');
            $regAlert.hide();
            $regSubmit.show()
        }, delay);
    });
}());