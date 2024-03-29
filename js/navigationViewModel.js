function NavigationViewModel(serverUrl) {
	var self = this,
		$loginMail = $('#loginMail'),
		$loginPass = $('#loginPass'),
		$loginBtn = $('#loginBtn'),
		$logoutBtn = $('#logoutBtn'),
		$pageContainer = $('#pagesContainer');

	self.serverUrl = serverUrl || 'ss/controller.php';
	self.pages = ['projects', 'calendar'];
	self.currentPage = ko.observable(false);
	self.currentUserID = ko.observable(false);
	
	self.login = function () {
		return $.ajax({
			type: 'POST',
			url: self.serverUrl,
			data: {
				action: 'login',
				email : $loginMail.val(),
				password : $loginPass.val()
			}
		}).done(function (response) {
			if (response.success) {
				$loginMail.val('');
				$loginPass.val('');
				self.currentUserID(response.userid);
				self.gotoPage('overview');
				self.renderPage('overview');
			} else {
				$loginBtn.popover('show');
			}
		});
	};

	self.logout = function () {
		return $.ajax({
			type: 'POST',
			url: self.serverUrl,
			data: {
				action: 'logout'
			}
		}).done(function (response) {
			if (response.success) {
				self.currentUserID(false);
				self.removeHash();
				self.renderPage('main');
			}
		});
	};

	self.getCurrentUserId = function () {
		$.ajax({
			type: 'POST',
			url: self.serverUrl,
			data: {
				action: 'getCurrentUserId'
			}
		}).done(function (response) {
			if (response.success) {
				self.currentUserID(response.data);
			}
		});
	};

	self.attachPopover = function () {
		$loginBtn.popover({
			animation : true,
			placement : 'bottom',
			trigger : 'manual',
			content : 'Invalid Email or Password..'
		});
	};

	self.hidePopover = function () {
		$loginBtn.popover('hide');
	};

	self.gotoPage = function (page) {
		location.hash = page;
	};

	self.removeHash = function () { 
    	history.pushState(
    		"",
    		document.title,
    		window.location.pathname + window.location.search);
	};

	self.renderPage = function (page, id) {
		if (!page) {
			return;
		}

		if (id) {
			$pageContainer.load(page + 'IDPage.html');
		} else {
			$pageContainer.load(page + 'Page.html');
		}

		$pageContainer.hide().fadeIn(300);
	};

	self.initNavigation = function () {
		Sammy(function () {
			this.get('#:page', function() {
				self.currentPage(this.params.page);
				self.renderPage(this.params.page);
			});

			this.get('#:page/:pageID', function() {
				self.currentPage(false);
				self.renderPage(
					this.params.page,
					this.params.pageID);
			});

			this.get('', function () {
				if (self.currentUserID()) {
					this.app.runRoute('get', '#overview');
				} else {
					this.app.runRoute('get', '#main');
				}
			});
		}).run();
	};

	self.attachPopover();
	self.getCurrentUserId();
	self.initNavigation();
};