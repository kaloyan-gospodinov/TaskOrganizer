function UserInfoViewModel(uid) {
	var self = this;
	self.userInfo = ko.mapping.fromJS(new User({}))

	self.getCurrentUserInfo = function () {
		var request = {
			action: 'getCurrentUserInfo',
			avatarSize: '200',
			id: uid
		};

		$.post('ss/controller.php', request, function (response) {
			if (response.success)
			{
				ko.mapping.fromJS(
					response.data,
					self.userInfo)
			}
		});
	};

	self.getCurrentUserInfo();
};