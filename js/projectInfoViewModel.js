function ProjectInfoViewModel(pid) {
	var self = this;

	self.project = ko.mapping.fromJS(new Project({}));
	self.owner = ko.mapping.fromJS(new User({}));
	self.userID = ko.observable();
	self.participants = ko.observableArray([]);
	self.tasks = ko.observableArray([]);
    self.participate = ko.observable();
    self.own = ko.computed(function() {
        return self.project.owner() === self.userID();    
    }, this);

    self.getCurrentUserID = function () {
		var request = {
			action: 'getCurrentUserId'
		};

		$.post('ss/controller.php', request, function (response) {
			if (response.success)
			{
				self.userID(response.data);
			}
		});
    }

	self.getProjectInfo = function () {
		var request = {
			action: 'getProject',
			id: pid
		};

		$.post('ss/controller.php', request, function (response) {
			if (response.success)
			{
				ko.mapping.fromJS(
					response.data,
					self.project)
			}
		});
	};

	self.getOwnerInfo = function () {
		var request = {
			action: 'getUser',
			avatarSize: '200',
			id: self.project.owner
		};

		$.post('ss/controller.php', request, function (response) {
			if (response.success)
			{
				ko.mapping.fromJS(
					response.data,
					self.owner)
			}
		});
	};

	self.getParticipants = function () {
		var request = {
			action: 'getUsersByProject',
			id: pid
		};

		$.post('ss/controller.php', request, function (response) {
			if (response.success)
			{
				var i,
					mappedUsers = ko.utils.arrayMap(response.data, function (data) {
					return new User(data);
				});

				self.participants(mappedUsers);

				for (i = 0; i < mappedUsers.length; i++) {
					if(mappedUsers[i].id === self.userID()) {
						self.participate(true);
						break;
					}
				}
			}
		});
	};

	self.waitForOwner = function () {
		if(typeof self.project.owner() !== "undefined"){
			self.getOwnerInfo();
		}
		else{
			console.log('wait');
			setTimeout(function(){
				self.waitForOwner();
			}, 250);
		}
	}

	self.getCurrentUserID();
	self.getProjectInfo();
	self.getParticipants();
	self.waitForOwner();
};