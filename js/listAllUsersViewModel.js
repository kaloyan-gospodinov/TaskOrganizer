function ListAllUsersViewModel() {
    var self = this;
    self.usersList = ko.observableArray([]);

    self.getAllUsers = function () {
        var request = {
             action: 'getAllUsers'
        };

        $.getJSON('ss/controller.php', request, function (response) {
            if (response.success)
            {
                var mappedUsers = ko.utils.arrayMap(response.data, function (data) {
                    return new User(data);
                });
                self.usersList(mappedUsers);
            }
        });
    };

    self.getAllUsers();
};