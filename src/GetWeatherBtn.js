import React from 'react';
import $ from 'jquery';

const GetWeatherBtn = React.createClass({
    getInitialState: function() {
        return {
            weatherData: "",
            address: ''
        };
    },
    getWeather: function()  {
        if(this.props.lat && this.props.long)   {
            var key = "5f6b52407f05c81ab142559b38446da1";
            // var openKey = "b616bc06fdb9ef3608e2125feccad90a";
            var lat = this.props.lat;
            var long = this.props.long;
            // var DefaultLatLon = "27.4922,76.1690";
            var url = "https://api.forecast.io/forecast/" + key + "/" + lat + ',' + long;
            // var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + openKey;
            $(document).ajaxStart(function()    {
                $('.spinnerBlock').show('fast');
            });
            $(document).ajaxStop(function() {
                $('.spinnerBlock').hide('fast');
            });
            $.ajax({
                url: url,
                dataType: 'jsonp',
                cache: false,
                success: function (weatherInfo) {
                    this.setState({weatherData: weatherInfo});
                    this.props.WeatherData(weatherInfo);
                    console.log(weatherInfo);
                    }.bind(this),
                error: function (xhr, status, err)  {
                    console.log(url, err.toString());
                }.bind(this)
            });
        }
    },
    render: function()  {
        return (
            <a
                href="#"
                onClick={this.getWeather}
                className="GetWeatherBtn"
                disabled={this.props.disabled}>
                CHECK WEATHER
            </a>
        );
    }
});
export default GetWeatherBtn;
