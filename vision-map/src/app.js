// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { css } from 'react-emotion';
import window from 'global/window';
import { connect } from 'react-redux';
import * as fs from 'fs';
import axios from 'axios';
import DatePicker from 'react-datepicker';
// Kepler.gl Data processing APIs
import { loadSampleConfigurations } from './actions';
import { replaceLoadDataModal } from './factories/load-data-modal';
const KeplerGl = require('kepler.gl/components').injectComponents();

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
var jsonTypes = requireAll(require.context("./data", false, /.json$/));

const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

// Sample data
/* eslint-disable no-unused-vars */
import { updateVisData, addDataToMap } from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';
/* eslint-enable no-unused-vars */

const bannerHeight = 30;

const GlobalStyleDiv = styled.div`
  font-family: ff-clan-web-pro, 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.71429;

  *,
  *:before,
  *:after {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
  }
`;
class App extends Component {
  
  constructor(props) {
	super(props);
	this.state = {
	  showGrid: false,
	  width: window.innerWidth ,
	  showTools: true,
	  height: window.innerHeight * 0.75,
	  loading: true,
	  type: 'All',
	  year: 2018,
	  month: 1,
	  day: 2,
	  startDate: moment()
	};

	// This binding is necessary to make `this` work in the callback
	this._getDataForMap = this._getDataForMap.bind(this);
	this._toggleTools = this._toggleTools.bind(this);
	this.formHandler = this.formHandler.bind(this);

  }

  componentWillMount() {
	window.addEventListener('resize', this._onResize);
	this._onResize();
  }

	componentDidMount() 
	{
		axios.get('http://localhost:3000/tweetMap')
		.then((res) => 
		{
			res.data.forEach(item => 
			{            
				let label = "Chicago Crime Data"
				const data  = Processors.processGeojson(item);
				const dataset = 
				{ 
					data,
					info: 
					{
						label: label
					}
				};
				this.props.dispatch(addDataToMap({ datasets: dataset }));
			});
		});
	}

	_onResize = () => {
		this.setState({
			width: window.innerWidth - 16,
			height: window.innerHeight * 0.75
		});
	};
  
	_toggleTools = () =>
	{
		this.state.showTools = this.state.showTools ? false : true;
	 	console.log(this.state.showTools)
	}
	_getDataForMap = () => {
		axios.get('http://localhost:3000/tweetMap')
		.then((res) => {
			res.data.forEach(item => {            
				let label = item.features[0].properties.primary_type
				const data  = Processors.processGeojson(item);
				const dataset = 
				{ 
					data,
					info: {label: label}
				};
				this.props.dispatch(addDataToMap({ datasets: dataset }));
			});
		});
	}

	formHandler (evt) {
		console.log(evt);
	    this.setState({ [evt.target.name]: evt.target.value });
  	}

	render() {
		const { showBanner, width, height } = this.state;
		return (
			<GlobalStyleDiv>
				<div
					style={{
					transition: 'margin 1s, height 1s',
					position: 'absolute',
					width: '95%',
					height: '100%',
					paddingLeft: '16px',
					paddingTop: '16px',
					paddingRight: '16px',
					minHeight: `calc(100% - ${bannerHeight}px)`,
					visibility: this.state.showTools ? 'visible' : 'hidden'
					}}>
					<KeplerGl
						mapboxApiAccessToken="pk.eyJ1IjoidmlzaW9uc3dpbiIsImEiOiJjamtyeHV6c3kzejQ5M3FvM25mYmo2bTM1In0.kaVi7yYgddR5uEjkGHfuSQ"
						id="map"
						getState={state => state.demo.keplerGl}
						width={width - 16}
						height={height}
					/>
				</div>
				<div
					style={{
					position: 'absolute',
					marginTop: window.innerHeight * 0.8
					}}>
					<form>
						<select 
					        value={this.state.type} 
					        onChange={this.formHandler}>
					       	<option value="All">All</option>
					        <option value="Battery">Battery</option>
					        <option value="Battery">Battery</option>
					    </select>
					    <select 
					        value={this.state.year} 
					        onChange={this.formHandler}>
					       	<option value="2018">2018</option>
					        <option value="2017">2017</option>
					        <option value="2016">2016</option>
					        <option value="2015">2015</option>
					        <option value="2014">2014</option>
					        <option value="2013">2013</option>
					        <option value="2012">2012</option>
					    </select>
					    <DatePicker
						    selected={this.state.startDate}
						    onChange={this.handleChange}
						/>
					</form>
					<button onClick={this._getDataForMap}>Set Data</button>
				</div>
			</GlobalStyleDiv>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  dispatchToProps
)(App);
