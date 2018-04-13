import React, { Component } from 'react';

export default class TaskSummary extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="task">
				<div className="summary">
					<b>{this.props.task.key}</b>
					<div>{this.props.task.fields.summary}</div>
				</div>
				{this.props.task.fields.assignee && this.props.task.fields.assignee.avatarUrls && <img src={this.props.task.fields.assignee.avatarUrls["48x48"]} className="avatar"/>}
			</div>
		);
	}
}