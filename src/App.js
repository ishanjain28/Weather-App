import React from 'react';
import $ from '../js/jquery-2.2.4.min.js';


const RootBlock = React.createClass({
    render: function()  {
        return (
            <div>
                <Navbar />
                <FrontLandingWrapper />
            </div>
        )
    }
});
const Navbar = React.createClass({

    render: function () {
        return (
            <div className="navBar" id="navBar">
                <p className="header">WEATHER</p>
            </div>
        );
    }
});

const FrontLandingWrapper = React.createClass({
    render: function()  {
        return (
            <div className="FrontLandingWrapper">
                <EnterLocation />
                <SpinnerBlock />
            </div>
        )
    }
});

const EnterLocation = React.createClass({
    getInitialState: function () {
        return {
            latitude: '',
            longitude: ''
        }
    },
    success: function(pos) {
        this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
        localStorage.coords = pos.coords.toString();
    },
    fail: function (err)    {
        console.error('Error(' + err.code + '): ' + err.message)
        this.setState({
            latitude: null,
            longitude: null
        });
    },
    getLocation: function() {
        var options = {
            enableHighAccuracy: true,
            timeout: 12000
        };

        if(navigator.geolocation)   {
            navigator.geolocation.getCurrentPosition(this.success, this.fail, options);
        } else {
            console.error('navigator.geolocation not found');
        }
    },
    render: function()  {
        return (
            <div className="EnterLocationWrapper">
                <div className="EnterLocation" id="EnterLocation">
                    <LocationInput getLocation={this.getLocation}/>
                    <GetWeatherBtn lat={this.state.latitude} long={this.state.longitude} />
                </div>
                <InputStatus lat={this.state.latitude} long={this.state.longitude}/>
            </div>
        );
    }
});

const LocationInput = React.createClass({
    getInitialState: function() {
        return {
            LocationInputText: ""
        };
    },
    handleChange: function(e)    {
        this.setState({
            LocationInputText: e.target.value
        });
    },
    render: function()  {
        return (
            <div className="LocationInput">
            <label> Enter a Location: </label>
            <div className="LocationInputTextWrapper">
                <input
                    type="text"
                    value={this.state.LocationInputText}
                    onChange={this.handleChange}
                    className="LocationInputText"
                    placeholder="Example: 110001,IN"
                    />
                <GetLocationBtn getLocation={this.props.getLocation}/>
            </div>
        </div>
        );
    }
});

const GetLocationBtn = React.createClass({
    render: function()  {
        return (
            <div className="GetLocationBtn">
                <a href="#" onClick={this.props.getLocation}>
                    <i className="location-icon fa fa-location-arrow fa-2x"></i>
                </a>
            </div>
        );
    }
});

const GetWeatherBtn = React.createClass({
    getInitialState: function() {
        return {
            weatherData: ""
        };
    },
    getWeather: function()  {
        if(this.props.lat && this.props.long)   {
            var key = "";
            var url = "";
            $.ajax({
                url: url,
                dataType: 'json',
                cache: true,
                success: function (data) {
                    this.setState({weatherData: data});
                }.bind(this),
                error: function (xhr, status, err)  {
                    console.log(url, err.toString());
                }.bind(this)
            });
        }
    },
    render: function()  {
        return (
            <a
                href="#"
                onClick={this.getWeather}
                className="GetWeatherBtn">
                CHECK WEATHER
            </a>
        );
    }
});

const InputStatus = React.createClass({
    render: function()  {
        return (
            <div className="InputStatus">
                Latitude: {this.props.lat}
                Longitude: {this.props.long}
            </div>
        )
    }
});

const SpinnerBlock = React.createClass({
    render: function()  {
        return (
            <div className="spinnerBlock">
                <i className="fa fa-spinner fa-pulse fa-fw"></i> Loading data...
            </div>
        );
    }
});
export default RootBlock;
