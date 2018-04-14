import React, { Component } from 'react';
import StorySummary from './StorySummary.js';
import TaskSummary from './TaskSummary';

export default class TableRow extends Component {
	constructor(props) {
		super(props);
	}

	getAllInState = (states) => {
		const taskList = this.props.story.fields.subtasks.filter(task => states.indexOf(task.fields.status.name.toUpperCase()) >= 0);
		return (
			<td>
				{taskList.map((task, i) => <TaskSummary task={task} key={i}/>)}
			</td>
		);
	};

	render() {
		return (
			<tr>
				<td>
					<TaskSummary task={this.props.story} />
				</td>
				{this.getAllInState(["TODO"])}
				{this.getAllInState(["IN PROGRESS"])}
				{this.getAllInState(["IN REVIEW"])}
				{this.getAllInState(["DONE"])}
				{this.getAllInState(["CLOSE", "CLOSED"])}
			</tr>
		);
	}
}