import React from 'react';
import GetLocationBtn from './GetLocationBtn';

const LocationInput = React.createClass({
    getInitialState: function() {
        return {
            LocationInputText: ""
        };
    },
    handleChange: function(e)    {
        this.setState({
            LocationInputText: e.target.value
        });
    },
    render: function()  {
        return (
            <div className="LocationInput">
            <label> Enter a Location: </label>
            <div className="LocationInputTextWrapper">
                <input
                    type="text"
                    value={this.state.LocationInputText}
                    onChange={this.handleChange}
                    className="LocationInputText"
                    placeholder="Example: 110001,IN"
                    />
                <GetLocationBtn getLocation={this.props.getLocation}/>
            </div>
        </div>
        );
    }
});
export default LocationInput;
