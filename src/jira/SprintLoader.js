//const JiraClient = require('jira-connector');
import JiraClient from './jira-connector/index';

let stories = [];

function getJiraClient() {
	return new JiraClient( {
		host: 'jupiter.bjss.com'
	})
}

function addTaskAssignees(task, callback) {
	getJiraClient().issue.getIssue({
		issueKey: task.key
	}, function(error, response) {
		if (error) {
			console.error(error);
		} else {
			// Find this task's story
			const storyIndex = stories.findIndex((story) => story.fields.subtasks.find((task) => task.key === response.key));
			const taskIndex = stories[storyIndex].fields.subtasks.findIndex((task) => task.key === response.key);
			stories[storyIndex].fields.subtasks[taskIndex].fields.assignee = response.fields.assignee;
			callback(stories)
		}
	}); 
}

export function getSprint (callback) {
	getJiraClient().board.getIssuesForBoard({
		boardId: "17"
	}, function(error, response) {
		if (error) {
			console.error(error);
		} else {
			// const stories = response.issues.filter((issue) => issue.fields.issuetype.name === "Story");
			stories = response.issues;
			// Now we need to fetch details for the assignee
			stories.forEach((story) => story.fields.subtasks.forEach((task) => addTaskAssignees(task, callback)));
			callback(stories);
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