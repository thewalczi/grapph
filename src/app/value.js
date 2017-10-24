var React = require('react');
var CreateReactClass = require('create-react-class');

var Value = CreateReactClass({
    render: function() {
        var value1 = this.props.refs.dataName;
        return (
            // <form onSubmit={this.handleSubmit}> 

            <div className="data-form">
            		<input className="data-name" type="text" require ref="dataName"/>
            		<input className="data-value"type="number" require ref="dataValue"/>
            		<span className="data-remove">x</span>
            	</div>
        // <input type="submit" value="Rysuj"/>
        // </form>
        );
    },

    //Custom functions

    // handleSubmit: function(e) {
    //     e.preventDefault();
    //     this.props.onValue(this.refs.dataName.value);
    // }


});

module.exports = Value;


<input className="data-value"type="number" value={this.props.value} require/>

<div className="graph-data-value">{this.props.value}</div>