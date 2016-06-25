import React from 'react';
import LocationInput from './LocationInput';
import GetWeatherBtn from './GetWeatherBtn';
import $ from 'jquery';

const EnterLocation = React.createClass({
    getInitialState: function () {
        return {
            latitude: '',
            longitude: '',
            address: ''
        }
    },
    success: function(pos) {
        this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
        var lat = pos.coords.latitude;
        var long = pos.coords.longitude;
        var GeoCodingKey = "AIzaSyDGH74KN8-W4RU-R1EBEPcjWX7fa1z4gYg";
        var GeoCodingURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=" + GeoCodingKey;
        $.ajax({
            url: GeoCodingURL,
            dataType: 'json',
            cache: false,
            success: function(Address) {
                this.setState({
                    address: Address
                });
                this.props.Address(Address);
                console.log(Address);
            }.bind(this),
            error: function(xhr, status, err)   {
                console.log(GeoCodingURL, err.toString());
            }.bind(this),
        });
        this.props.sendLocationToWS(pos.coords.latitude, pos.coords.longitude);
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
