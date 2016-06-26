// Necessary Import Statements...
import React from 'react';
import TemperatureUnit from './TemperatureUnit';
import LocationInput from './LocationInput';


const Navbar = React.createClass({
    render: function()  {
        return (
            <div className="Navbar">
                <Header />
                <TemperatureUnit getTemperatureUnit={this.props.getTemperatureUnit}/>
                <LocationInput
                    getAddress={this.props.getAddress}
                    getLatLngAcc={this.props.getLatLngAcc}
                    getInputText={this.props.getInputText}
                    getWeatherFromLatLng={this.props.getWeatherFromLatLng}
                />
            </div>
        );
    }
});

const Header = React.createClass({
    render: function()  {
        return (
            <div className="Header">
                WEATHER
            </div>
        );
    }
});


export default Navbar;
