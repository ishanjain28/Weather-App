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
            <a
                id="checkWeather"
                href="#"
                className="checkWeatherBtn"
                onClick={this.props.handleThat}>
                CHECK WEATHER
            </a>
        );
    }
});

var LocationBlock = React.createClass({
    getInitialState: function () {
      return {address: 'Example: 110001,IN'};
    },
    handleChange: function (e) {
        this.setState({address: e.target.address});
    },
    handleWeatherCheck: function (address) {
        var key = "b616bc06fdb9ef3608e2125feccad90a";
        if(!address) {
            var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + {address} + "&appid=" + key;
        } else {
            console.log("Enter Address");
        }

        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
           <div className="locationBlock animated slide" id="LocationBlock">
               <div className="locationBlockContainer">
                <label>Enter your location: </label>
                <input
                    id="locationInputBox"
                    className="locationInputBox"
                    type="text"
                    value={this.state.address}
                    onChange={this.handleChange}
                />
                <LocationIconBtn />
                <br />
                <CheckWeatherBtn handleThat={this.handleWeatherCheck(this.state.address)} />
               </div>
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
