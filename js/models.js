function User(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.description = data.description;
};

function Project(data) {
    this.id = data.id;
    this.owner = data.owner;
    this.title = data.title;
    this.description = data.description;
};

function Task(data) {
	this.id = data.id;
	this.project = data.project;
	this.assignee = data.assignee;
	this.status = data.status;
	this.title = data.title;
	this.description = data.description;
	this.startDate = data.startDate;
	this.endDate = data.endDate;
}

function CalendarEvent(data) {
    this.id = data.id;
    this.title = data.title;
    this.start = data.startDate;
    this.end = data.endDate;
    this.url = '#projects/' + data.project;
}