var React = require('react');
var ReactDOM = require('react-dom');
var CreateReactClass = require('create-react-class');
var $ = require('jquery');

require('./css/style.scss');

//Create component



//Form Component

var Form = CreateReactClass({

    render: function() {


        return (
            <div id="form-wrapper">
            	
            	<form onSubmit={this.handleSubmit}>
            		<div className="data-name">
            			<label htmlFor="name">Name:</label>
            			<input id="name" type="text" ref="dataName" required/>
            		</div>
            		<div className="data-value">
            			<label htmlFor="value">Value:</label>
            			<input id="value" type="number" ref="dataValue" min="0" required/>	
            		</div>
            		<button type="submit">Add</button>
            	</form>

            </div>
        );
    },


    //Custom functions

    handleSubmit: function(e) {
        e.preventDefault();
        this.props.passValues(this.refs.dataName.value, this.refs.dataValue.value);
        this.refs.dataName.value = "";
        this.refs.dataValue.value = "";
    }


});


//Graph Component

var Graph = CreateReactClass({

    render: function() {
        return (

            <div data-graph-index={this.props.index} data-value={this.props.value.value} className="graph-data-value">
            	<span>
            		{this.props.value.value}
            	</span>
            </div>

        );
    }
});


//Legend Component

var Legend = CreateReactClass({

    render: function() {
        return (
            <div data-legend-index={this.props.index} className="graph-data" onMouseEnter={this.mouseEnter}>	
				<span className="graph-data-name">{this.props.value.name}</span>
				<button className="graph-data-remove" onClick={this.handleRemove}>-</button>
			</div>
        );
    },

    handleRemove: function() {
        this.props.removeData(this.props.index);
    }

});


//App Component

var App = CreateReactClass({
    getInitialState: function() {
        return {
            values: [],
            colors: ['#44bdb8', '#19b0bb', '#20a1c1', '#4299c6', '#1d95d1', '#6389c7']
        };
    },

    render: function() {

        var legend = this.state.values.map(function(value, index) {

            return (
                <Legend value={value} index={index} key={value.id} removeData={this.removeData} />
            );
        }.bind(this));

        var graph = this.state.values.map(function(value, index) {

            return (
                <Graph value={value} index={index} key={value.id} removeData={this.removeData} />
            );
        }.bind(this));

        $(document).ready(function() {
            $('.graph-data').hover(function() {
                var index = $(this).attr('data-legend-index');
                $(this).addClass('hover');
                $('.graph-data-value').eq(index).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
                $('.graph-data-value').removeClass('hover');
            })

            $('.graph-data-value').hover(function() {
                var index = $(this).attr('data-graph-index');
                $(this).addClass('hover');
                $('.graph-data').eq(index).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
                $('.graph-data').removeClass('hover');
            })
        })

        return (
            <div>
            	<p>Type name of the attribute You want to display and it's value. Add multiple attributes one after another.</p>

    			<Form id={this.state.id} name={this.state.name} value={this.state.value} passValues={this.passValues}/>

    			<div id="graph-wrapper">
    				<div className="graph-inner">
    					{graph}
    				</div>
    			</div>

    			<div id="legend-wrapper">
    				<p>Legend:</p>
    				{legend}
    			</div>

    		</div>
        );
    },

    passValues: function(dataName, dataValue, formIndex) {
        var valuesArr = this.state.values;
        var value = this.state.values.value;

        valuesArr.push({
            name: dataName,
            value: dataValue
        });

        this.setState({
            values: valuesArr
        });

    },

    removeData: function(id) {
        var valuesArr = this.state.values.filter(function(value, index) {
            return id !== index;
        });
        this.setState({
            values: valuesArr
        });
    },

    componentDidUpdate: function() {

        var dataIndex = document.querySelectorAll('[data-graph-index]');
        var dataName = document.getElementsByClassName('graph-data');

        var valueW = (100 / dataIndex.length) - 2 + '%';

        //Adding ID to value.

        for (i = 0; i < dataIndex.length; i++) {
            dataIndex[i].id = "value" + i;
            if (i % 2 == 0) {
                dataIndex[i].childNodes[0].className = "even";
            }
        }

        //Adding colors

        var color = this.state.colors;
        (function(n) {

            for (var i = 0; i < n; i++) {
                dataIndex[i].style.background = color[i % color.length];
                dataName[i].style.borderLeftColor = color[i % color.length];
            }
        })(dataIndex.length)

        var graphArr = [];
        var values = this.state.values;
        var maxVal = this.state.maxVal;

        $(document).ready(function() {
            $('.graph-data-value').width(valueW);

            for (i = 0; i < values.length; i++) {
                graphArr.splice(i, 0, values[i].value);
            }

            var maxVal = Math.max.apply(0, graphArr);

            for (j = 0; j < graphArr.length; j++) {
                $('.graph-data-value').eq(j).height((graphArr[j] / maxVal) * 100 + '%');

            }

        });

    }

});

ReactDOM.render(<App/>, document.getElementById('content-wrapper'));
