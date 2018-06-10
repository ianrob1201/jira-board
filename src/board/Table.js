import React, { Component } from 'react';
import './Table.css';
import TableRow from './TableRow';
import SprintLoader from '../jira/SprintLoader';
import qs from 'query-string';
import firebase from '../db/firebase';
import { Link } from 'react-router-dom';

export default class Table extends Component {
	constructor(props) {
	  super(props);
	  const sprintId = qs.parse(props.location.search).sprintId;
	  const url = qs.parse(props.location.search).url;

	  const sprintLoader = new SprintLoader(url, sprintId);

	  const issues = sprintLoader.getSprint((issues) => {
	  	console.log(issues);
	    this.setState({stories: issues});
	    console.log(this.state);
	  });

	  this.state = {
	    stories: issues,
	    sprintId: qs.parse(props.location.search).sprintId
	  }

	  this.render = this.render.bind(this);
	  this.clearConnections = this.clearConnections.bind(this);
	}

    componentWillMount() {
    	this.setState({
    		stories: this.state.issues
    	})
    }

    clearConnections() {
	  firebase.database().child('items').update({selected: false});
    }

	render() {
		return (
			<div>
				<table className="board">
					<tbody>
						<tr>
							<th>Story</th>
							<th>Todo</th>
							<th>In Progress</th>
							<th>In Review</th>
							<th>Done</th>
						</tr>
						{this.state.stories && this.state.stories.map((story, i) => <TableRow story={story} key={i}/>)}
					</tbody>
				</table>
				<button onClick={this.clearConnections}>Clear All</button>
			</div>
		);
	}
}