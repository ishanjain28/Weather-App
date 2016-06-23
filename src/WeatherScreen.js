import React from 'react';
import EnterLocation from './EnterLocation';


const WeatherScreen = React.createClass({
    render: function()  {
        return (
            <div className="WeatherScreen">
                <Navbar />
            </div>
        );
    }
});

const Navbar = React.createClass({
   render: function () {
       return (
         <div className="WSNavbar">
             <div className="Brand">
                 <i className="fa fa-warning fa-2x"></i> Weather
             </div>
             <EnterLocation class="WSEnterLocation" id="WSEnterLocation" />
         </div>
       );
   }
});
export default WeatherScreen;
