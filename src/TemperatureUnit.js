import React from 'react';


const TemperatureUnit = React.createClass({
    setTemperatureUnit: function()  {
        var TempUnit = document.getElementById('TemperatureUnitSelect');
        if(TempUnit[TempUnit.selectedIndex].value == "C") {
            this.props.getTemperatureUnit("C");
        } else {
            this.props.getTemperatureUnit("F");
        }
    },
    render: function()  {
        return (
            <div className="TemperatureUnit">
                <form className="TemperatureUnitForm">
                    <label>Temperature Unit: </label>
                    <select
                        name="TemperatureUnitSelect"
                        className="TemperatureUnitSelect"
                        id="TemperatureUnitSelect"
                        onClick={this.setTemperatureUnit}>
                        <option value="C">C</option>
                        <option value="F">F</option>
                    </select>
                </form>
            </div>
        );
    }
});

export default TemperatureUnit;
