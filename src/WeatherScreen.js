import React from 'react';
import $ from '../js/jquery-2.2.4.min.js';
import EnterLocation from './EnterLocation';


var WeatherScreen = React.createClass({
    render: function()  {
        return (
            <div className="WeatherScreen">
                <EnterLocation />
            </div>
        );
    }
});

export default WeatherScreen;
