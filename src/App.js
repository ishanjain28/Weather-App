// Import Necessary Libraries and Files.
import React from 'react';
import Navbar from './Navbar';
import WeatherScreen from './WeatherScreen';
import $ from 'jquery';

const App = React.createClass({
    getInitialState: function() {
        return {
            latitude: '',
            longitude: '',
            accuracy: '',
            address: '',
            TempUnit: 'C',
            InputText: '',
            WeatherData: '',
            UpdateTime: '',
            timezone: '',
            offset: ''
        };
    },
    getAddress: function(add)  {
        this.setState({
            address: add
        });
    },
    getLatLngAcc: function(lat, long, acc)    {
        this.setState({
            latitude: lat,
            longitude: long,
            accuracy: acc
        });
    },
    getInputText: function(InputText)    {
        this.setState({
            InputText: InputText
        });
    },
    getTemperatureUnit: function(unit)  {
        this.setState({
            TempUnit: unit
        })
    },
    getWeatherFromLatLng: function getWeather(lat, long, UpdateTime)  {

        if(lat && long) {
            var KEY = "5f6b52407f05c81ab142559b38446da1";
            var URL = "https://api.forecast.io/forecast/" + KEY + "/" + lat + ',' + long;
            $.ajax({
                url: URL,
                dataType: 'jsonp',
                cache: 'true',
                success: function (data)    {
                    this.setState({
                        WeatherData: data,
                        UpdateTime: UpdateTime,
                        offset: data.offset,
                        timezone: data.timezone
                    });
                    console.log(this.state.WeatherData);
                }.bind(this),
                error: function (xhr, status, err)  {
                    console.log(URL, err.toString());
                }.bind(this)
            });
        }
    },
    render: function () {
        return (
            <div className="App">
                <Navbar
                    getAddress={this.getAddress}
                    getLatLngAcc={this.getLatLngAcc}
                    getInputText={this.getInputText}
                    getWeatherFromLatLng={this.getWeatherFromLatLng}
                    getTemperatureUnit={this.getTemperatureUnit}
                />
                <WeatherScreen
                    address={this.state.address}
                    UpdateTime={this.state.UpdateTime}
                    WeatherData={this.state.WeatherData}
                    TempUnit={this.state.TempUnit}
                />
            </div>
        );
    }
});

export default App;
