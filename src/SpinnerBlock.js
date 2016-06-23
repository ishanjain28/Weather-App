import React from 'react';

const SpinnerBlock = React.createClass({
    render: function()  {
        return (
            <div className="spinnerBlock">
                <i className="fa fa-spinner fa-pulse fa-fw"></i> Loading data...
            </div>
        );
    }
});

export default SpinnerBlock;
