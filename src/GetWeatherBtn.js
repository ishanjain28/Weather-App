import React from 'react';
import $ from '../js/jquery-2.2.4.min.js';

const GetWeatherBtn = React.createClass({
    getInitialState: function() {
        return {
            weatherData: ""
        };
    },
    getWeather: function()  {
        if(this.props.lat && this.props.long)   {
            var key = "5f6b52407f05c81ab142559b38446da1";
            var openKey = "b616bc06fdb9ef3608e2125feccad90a";
            var lat = this.props.lat;
            var long = this.props.long;
            // var url = "https://api.forecast.io/forecast/" + key + "/" + lat + ',' + long;
            var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + openKey;
            $(document).ajaxStart(function()    {
                $('.spinnerBlock').show('fast');
            });
            $(document).ajaxStop(function() {
                $('.spinnerBlock').hide('fast', function()  {
                    $(".navBar").hide("fast");
                    $(".FrontLandingWrapper").hide('slow');
                    $(".WeatherScreen").show("fast");
                });
        });
            $.ajax({
                url: url,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({weatherData: data});
                    console.log(this.state.weatherData);
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
                className="GetWeatherBtn">
                CHECK WEATHER
            </a>
        );
    }
});
export default GetWeatherBtn;
