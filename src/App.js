import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import WeatherScreen from './WeatherScreen';
import EnterLocation from './EnterLocation';
import SpinnerBlock from './SpinnerBlock';


const RootBlock = React.createClass({
    render: function()  {
        return (
            <div>
                {/*<Navbar />*/}
                {/*<FrontLandingWrapper />*/}
                <WeatherScreen />
            </div>
        )
    }
});
const Navbar = React.createClass({
    render: function () {
        return (
            <div className="navBar animated" id="navBar">
            <p className="animated header">WEATHER</p>
            </div>
        );
    }
});

const FrontLandingWrapper = React.createClass({
    render: function()  {
        return (
            <div className="FrontLandingWrapper">
                <EnterLocation
                    EnterLocation="EnterLocation"
                    id="EnterLocation"
                    LocationInputTextWrapper="LocationInputTextWrapper"
                    LocationInputText="LocationInputText"
                    />
                <SpinnerBlock />
            </div>
        )
    }
});

export default RootBlock;
