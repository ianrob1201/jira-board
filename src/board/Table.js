import React, { Component } from 'react';
import './Table.css';
import TableRow from './TableRow';

export default class Table extends Component {

    constructor(props) {
    	super(props);
    }

    componentWillMount() {
    	this.setState({
    		stories: this.props.issues
    	})
    }

    componentWillReceiveProps(nextProps, prevState) {
    	this.setState({
    		stories: nextProps.issues
    	})
    }

	render() {
		return (
			<table className="board">
				<tbody>
					<tr>
						<th>Story</th>
						<th>Todo</th>
						<th>In Progress</th>
						<th>In Review</th>
						<th>Done</th>
					</tr>
					{this.state.stories.map((story, i) => <TableRow story={story} key={i}/>)}
				</tbody>
			</table>
		);
	}
}