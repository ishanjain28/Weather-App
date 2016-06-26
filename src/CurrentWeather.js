import React from 'react';

const CurrentWeather = React.createClass({
    render: function()  {
        return (
            <div className="CurrentWeather">
                <LocationInfo
                    address={this.props.address}
                    UpdateTime={this.props.UpdateTime}
                    WeatherData={this.props.WeatherData}
                />
                <TemperatureInfo
                    TempUnit={this.props.TempUnit}
                    WeatherData={this.props.WeatherData}
                />
                <CurrentWeatherInfo
                    WeatherData={this.props.WeatherData}
                />
            </div>
        );
    }
});

const LocationInfo = React.createClass({
    getDefaultProps: function() {
        return {
            address: ''
        }
    },
    render: function()  {
        var address = this.props.address;
        var Country = "-----";
        var City = "------";
        var State = "----------";
        if(address)    {
            Country = address[address.length - 1];
            State = address[address.length - 2];
            City = address[address.length - 3];
        }
        return (
            <div className="LocationInfo">
                <div className="CityStateCountry">
                    {City}, {State}, {Country}
                </div>
                <div className="UpdateTime">
                    Updated as of {this.props.UpdateTime}
                </div>
            </div>
        );
    }
});
const TemperatureInfo = React.createClass({
    getInitialState: function() {
        return {
            TempUnit: 'C'
        }
    },
    render: function()  {
        var temp = "--";
        var apparentTemp = "--";
        var TemUnit = "-";
        function ConvertTemp(tem)  {
            if(TempUnit == "C")  {
                TemUnit = "C";
                return Math.round(((tem-32)*5)/9);
            } else {
                TemUnit = "F";
                return tem;
            }
        }
        if(this.props.WeatherData)  {
            var CurrentWeather = this.props.WeatherData.currently;
            var TempUnit = this.props.TempUnit;
            temp = ConvertTemp(CurrentWeather.temperature);
            apparentTemp = ConvertTemp(CurrentWeather.apparentTemperature);
        }
        return (
            <div className="TemperatureInfo">
            </div>
        );
    }
});

const CurrentWeatherInfo = React.createClass({
    render: function()  {
        return (
            <div className="CurrentWeatherInfo">

            </div>
        );
    }
});
export default CurrentWeather;
