// Importing all the required Components
import React from 'react';
import EnterLocation from './EnterLocation';
import CurrentWeather from './CurrentWeather';


if ( typeof DEBUG === "undefined" ) DEBUG = true; 
// Root Component.
const WeatherScreen = React.createClass({
    getInitialState: function() {
        return {
            WeatherData: '',
            address: ''
        };
    },
    getWeatherData: function(data)  {
        this.setState({
            WeatherData: data
        });
    },
    getAddress: function(data)  {
        this.setState({
            address: data
        });
    },
    render: function()  {
        return (
            <div className="WeatherScreen">
                <Navbar
                    getWeatherData={this.getWeatherData}
                    getAddress={this.getAddress}
                    Address={this.state.address}
                />
                <WSWrapper WeatherData={this.state.WeatherData} />
            </div>
        );
    }
});
const Navbar = React.createClass({
    getInitialState: function() {
        return {
            latitude: '',
            longitude: '',
            WeatherData: ''
        }
    },
    sendLocationToWS: function(lat, long)    {
        this.setState({
            latitude: lat,
            longitude: long
        });
    },
    render: function () {
       return (
         <div className="WSNavbar">
             <div className="Brand">
                 <i className="fa fa-space-shuttle fa-2x fa-rotate-270"></i> Weather
             </div>
             <EnterLocation
                 sendLocationToWS={this.sendLocationToWS}
                 LocationInputText="WSLocationInputText"
                 EnterLocation="WSEnterLocation"
                 id="WSEnterLocation"
                 LocationInputTextWrapper="WSLocationInputTextWrapper"
                 WeatherData={this.props.getWeatherData}
                 Address={this.props.getAddress}
                 />
             <CurrentLocation
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                Address={this.props.Address}
             />
         </div>
       );
   }
});

const CurrentLocation = React.createClass({
    render: function()  {
        //TODO: Figure out a way to print Address from lat, long..
        var address = null;
        var displayValue = 'none';
        if(this.props.latitude && this.props.longitude) {
            displayValue = "inline-block";
        } else {
            displayValue = "none";
        }
        return (
            <div
                className="CurrentLocation"
                style={{display: displayValue}}>
                Latitude: {this.props.latitude}, Longitude: {this.props.longitude}, Address: {address}
            </div>
        );
    }
});

const WSWrapper = React.createClass({
    render: function()  {
        return (
            <div className="WSWrapper">
                <CurrentWeather WeatherData={this.props.WeatherData} />
            </div>
        )
    }
});
export default WeatherScreen;
