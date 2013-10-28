function UserTasksViewModel() {
    var self = this;
    self.tasks = ko.observableArray([]);

    self.getTasks = function () {
        $.ajax({
            type: 'POST',
            url: 'ss/controller.php',
            data: {
                action: 'getAllTasksByUser'
            }
        }).done(function (response) {
            if (response.success) {

                var mappedTasks = ko.utils.arrayMap(response.data, function (data) {
                    return new Task(data);
                });

                self.tasks(mappedTasks);
            }
        });
    };

    self.getYMDTime = function (timestamp) {
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var formattedTime = day + '.' + month + '.' + year;

        return formattedTime;
    };

    self.getTasks();
};