function ProjectsViewModel(serverUrl, uid) {
	var self = this;

	self.myProjects = ko.observableArray([]);
	self.sideProjects = ko.observableArray([]);
	self.serverUrl = serverUrl || 'ss/controller.php';

	self.getMyProjects = function () {
		var request = {
			action: 'getUserProjects',
			id: uid
		};

		return $.post(self.serverUrl, request, function (response) {
			if (response.success)
			{
				var mappedProjects = ko.utils.arrayMap(response.data, function (data) {
					return new Project(data);
				});

				self.myProjects(mappedProjects);
			}
		});
	};

	self.AddProject = function (newProject) {
		self.myProjects.push(newProject)
	};

	self.getSideProjects = function () {
		var request = {
			action: 'getProjectsByUser',
			id: uid
		};

		return $.post(self.serverUrl, request, function (response) {
			if (response.success)
			{
				var mappedProjects = ko.utils.arrayMap(response.data, function (data) {
					return new Project(data);
				});

				self.sideProjects(mappedProjects);
			}
		});
	};

	self.getMyProjects();
	self.getSideProjects();
}