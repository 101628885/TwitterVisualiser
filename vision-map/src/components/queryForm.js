import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

class QueryForm extends Component {

    createPayload = (event) =>
	{
		event.preventDefault();
		const query = {
			type: this.type.value,
			year: this.year.value,
			date: this.date.value,
		}
		console.log(query)
		this.props.getDataForMap(query);
	}

    render() {
    	return (
    	<div
			style={{
			position: 'absolute',
			textAlign: 'center',
			left: '50%',
			marginTop: window.innerHeight * 0.8
			}}>
			<div
				style={{
				position: 'relative',
				display: 'inline-block',
				left: '-50%'
				}}>
				<form onSubmit={this.createPayload.bind(this)}>
					<select ref={(input) => this.type = input}>
				        >
				       	<option value="All">All</option>
				        <option value="Battery">Battery</option>
				        <option value="Battery">Battery</option>
				    </select>
				    <select ref={(input) => this.year = input}>
				       	<option value="2018">2018</option>
				        <option value="2017">2017</option>
				        <option value="2016">2016</option>
				        <option value="2015">2015</option>
				        <option value="2014">2014</option>
				        <option value="2013">2013</option>
				        <option value="2012">2012</option>
				    </select>
				    <DatePicker ref={(input) => this.date = input} />
				    <button type="submit">Submit</button>
				</form>
			</div>
		</div>
		);
    }
}

export default QueryForm;