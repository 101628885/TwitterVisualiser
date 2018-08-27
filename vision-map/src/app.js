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
import window from 'global/window';
import { connect } from 'react-redux';
import * as fs from 'fs';
import axios from 'axios';

import Banner from './components/banner';
import Announcement from './components/announcement';
// Kepler.gl Data processing APIs
import { loadSampleConfigurations } from './actions';
import { replaceLoadDataModal } from './factories/load-data-modal';

const KeplerGl = require('kepler.gl/components').injectComponents([
  replaceLoadDataModal()
]);



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
  state = {
    showBanner: false,
    width: window.innerWidth,
    height: window.innerHeight
  };

  componentWillMount() {
    // if we pass an id as part of the url
    // we ry to fetch along map configurations
    //data_fetcher.checkLocalData();
    const { params: { id: sampleMapId } = {} } = this.props;
    this.props.dispatch(loadSampleConfigurations(sampleMapId));
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentDidMount() {

    // if no json files make a get request to node server which will then get the data.
    // if(jsonTypes.length == 0)
    // {
    //   axios.get("http://localhost:3000/checkData")
    //   .then( (response) => {
    //     console.log("response", response);
    //     window.location.reload();
    //   })
    //   .catch( (error) => {
    //     console.log(error);
    //   });  
    // }
    // else
    // {
    //   //jsonTypes is an array of all the files in data/'todays-date-file'
    //   //we loop through each one process the file, then add the data to the map
    //   jsonTypes.forEach((type) => {
    //     let label = type.features[0].properties.primary_type
    //     let data = Processors.processGeojson(type);
    //     const dataset = {
    //     data,
    //     info: {
    //       label: `${label}`,
    //       id: `${label}`
    //     }
    //   };
    //   console.log(dataset);
    //   // this.props.dispatch(addDataToMap({datasets : dataset}));
    // })
    // console.log("start");
    // axios.get('http://localhost:3000/tweetMap')
    //   .then((res) => {
    //     res.data.forEach(item => { 
    //       let dataset = Processors.processGeojson(item);
    //       console.log(dataset);          
    //       this.props.dispatch(addDataToMap({datasets : dataset }));
    //     });
    //   });
    axios.get('http://localhost:3000/tweetMap')
      .then((res) => {
          res.data.forEach(item => {            
            let label = item.features[0].properties.primary_type
            const data  = Processors.processGeojson(item);
            const dataset = { 
              data,
              info: 
              {
                label: label
              }
            };
            // console.log("DUCK ME", dataset);
            this.props.dispatch(addDataToMap({ datasets: dataset }));
          });
      });
  }

  _onResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  _showBanner = () => {
    this.setState({ showBanner: true });
  };

  _hideBanner = () => {
    this.setState({ showBanner: false });
  };

  _disableBanner = () => {
    this._hideBanner();
    window.localStorage.setItem('kgHideBanner', 'true');
  };

  render() {
    const { showBanner, width, height } = this.state;
    return (
      <GlobalStyleDiv>
        <Banner
          show={this.state.showBanner}
          height={bannerHeight}
          onClose={this._hideBanner}
        >
          <Announcement onDisable={this._disableBanner} />
        </Banner>
        <div
          style={{
            transition: 'margin 1s, height 1s',
            position: 'absolute',
            width: '100%',
            height: showBanner ? `calc(100% - ${bannerHeight}px)` : '100%',
            minHeight: `calc(100% - ${bannerHeight}px)`,
            marginTop: showBanner ? `${bannerHeight}px` : 0
          }}
        >
          <KeplerGl
            mapboxApiAccessToken="pk.eyJ1IjoidmlzaW9uc3dpbiIsImEiOiJjamtyeHV6c3kzejQ5M3FvM25mYmo2bTM1In0.kaVi7yYgddR5uEjkGHfuSQ"
            id="map"
            /*
             * Specify path to keplerGl state, because it is not mount at the root
             */
            getState={state => state.demo.keplerGl}
            width={width}
            height={height - (showBanner ? bannerHeight : 0)}
          />

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
