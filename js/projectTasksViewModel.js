function ProjectTasksViewModel(pid) {
    var self = this;
    self.tasks = ko.observableArray([]);
    self.currentUserID = ko.observable();

    self.getCurrentUserID = function () {
        $.ajax({
            type: 'POST',
            url: 'ss/controller.php',
            data: {
                action: 'getCurrentUserId'
            }
        }).done(function (response) {
            if (response.success) {
                self.currentUserID(response.data);
            }
        });
    }

    self.getTasks = function () {
        $.ajax({
            type: 'POST',
            url: 'ss/controller.php',
            data: {
                action: 'getAllTasksByProject',
                id : pid
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

    self.editTask = function (item, event) {
        // TODO
    }

    self.getCurrentUserID();
    self.getTasks();
};