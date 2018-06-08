import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Picker extends Component {
	constructor (props) {
		super(props);
		this.state = {
			url: '',
			sprintId: ''
		}

		this.handleUrlChange = this.handleUrlChange.bind(this);
		this.handleSprintChange = this.handleSprintChange.bind(this);
		this.showBoard = this.showBoard.bind(this);
	}

	handleUrlChange(event) {
		this.setState({url: event.target.value});
	}

	handleSprintChange(event) {
		this.setState({sprintId: event.target.value});
	}

	showBoard(event) {

	}

	render() {
		return (
			<div>
				<h1>JIRA Details</h1>
				<div className="input">
					<p>URL:</p>
					<input type="text" value={this.state.url} onChange={this.handleUrlChange} id="jira-url"/>
				</div>

				<div className="input">
					<p>Sprint ID:</p>
					<input type="text" value={this.state.sprintId} onChange={this.handleSprintChange} id="jira-sprint"/>
				</div>

				<NavLink 
				  to={{ 
				    pathname: '/board', 
				    search: '?url=' + this.state.url + '&sprintId=' + this.state.sprintId
				  }}>Show Board</NavLink>
			</div>
		);
	}
}