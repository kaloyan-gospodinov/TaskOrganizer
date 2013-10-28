(function () {
    var delay = 500,
    	userID = null,
        $title = $('#title'),
        $description = $('#description'),
        $alert = $('#alert'),
        $message = $('#message'),
        $add = $('#add'),
        $close = $('#close');

    $.ajax({
        type: 'POST',
        url: 'ss/controller.php',
        data: {
            action: 'getCurrentUserId'
        }
    }).done(function (response) {
        if (response.success) {
            userID = response.data;
        }
    });

    $add.on('click', function (ev) {
        ev.preventDefault();

        if ($title.val().length === 0) {
            $message.text("Oops.. Don't forget the title..");
            $alert.addClass('alert-error');
            $alert.fadeIn(delay);
            $title.focus();
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'ss/controller.php',
            data: {
                action: 'addProject',
                owner : userID,
                title : $title.val(),
                description : $description.val()
             }
        }).done(function (response) {
            $message.text(response.message);

            if (response.error) {
                $alert.addClass('alert-error');
                $alert.fadeIn(delay);
                $title.focus();
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