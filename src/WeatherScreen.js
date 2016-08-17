// Necessary Import Statements...
import React from 'react';
import CurrentWeather from './CurrentWeather';
import DailyWeather from './DailyWeather';

const WeatherScreen = React.createClass({
    render: function()  {
        return (
            <div className="WeatherScreen">
                <CurrentWeather
                    address={this.props.address}
                    UpdateTime={this.props.UpdateTime}
                    WeatherData={this.props.WeatherData}
                    TempUnit={this.props.TempUnit}
                />
                <DailyWeather
                    WeatherData={this.props.WeatherData}
                    TempUnit={this.props.TempUnit}
                />
            </div>
        );
    }
});

export default WeatherScreen;
