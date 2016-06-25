import React from 'react';
import $ from 'jquery';

var CurrentWeather = React.createClass({
    render: function()  {
        var weather = this.props.WeatherData;
        return (
            <div className="CurrentWeather">
                <CityName CityName={weather.name}/>
            </div>
        )
    }
});

const CityName  = React.createClass({
    render: function()  {
        return (
            <div className="CityName">
                {this.props.City}
            </div>
        );
    }
});
export default CurrentWeather;
