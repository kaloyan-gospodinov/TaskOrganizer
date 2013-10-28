function ListAllProjectsViewModel() {
    var self = this;
    self.projectsList = ko.observableArray([]);

    self.getAllProjects = function () {
        var request = {
            action: 'getAllProjects'
        };

        $.getJSON('ss/controller.php', request, function (response) {
            if (response.success)
            {
                var mappedProjects = ko.utils.arrayMap(response.data, function (data) {
                    return new Project(data)
                });
                self.projectsList(mappedProjects);
            }
        });
    };

    self.getAllProjects();
};