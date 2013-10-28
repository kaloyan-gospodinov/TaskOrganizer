(function() {
	var container = $('#calendar'),
		events = [];

		var getTasks = function (callback) {
			$.ajax({
				type: 'POST',
				url: 'ss/controller.php',
				data: {
					action: 'getAllTasksByUser'
				}
			}).done(function (response) {
				if (response.success) {
					events = ko.utils.arrayMap(response.data, function (data) {
						return new CalendarEvent(data);
					});
				}
				if ($.isFunction(callback)) {
					callback();
				}
			});
		};

	var build = function () {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		var calendar = container.fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month, agendaWeek'
			},
			selectable: true,
			selectHelper: true,
			select: function(start, end, allDay) {
				var title = prompt('Event Title:');
				if (title) {
					calendar.fullCalendar('renderEvent',
						{
							title: title,
							start: start,
							end: end,
							allDay: allDay
						},
						true // make the event "stick"
					);
				}
				calendar.fullCalendar('unselect');
			},
			editable: true,
			events: events
		});
	};
	
	getTasks(build);
}());