import React from 'react';
import LocationInput from './LocationInput';
import GetWeatherBtn from './GetWeatherBtn';

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
        this.props.getLocationFromEnterLocation(pos.coords.latitude, pos.coords.longitude);
        var success = "Location Successfully retrieved ";
        console.log(success + 'Lat: ' + pos.coords.latitude + ' Long: ' + pos.coords.longitude + ' Accuracy: ' + pos.coords.accuracy + 'meteres');
    },
    fail: function (err)    {
        var error ='Error(' + err.code + '): ' + err.message;
        console.error(error);
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
            <div className={this.props.EnterLocation} id={this.props.id}>
                <LocationInput
                    LocationInputText={this.props.LocationInputText}
                    getLocation={this.getLocation}
                    LocationInputTextWrapper={this.props.LocationInputTextWrapper}
                    />
                <GetWeatherBtn
                    disabled={!(this.state.latitude && this.state.longitude)}
                    lat={this.state.latitude}
                    long={this.state.longitude}
                    WeatherData={this.props.WeatherData}
                    Address={this.props.Address} />
            </div>
        );
    }
});
export default EnterLocation;
