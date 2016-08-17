import React from 'react';
import $ from 'jquery';
import CSSTransitionGroup from 'react-addons-css-transition-group';

var ProgressBar = require('react-progressbar.js');
var Circle = ProgressBar.Circle;
const DailyWeather = React.createClass({
    render: function() {
        return (
            <div className="DailyWeather">
                <DailyWeatherHeader WeatherData={this.props.WeatherData}/>
                <DailyWeatherList WeatherData={this.props.WeatherData} TempUnit={this.props.TempUnit}/>
            </div>
        )
    }
});

const DailyWeatherHeader = React.createClass({
    render: function() {
        var Summary = " Summary ";
        if (this.props.WeatherData) {
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
    getInitialState: function() {
        return {
            DWEIVisibility: false,
            DWSIVisibility: true
        }
    },
    render: function() {
        var WeatherData = {};
        var DAYDATE = [];
        var LIST = [];
        if (this.props.WeatherData) {
            WeatherData = this.props.WeatherData.daily.data;
            var TempUnit = this.props.TempUnit;
            var DWHeaderWidth = $('.DailyWeatherHeader').width();
            var ConvertTemp = (tem) => TempUnit == "C"
                ? (Math.round(((tem - 32) * 5) / 9))
                : tem;
            var dayInt = {
                "0": 'Sun',
                "1": 'Mon',
                "2": 'Tue',
                "3": 'Wed',
                "4": 'Thu',
                "5": 'Fri',
                "6": 'Sat'
            };
            var sunriseTime = function(i) {
                var SunriseTime = new Date(WeatherData[i].sunriseTime * 1000);
                var sunriseHours = SunriseTime.getHours();
                var sunriseMinutes = SunriseTime.getMinutes();
                return sunriseHours + ":" + sunriseMinutes;
            };
            var sunsetTime = function(i) {
                var SunsetTime = new Date(WeatherData[i].sunsetTime * 1000);
                var sunsetHours = SunsetTime.getHours();
                var sunsetMinutes = SunsetTime.getMinutes();
                return sunsetHours + ":" + sunsetMinutes;
            };
            WeatherData.forEach(function(val) {
                DAYDATE.push(dayInt[new Date(val.time * 1000).getDay()] + " " + new Date(val.time * 1000).getDate());
            });
            var PropDialContainer = {
                width: '72px',
                height: '72px'
            };
            var Options = {
                color: '#FFEA82',
                trailColor: '#eee',
                trailWidth: 1,
                duration: 3500,
                easing: 'bounce',
                strokeWidth: 8,
                from: {
                    color: '#FFEA82',
                    a: 0
                },
                to: {
                    color: '#ED6A5A',
                    a: 1
                },
                step: function(state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                }
            };

            for (var i = 0; i < WeatherData.length; i++) {
                var TemperatureMax = ConvertTemp(WeatherData[i].temperatureMax);
                var TemperatureMin = ConvertTemp(WeatherData[i].temperatureMin);
                // var WindBearing = <i className="fa fa-location-arrow WindBearing"></i>;
                LIST.push(
                    <li className="DWListElement" key={WeatherData[i].time}>
                        <CSSTransitionGroup
                            transitionName="DWSIVisibilityAnimation">
                        <div className="SummarisedInfo">
                            <div className="DayDate">{DAYDATE[i] + ", "}</div>
                            <img className="DWListElementIcon" src="icons/cloudy.svg" width="40" height="40"/>
                            <div className="DWMaxTemp">{TemperatureMax}</div>
                            <div className="DWMinTemp">{TemperatureMin}</div>
                            <div className="DWSummary">{WeatherData[i].summary}</div>
                        </div>
                        <div className="ExpandedInfo">
                            <div className="DWTemperatureWrapper">
                                <img src="icons/cloudy.svg" width="80" height="80" className="DailyWeatherIcon"/>
                                <div className="DWTemperature">
                                    <div className="DWEIMaxTemp">{TemperatureMax}</div>
                                    <div className="DWEIMinTemp">{TemperatureMin}</div>
                                </div>
                            </div>
                            <div className="DWEISummary">{WeatherData[i].summary}</div>
                            <div className="DWDetailed">
                                <div className="DWSun">
                                    <div className="DWSunrise">
                                        Sunrise
                                        <img src="icons/Sun.svg" width="50" height="50" className="DWSunriseIcon"/> {sunriseTime(i)}
                                    </div>
                                    <div className="DWSunset">
                                        Sunset
                                        <img src="icons/Sun.svg" width="50" height="50" className="DWSunsetIcon"/> {sunsetTime(i)}
                                    </div>
                                </div>
                                <div className="DWPropDials">
                                    <div className="DWPropDial">
                                        Dew Point
                                        <Circle progress={WeatherData[i].dewPoint / 100} initialAnimate={true} text={Math.round(WeatherData[i].dewPoint) + '%'} containerStyle={PropDialContainer} containerClassName={'.DWDewPoint'} options={Options}/>
                                    </div>
                                    <div className="DWPropDial">
                                        Humidity
                                        <Circle progress={WeatherData[i].humidity} initialAnimate={true} text={Math.round(WeatherData[i].humidity * 100) + '%'} containerStyle={PropDialContainer} containerClassName={'.DWHumidity'} options={Options}/>
                                    </div>
                                    <div className="DWPropDial">
                                        Pressure
                                        <Circle progress={WeatherData[i].pressure / 1000} initialAnimate={true} text={Math.round(parseFloat(WeatherData[i].pressure).toFixed(2)) + 'mb'} containerStyle={PropDialContainer} containerClassName={'.DWBarometer'} options={Options}/>
                                    </div>
                                    <div className="DWPropDial">
                                        Wind
                                        <div className="DWWindDial">
                                            Speed {WeatherData[i].windSpeed}
                                            <div className="DWWindDirArrow">
                                                <i className="fa fa-angle-up"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            }
        }
        // Set DWList wrapper equal to DWHeader width and added a click event to toggle detailed information of daily Weather...
        // Clicking on getLocation button in navbar gets geolocation data and weather data. Sometimes clicking on it just 1 time gets the data
        // and displays it correctly but this expanding process doesn't works..
        //TODO Fix this... :|
        $(document).ready(function() {
            $('.DWListElement').on('click', function() {
                $(this).children('.ExpandedInfo').stop().slideToggle('slow');
                $(this).children('.SummarisedInfo').stop().slideToggle('slow');
            });
            $('.DailyWeatherListWrapper').css('width', DWHeaderWidth);

        });
        return (
            <div className="DailyWeatherListWrapper">
                <ul className="DailyWeatherList">
                    {LIST}
                </ul>
            </div>
        )

    }
});

export default DailyWeather;
