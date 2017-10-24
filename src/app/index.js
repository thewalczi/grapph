var React = require('react');
var ReactDOM = require('react-dom');
var CreateReactClass = require('create-react-class');

require('./css/style.scss');

//module require

// var Value = require('./value');

//Create component


var Form = CreateReactClass({
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
            	<div className="data-form">
            		<input className="data-name" type="text" ref="dataName"/>
            		<input className="data-value" type="number" ref="dataValue"/>
            		<input className="data-name" type="text" ref="dataName"/>
            		<input className="data-value" type="number" ref="dataValue"/>
            		<input type="submit" value="Rysuj"/>
            	</div>
            </form>
        );
    },
    //Custom functions

    handleSubmit: function(e) {
        e.preventDefault();
        this.props.passValues(this.refs.dataName.value, this.refs.dataValue.value);
    }

});

var Graph = CreateReactClass({
    render: function() {
        return (
            <div id="graph">
				<div>
					<span className="graph-data-name">{this.props.name}</span>
					<span className="graph-data-name">{this.props.value}</span>
				</div>
				
			</div>
        );
    }
});

var App = CreateReactClass({
    getInitialState: function() {
        return {
            name: this.props.name,
            value: this.props.value
        };
    },

    passValues: function(dataName, dataValue) {
        this.setState({
            name: dataName,
            value: dataValue
        });
        console.log(this.state.name);
        console.log(this.state.value);
        console.log('clicked');
    },

    render: function() {
        return (
            <div>
    			<Form name={this.state.name} value={this.state.value} passValues={this.passValues}/>

    			<Graph name={this.state.name} value={this.state.value} />
    		</div>
        );
    }
});

ReactDOM.render(<App/>, document.getElementById('content-wrapper'));




// var FormComponent = CreateReactClass({
//     getInitialState: function() {
//         return {
//             forms: [0, 1, 2],
//             values: []
//         };
//     }.bind(this),
//     render: function() {
//         var forms = this.state.forms;
//         forms = forms.map(function(number, index) {
//             return (

//                 <Value number={number} key={index} onValue={this.onValue}/>
//             );
//         })
//         return (

//             <div id="app-wrapper">
//             <form onSubmit={this.onValue}> 
//             	{forms}
//             	<input type="submit" value="Rysuj"/>
//             </form>
//             	<div id="graph">
// 					<div id="value1">
// 						<span className="graph-data-name"></span>
// 						<div className="graph-data-value"></div>
// 					</div>
// 					<div id="value2">
// 						<span className="graph-data-name"></span>
// 						<div className="graph-data-value"></div>
// 					</div>
// 					<div id="value3">
// 						<span className="graph-data-name"></span>
// 						<div className="graph-data-value"></div>
// 					</div>
// 				</div>
// 			</div>
//         );
//     },

//     //custom functions



// });

//put component into html page

// ReactDOM.render(<FormComponent/>, document.getElementById("content-wrapper"));