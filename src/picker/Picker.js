import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { browserHistory } from 'react-router';
import './picker.css';

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
		this._handleKeyPress = this._handleKeyPress.bind(this);
	}

	handleUrlChange(event) {
		this.setState({url: event.target.value});
	}

	handleSprintChange(event) {
		this.setState({sprintId: event.target.value});
	}

	showBoard() {
		// replaceState({ nextPathname: nextState.location.pathname }, '/login')
		this.props.history.push('/board?url=' + this.state.url + '&sprintId=' + this.state.sprintId);
	}

	_handleKeyPress(event) {
		if (event.key === 'Enter') {
     		this.showBoard();
    	}
	}

	render() {
		return (
			<div className="picker">
				<h1>JIRA Details</h1>
				<div className="input">
					<p>URL:</p>
					<input type="text" 
						value={this.state.url} 
						onChange={this.handleUrlChange} 
						onKeyPress={this._handleKeyPress}
						id="jira-url"/>
				</div>

				<div className="input">
					<p>Sprint ID:</p>
					<input 
						type="text" 
						value={this.state.sprintId} 
						onChange={this.handleSprintChange}
						onKeyPress={this._handleKeyPress}
						id="jira-sprint"/>
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