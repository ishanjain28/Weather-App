import React from 'react';
import $ from 'jquery';


const LocationInput = React.createClass({
    getInitialState: function() {
        return {
            address: '',
            latitude: '',
            longitude: '',
            accuracy: '',
            InputText: ''
        };
    },
    handleChange: function(e)   {
        this.setState({
            InputText: e.target.value
        });
        this.props.getInputText(e.target.value);
    },
    success: function(pos)  {
        this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy
        });
        var lat = pos.coords.latitude;
        var long = pos.coords.longitude;
        var accuracy = pos.coords.accuracy;
        this.props.getLatLngAcc(lat, long, accuracy);
        const GKEY = "AIzaSyDGH74KN8-W4RU-R1EBEPcjWX7fa1z4gYg";
        const defaultLatitude = "27.4922", defaultLongitude = "79.1690";
        var GeoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=" + GKEY;
        $.ajax({
            url: GeoCodeURL,
            dataType: 'json',
            cache: true,
            success: function(address)  {
                var add = address.results[0].formatted_address.split(",");
                if(add.length > 4)  {
                var slicedUsefulAdd = add.slice(add.length-4, add.length);
            } else {
                var slicedUsefulAdd = add.slice(add.length - 3, add.length);
            }
                this.setState({
                    address: slicedUsefulAdd
                });
                console.log(this.state.address);
                this.props.getAddress(slicedUsefulAdd);
            }.bind(this),
            error: function(xhr, status, err)   {
                console.error(GeoCodeURL, err.toString());
            }
        });
        //TODO Now get Weather Data... This doesn't seems to work... :(... gonna use String.substr() or slice(-2) here.. :-|
        var Hours = parseInt(new Date().getHours());
        var Minutes = parseInt(new Date().getMinutes());
        var useHour = (Hours.length == 1 ? "0" + Hours : Hours).toString();
        var useMinute = (Minutes.length == 1 ? "0" + Minutes : Minutes).toString();
        var UpdateTime =  useHour + ":" + useMinute;
        this.props.getWeatherFromLatLng(lat, long, UpdateTime);

        console.log('Location Successfully Retrieved. Lat: ' + lat + ' Long: ' + long + ' Accuracy: ' + accuracy + 'meters');
    },
    fail: function(err)    {
        var error = 'Error(' + err.code + '): ' + err.message;
        console.log(error);
    },
    getGeolocation: function()  {
        var options = {
            enableHighAccuracy: true,
            timeout: 12000
        };
        if(navigator.geolocation)   {
            navigator.geolocation.getCurrentPosition(this.success, this.fail, options);
        } else {
            console.error('navigator.geolocation not available');
        }

    },
    render: function()  {
        return (
            <div className="LocationInput">
                <form>
                    <div className="LocationInputWrapper">
                        <i className="SearchIcon fa fa-search"></i>
                        <input className="AddressInput"
                            value={this.state.InputText}
                            type="text"
                            placeholder="Example: 110001,IN"
                            onChange={this.handleChange}
                        />
                        <a href="#" className="getGeolocationIconWrapper" onClick={this.getGeolocation}>
                            <i className="fa fa-location-arrow location-icon"></i>
                        </a>
                    </div>
                </form>
            </div>
        );
    }
});

export default LocationInput;
