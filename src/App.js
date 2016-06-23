import React from 'react';
import WeatherScreen from './WeatherScreen';
import EnterLocation from './EnterLocation';
import SpinnerBlock from './SpinnerBlock';

const RootBlock = React.createClass({
    render: function()  {
        return (
            <div>
                <Navbar />
                <FrontLandingWrapper />
                <WeatherScreen />
            </div>
        )
    }
});
const Navbar = React.createClass({

    render: function () {
        return (
            <div className="navBar" id="navBar">
                <p className="header">WEATHER</p>
            </div>
        );
    }
});

const FrontLandingWrapper = React.createClass({
    render: function()  {
        return (
            <div className="FrontLandingWrapper">
                <EnterLocation />
                <SpinnerBlock />
            </div>
        )
    }
});






export default RootBlock;
