import React from 'react';

const CurrentWeather = React.createClass({
    render: function()  {
        return (
            <div className="CurrentWeather">
                <LocationInfo
                    address={this.props.address}
                    WeatherData={this.props.WeatherData}
                />
                <TemperatureInfo
                    UpdateTime={this.props.UpdateTime}
                    TempUnit={this.props.TempUnit}
                    WeatherData={this.props.WeatherData}
                />
                <CurrentWeatherInfo
                    WeatherData={this.props.WeatherData}
                    TempUnit={this.props.TempUnit}
                />
            </div>
        );
    }
});

const LocationInfo = React.createClass({
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
                {City}, {State}, {Country}
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
        var TempUnit = "-";
        var ConvertTemp = (tem) => TempUnit == "C" ? (Math.round(((tem-32)*5)/9)) : tem;
        if(this.props.WeatherData)  {
            var CurrentWeather = this.props.WeatherData.currently;
            var TempUnit = this.props.TempUnit;
            temp = ConvertTemp(CurrentWeather.temperature);
            apparentTemp = ConvertTemp(CurrentWeather.apparentTemperature);
        }
        return (
            <div className="TemperatureInfo">
                <div className="TemperatureWrapper">
                    <div className="Wicon">
                        <img width="96" height="96" src="icons/cloudy.svg"></img>
                    </div>
                    <div className="Temperature">
                        {temp}
                    </div>
                    <div className="CurrentTemperatureUnit">
                        {TempUnit}
                    </div>
                </div>
                <div className="UpdateTime">
                    Updated as of {this.props.UpdateTime}
                </div>
            </div>
        );
    }
});

const CurrentWeatherInfo = React.createClass({
    render: function()  {
        var ConvertTemp = (tem) => TempUnit == "C" ? (Math.round(((tem-32)*5)/9)) : tem;
        var CurrentWeatherSummary = "<Current Weather Summary>";
        var ApparentTemperature = "Feels like ";
        var Wind = "Wind ";
        var Visibility = "Visibility ";
        var Barometer = "Barometer ";
        var Humidity = "Humidity ";
        var DewPoint = "Dew Point ";
        if(this.props.WeatherData)  {
            var TempUnit = this.props.TempUnit;
            var CurrentWeather = this.props.WeatherData.currently;
            CurrentWeatherSummary = CurrentWeather.summary;
            ApparentTemperature = "Feels like " + ConvertTemp(parseInt(CurrentWeather.apparentTemperature)) + " " + TempUnit;
            Wind += CurrentWeather.windSpeed;
            Visibility += CurrentWeather.visibility + "kms";
            Barometer += CurrentWeather.pressure;
            Humidity = "Humidty " + (CurrentWeather.humidity * 100) + "%";
            DewPoint += CurrentWeather.dewPoint;
        }
        return (
            <div className="CurrentWeatherInfo">
                <div className="CurrentWeatherSummary">
                    {CurrentWeatherSummary}
                </div>
                <div className="CurrentWeatherExtraDetails">
                    <div className="CurrentWeatherEDRow">
                        <div className="ApparentTemperature CWRowElement">
                            {ApparentTemperature}
                        </div>
                        <div className="Wind CWRowElement">
                            {Wind}
                        </div>
                        <div className="Visibility CWRowElement">
                            {Visibility}
                        </div>
                    </div>
                    <div className="CurrentWeatherEDRow">
                        <div className="Barometer CWRowElement">
                            {Barometer}
                        </div>
                        <div className="Humidity CWRowElement">
                            {Humidity}
                        </div>
                        <div className="DewPoint CWRowElement">
                            {DewPoint}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
export default CurrentWeather;
