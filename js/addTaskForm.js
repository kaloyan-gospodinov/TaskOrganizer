(function () {
    var delay = 500,
        $project = $('#taskproject'),
        $title = $('#tasktitle'),
        $description = $('#taskdescription'),
        $startDate = $('#taskstartDate')
            .val(new Date().toJSON().slice(0,10)),
        $endDate = $('#taskendDate')
            .val(new Date().toJSON().slice(0,10)),
        $status = $('#taskstatus'),
        $alert = $('#taskalert'),
        $message = $('#taskmessage'),
        $add = $('#addtask'),
        $close = $('#closetask');

	var slash = location.hash.indexOf('/');
		pid = location.hash.substring(slash + 1);

    $add.on('click', function (ev) {
        ev.preventDefault();

        var projectID = $project.val() || pid;
        var title = $title.val();
        var description = $description.val();
        var startDate = new Date($startDate.val()).getTime() / 1000;
        var endDate = new Date($endDate.val()).getTime() / 1000;
        var status = $status.val() || 1;

        if (title.length === 0) {
            $message.text("Oops.. Title is not valid..");
            $alert.addClass('alert-error');
            $alert.fadeIn(delay);
            $title.focus();
            return;
        }

        if (status.length === 0) {
            $message.text("Oops.. Title is not valid..");
            $alert.addClass('alert-error');
            $alert.fadeIn(delay);
            $status.focus();
            return;
        }

        if ($title.length === 0) {
            $message.text("Oops.. Title is not valid..");
            $alert.addClass('alert-error');
            $alert.fadeIn(delay);
            $title.focus();
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'ss/controller.php',
            data: {
                action: 'addTask',
                project_id: projectID,
                status: status,
                title: title,
                description: description,
                startdate: startDate,
                enddate: endDate
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