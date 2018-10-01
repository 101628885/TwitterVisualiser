import React, { Component } from 'react';
import DatePicker from 'react-datepicker'; 
import style from 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'

class QueryForm extends Component {

	constructor (props) {
		super(props)
		this.state = {
			startDate: "",
			endDate: ""
		};
		this.setEndDate = this.setEndDate.bind(this);
		this.setStartDate = this.setStartDate.bind(this);
	}
    createPayload = (event) =>
	{
		event.preventDefault();
		const query = {}
		if(this.type.value.toUpperCase() != "ALL")
			query.Primary_Type = this.type.value.toUpperCase();
		if(this.limit.value != "" && typeof parseInt(this.limit.value) == 'number')
			query.limit = this.limit.value;
		if(this.state.startDate != "")
		{
			let endDate = this.state.endDate != "" && this.state.endDate != null ? moment(this.state.endDate) : moment(this.state.startDate).add(1, 'days')
			query.Date = {
							$gte: this.state.startDate, 
							$lt: endDate
						};
		}
		if(this.state.startDate == "")
			query.Year = parseInt(this.year.value)
		console.log(query)
		this.props.getDataForMap(query);
	}

	setStartDate(date) {
		this.setState({
			startDate: date
		});
	}

	setEndDate(date) {
		this.setState({
			endDate: date
		});
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
				left: '-50%',
				color: '#FFF'
				}}>
				<form onSubmit={this.createPayload.bind(this)}>
					<select ref={(input) => this.type = input}>
				        >
				       	<option value="All">All</option>
				        <option value="Battery">Battery</option>
				        <option value="Theft">Theft</option>
				        <option value="Criminal Damage">Criminal Damage</option>
				        <option value="Burglary">Burglary</option>
				        <option value="Narcotics">Narcotics</option>
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
				   	<button type="submit">Get Crime Data</button>
        			<p>Start Date</p>
				    <DatePicker selected={this.state.startDate} onChange={this.setStartDate} placeHolder="Start"/>
				    <p>End Date</p>
				    <DatePicker selected={this.state.endDate} onChange={this.setEndDate} placeHolder="End"/>
				    <p>Limit</p>
        			<input ref={(input) => this.limit = input} type="text"/>
				</form>
			</div>
		</div>
		);
    }
}

export default QueryForm;