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
        console.log("Coordinates Successfully retrieved " + 'Lat: ' + pos.coords.latitude + ' Long: ' + pos.coords.longitude + ' Accuracy: ' + pos.coords.accuracy + 'meteres');
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
            <div className="EnterLocation" id="EnterLocation">
                <LocationInput getLocation={this.getLocation}/>
                <GetWeatherBtn lat={this.state.latitude} long={this.state.longitude} />
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
            var key = "5f6b52407f05c81ab142559b38446da1";
            var lat = this.props.lat;
            var long = this.props.long;
            var url = "https://api.forecast.io/forecast/" + key + "/" + lat + ',' + long;
            // var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + key;
            $.ajax({
                url: url,
                dataType: 'json',
                cache: true,
                headers: {
                    'Accept-Encoding': 'gzip'
                },
                success: function (data) {
                    this.setState({weatherData: data});
                    console.log(data);
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
