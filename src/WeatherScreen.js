import React from 'react';
import EnterLocation from './EnterLocation';


const WeatherScreen = React.createClass({
    render: function()  {
        return (
            <div className="WeatherScreen">
                <Navbar />
            </div>
        );
    }
});

const Navbar = React.createClass({
    getInitialState: function() {
        return {
            latitude: '',
            longitude: ''
        }
    },
    getLocationFromEnterLocation: function(lat, long)    {
        this.setState({
            latitude: lat,
            longitude: long
        });
    },
    render: function () {
       return (
         <div className="WSNavbar">
             <div className="Brand">
                 <i className="fa fa-warning fa-2x"></i> Weather
             </div>
             <EnterLocation
                 getLocationFromEnterLocation={this.getLocationFromEnterLocation}
                 LocationInputText="WSLocationInputText"
                 EnterLocation="WSEnterLocation"
                 id="WSEnterLocation"
                 LocationInputTextWrapper="WSLocationInputTextWrapper"
                 />
             <CurrentLocation latitude={this.state.latitude} longitude={this.state.longitude} />
         </div>
       );
   }
});

const CurrentLocation = React.createClass({
    render: function()  {
        var displayValue = 'none';
        if(this.props.latitude && this.props.longitude) {
            displayValue = "inline-block";
            console.log(window.innerWidth);
        } else {
            displayValue = "none";
        }
        return (
            <div
                className="CurrentLocation"
                style={{display: displayValue}}>
                Latitude: {this.props.latitude}, Longitude: {this.props.longitude}
            </div>
        );
    }
});

const WSWrapper = React.createClass({
    render: function()  {
        return (
            <div>
                Fuck off
            </div>
        )
    }
});
export default WeatherScreen;
