(function () {
    var delay = 500,
        mailRe = /^[0-9a-zA-Z_.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        $email = $('#email'),
        $alert = $('#alert'),
        $message = $('#message'),
        $add = $('#add'),
        $close = $('#close');

	var slash = location.hash.indexOf('/');
		pid = location.hash.substring(slash + 1);

    $add.on('click', function (ev) {
        ev.preventDefault();

        if (!mailRe.test($email.val())) {
            $message.text("Oops.. Email is not valid..");
            $alert.addClass('alert-error');
            $alert.fadeIn(delay);
            $email.focus();
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'ss/controller.php',
            data: {
                action: 'addParticipant',
                pid : pid,
                email : $email.val()
             }
        }).done(function (response) {
            $message.text(response.message);

            if (response.error) {
                $alert.addClass('alert-error');
                $alert.fadeIn(delay);
                $email.focus();
            } else if (response.success) {
                $alert.removeClass('alert-error');
                $alert.addClass('alert-success');
                $alert.fadeIn(delay);
                $add.hide();
                // TODO: Add to ViewModel
                $close.one('click', function () {
                    location.reload();
                });
            }
        });
    });

    $close.on('click', function () {
        setTimeout(function () {
            $alert.removeClass('alert-error');
            $alert.removeClass('alert-success');
            $alert.hide();
            $add.show()
        }, delay);
    });
}());