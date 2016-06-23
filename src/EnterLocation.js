import React from 'react';
import $ from '../js/jquery-2.2.4.min.js';
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
        var success = "Location Successfully retrieved";
        console.log("Coordinates Successfully retrieved " + 'Lat: ' + pos.coords.latitude + ' Long: ' + pos.coords.longitude + ' Accuracy: ' + pos.coords.accuracy + 'meteres');
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
            <div className="EnterLocation" id="EnterLocation">
                <LocationInput getLocation={this.getLocation}/>
                <GetWeatherBtn lat={this.state.latitude} long={this.state.longitude} />
            </div>
        );
    }
});
export default EnterLocation;
