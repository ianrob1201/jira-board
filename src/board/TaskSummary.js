import React, { Component } from 'react';
import firebase from '../db/firebase';

export default class TaskSummary extends Component {
	constructor(props) {
		super(props);
		this.toggleSelected = this.toggleSelected.bind(this);
		this.getClasses = this.getClasses.bind(this);
		this.state = {
			selected: false,
			id: props.task.id || props.task.key
		}
	}

	componentDidMount() {
	  const itemsRef = firebase.database().ref('items');
	  // itemsRef.child(this.state.id).set({selected: false});
	  itemsRef.child(this.state.id).on('value', (snapshot) => {
	  	this.setState({
	  		selected: snapshot.val().selected
	  	})
	  })
	}

	toggleSelected() {
	  const itemRef = firebase.database().ref('items').child(this.state.id);
	  console.log(itemRef);
	  itemRef.update({selected: !this.state.selected});
	}

	getClasses() {
		const selected = this.state.selected ? 'selected' : '';
		return `task ${selected}`
	}

	render() {
		return (
			<div onClick={this.toggleSelected} className={this.getClasses()}>
				<div className="summary">
					<b>{this.props.task.key}</b>
					<div>{this.props.task.fields.summary}</div>
				</div>
				{this.props.task.fields.assignee && this.props.task.fields.assignee.avatarUrls && <img src={this.props.task.fields.assignee.avatarUrls["48x48"]} className="avatar"/>}
			</div>
		);
	}
}