import React from 'react';

const DailyWeather = React.createClass({
    render: function()  {
        return (
            <div className="DailyWeather">
                <DailyWeatherHeader
                    WeatherData={this.props.WeatherData}
                />
                <DailyWeatherList
                    WeatherData={this.props.WeatherData}
                    TempUnit={this.props.TempUnit}
                />
            </div>
        )
    }
});

const DailyWeatherHeader = React.createClass({
    render: function()  {
        var Summary = " Summary ";
        if(this.props.WeatherData)  {
            Summary = this.props.WeatherData.daily.summary;
        }
        return (
            <div className="DailyWeatherHeader">
                <div className="DWHeader">
                    Daily
                </div>
                <div className="DWSummary">
                    {" " + Summary + " "}
                </div>
            </div>
        )
    }
});

const DailyWeatherList = React.createClass({
    render: function()  {
        var WeatherData = {};
        var DAYDATE = [];
        var LIST = [];
        if(this.props.WeatherData)  {
            WeatherData = this.props.WeatherData.daily.data;
            var TempUnit = this.props.TempUnit;
            var ConvertTemp = (tem) => TempUnit == "C" ? (Math.round(((tem-32)*5)/9)) : tem;
            var dayInt = {
                "0": 'Sun',
                "1": 'Mon',
                "2": 'Tue',
                "3": 'Wed',
                "4": 'Thu',
                "5": 'Fri',
                "6": 'Sat'
            };
            WeatherData.forEach(function(val)   {
                DAYDATE.push(dayInt[new Date(val.time * 1000).getDay()] + " " + new Date(val.time * 1000).getDate());
            });
            for(var i = 0; i < WeatherData.length; i++) {
                LIST.push(<li className="DWListElement" key={WeatherData[i].time}>{DAYDATE[i] + ", "} <img className="DWListElementIcon" src="icons/cloudy.svg" width="40" height="40" /> {" " + ConvertTemp(WeatherData[i].temperatureMax) +" "+ ConvertTemp(WeatherData[i].temperatureMin) +" "+ WeatherData[i].summary}</li>);
            }
        }
        return (
            <ul className="DailyWeatherList">
                {LIST}
            </ul>
        )

    }
});
export default DailyWeather;
