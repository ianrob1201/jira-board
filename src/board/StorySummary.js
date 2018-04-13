import React, { Component } from 'react';

export default class StorySummary extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<b>{this.props.story.key}</b>
				<div>{this.props.story.fields.summary}</div>
			</div>
		);
	}
}