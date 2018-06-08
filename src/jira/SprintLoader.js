//const JiraClient = require('jira-connector');
import JiraClient from './jira-connector/index';

export default class SprintLoader {

	constructor(url, sprintId) {
		this.url = url;
		this.sprintId = sprintId;

		this.MAIN_ISSUE_TYPES = ["Story", "Bug", "Technical Debt"];

		this.getJiraClient.bind(this);
		this.addTaskAssignees.bind(this);
		this.getSprint.bind(this);
		this.setTaskAssignee.bind(this);
		this.setStories.bind(this);
	}

	// var stories = [];

	// JIRA_HOST = 'jupiter.bjss.com'
	// SPRINT_ID = '10'

	getJiraClient() {
		console.log(this.url);
		return new JiraClient( {
			host: this.url
		})
	}

	setTaskAssignee(storyIndex, taskIndex, assignee, callback) {
		this.stories[storyIndex].fields.subtasks[taskIndex].fields.assignee = assignee;
		callback(this.stories);
	}

	addTaskAssignees(task, callback) {
		const stories = this.stories;
		const setTaskAssignee = this.setTaskAssignee.bind(this);
		this.getJiraClient().issue.getIssue({
			issueKey: task.key
		}, function(error, response) {
			if (error) {
				console.error(error);
			} else {
				// Find this task's story
				const storyIndex = stories.findIndex((story) => story.fields.subtasks.find((task) => task.key === response.key));
				const taskIndex = stories[storyIndex].fields.subtasks.findIndex((task) => task.key === response.key);
				setTaskAssignee(storyIndex, taskIndex, response.fields.assignee, callback);
			}
		}); 
	}

	setStories(response, callback) {
		this.stories = response.issues.filter((issue) => this.MAIN_ISSUE_TYPES.indexOf(issue.fields.issuetype.name) >= 0 && !issue.fields.resolution);
		// stories = response.issues;
		// Now we need to fetch details for the assignee
		this.stories.forEach((story) => story.fields.subtasks.forEach((task) => this.addTaskAssignees(task, callback)));
		callback(this.stories);
	}

	getSprint (callback) {
		const setStories = this.setStories.bind(this);
		this.getJiraClient().sprint.getSprintIssues({
			sprintId: this.sprintId,
			maxResults: 500
		}, function(error, response) {
			if (error) {
				console.error(error);
			} else {
				console.log("testing");
				setStories(response, callback);
			}
		});

		const person1 = {avatarUrls: {"48x48": "http://www.clker.com/cliparts/5/D/d/r/S/L/bearded-man-cartoon-hi.png"}};
		const person2 = {avatarUrls: {"48x48": "https://jira.mongodb.org/secure/projectavatar?pid=10006&avatarId=10010"}};
		return [{key: "MPO-100", 
				fields: {
				   summary: "Implement important feature",
	     		   assignee: 1,
	    		   subtasks: [{id: "MPO-101", fields: {summary: "Service Mapping", status: {name: "TODO"}, assignee: person2}}, 
	    			       {id: "MPO-102", fields: {summary: "Scenario Titles", status: {name: "DONE"}, assignee: person2}}, 
	    			       {id: "MPO-102", fields: {summary: "Scenario Implementation", status: {name: "TODO"}, assignee: person1}}]},
				   },
				  {key: "MPO-200", 
				  fields: {
				   summary: "Fix bug", 
	    		   assignee: 2,
				   subtasks: [{id: "MPO-201", fields: {summary: "Validation", status: {name: "IN PROGRESS"}, assignee: person1}}, 
				       	   {id: "MPO-202", fields: {summary: "Create New Endpoint", status: {name: "TODO"}, assignee: person2}}]}
		       	   }];

	}
}