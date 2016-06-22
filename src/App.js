import React from 'react';
import $ from '../js/jquery-2.2.4.min.js';

const Navbar = React.createClass({
    render: function () {
        return (
            <div className="navBar" id="navBar">
                <p className="header">WEATHER</p>
            </div>
        );
    }
});

const EnterLocation = React.createClass({
    render: function()  {
        return (
            <div className="EnterLocation" id="EnterLocation">
                <LocationInput />
                <br />
                <GetWeatherBtn />
            </div>
        );
    }
});

const LocationInput = React.createClass({
    getInitialState: function() {
        return {
            LocationInputText: "Example: 110001,IN"
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
                    />
                <GetLocationBtn />
            </div>
        </div>
        );
    }
});
const GetLocationBtn = React.createClass({
    render: function()  {
        return (
            <div className="GetLocationBtn">
                <i className="location-icon fa fa-location-arrow fa-2x"></i>
            </div>
        );
    }
});

const GetWeatherBtn = React.createClass({
    render: function()  {
        return (
            <a
                href="#"
                className="GetWeatherBtn">
                CHECK WEATHER
            </a>
        );
    }
});

const RootBlock = React.createClass({
    render: function()  {
        return (
            <div>
                <Navbar />
                <EnterLocation />
            </div>
        )
    }
});

export default RootBlock;
