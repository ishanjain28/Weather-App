/**
 * Created by ishan on 19/6/16.
 */

var Navbar = React.createClass({
   render: function () {
       return (
           <div className="navBar" id="navBar">
               <p className="header">WEATHER</p>
           </div>
       );
   }
});
var Spinner = React.createClass({
    render: function () {
        return (
            <div className="spinnerBlock">
                <i className="fa fa-circle-o-notch fa-spin"></i>
                <label>Loading Data...</label>
            </div>
        );
    }
});
var LocationIconBtn = React.createClass({
    render: function () {
        return (
            <a className="getLocationIcon" href="#" onClick={this.getLocation}>
                   <span className="fa-stack fa-lg">
                    <i className="fa fa-location-arrow"></i>
                    <i className="fa fa-square-o fa-stack-2x"></i>
                </span>
            </a>
        );
    }
});
var CheckWeatherBtn = React.createClass({
    render: function () {
        return (
            <a id="checkWeather" href="#" className="checkWeatherBtn">CHECK WEATHER</a>
        );
    }
});

var LocationBlock = React.createClass({
    render: function () {
        return (
           <div className="locSource animated slide" id="LocationBlock">
               <label>Enter your location: </label>
               <input id="locationInputBox" className="locationInputBox" type="text" placeholder="Enter your pincode and Country Code seperated by comma" />
               <LocationIconBtn />
               <br />
               <p className="currentLoc">Latitude: {crd.latitude} ,Longitude: {crd.longitude}</p>
               <p className="locExample">Example: 247667, IN</p>
               <br />
               <CheckWeatherBtn />
           </div>
        );
   }
});
var RootBlock = React.createClass({
    render: function () {
        return (
            <div>
                <Navbar />
                <LocationBlock />
                <Spinner />
            </div>
        );
    }
});

ReactDOM.render(
    <RootBlock />,
    document.getElementById('data-root')
);
