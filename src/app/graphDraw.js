var React = require('react');
var CreateReactClass = require('create-react-class');

var GraphDraw = CreateReactClass({
    render: function() {
        return (
            <div id="graph">
				<div id="value1">
					<span className="graph-data-name"></span>
					<div className="graph-data-value"></div>
				</div>
			</div>
        );
    }
});

module.exports = GraphDraw;