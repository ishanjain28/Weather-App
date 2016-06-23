import React from 'react'

const GetLocationBtn = React.createClass({
    render: function()  {
        return (
            <div className="GetLocationBtn">
                <a href="#" onClick={this.props.getLocation}>
                    <i className="location-icon fa fa-location-arrow fa-2x"></i>
                </a>
            </div>
        );
    }
});
export default GetLocationBtn;
