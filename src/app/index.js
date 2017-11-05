var React = require('react');
var ReactDOM = require('react-dom');
var CreateReactClass = require('create-react-class');

require('./css/style.scss');

//Create component



//Form Component

var Form = CreateReactClass({
    // getInitialState: function() {
    //     return {
    //         forms: [0]
    //     }
    // },

    render: function() {


        return (
            <div id="form-wrapper">
            	
            	<form  onSubmit={this.handleSubmit}>
            		<input className="data-name" type="text" ref="dataName" required/>
            		<input className="data-value" type="number" ref="dataValue" required/>	
            		<input type="submit" value="+"/>
            	</form>

            	
            </div>
        );
    },

    //{this.state.forms}
    //<p onClick={this.addForm}>Add</p>

    //Custom functions

    handleSubmit: function(e) {
        e.preventDefault();
        // var formIndex = e.target.id;
        this.props.passValues(this.refs.dataName.value, this.refs.dataValue.value);
        this.refs.dataName.value = "";
        this.refs.dataValue.value = "";
    },

    addForm: function() {
        var formsArray = this.state.forms;
        var formsL = formsArray.length;
        formsArray.push(formsL);
        this.setState({
            forms: formsArray
        });
        console.log(formsArray);
    }



});

//, formIndex

//Graph Component

var Graph = CreateReactClass({

    render: function() {
        return (
            <div className="graph-data">	
				<span className="graph-data-index">{this.props.index}</span>
				<span className="graph-data-name">{this.props.value.name}</span>
				<span className="graph-data-value">{this.props.value.value}</span>
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
            values: []
        };
    },

    render: function() {
        var valueArr = this.state.values.map(function(value, index) {

            return (
                <Graph value={value} index={index} key={value.id} removeData={this.removeData} />

            );
        }.bind(this));
        return (
            <div>
    			<Form id={this.state.id} name={this.state.name} value={this.state.value} passValues={this.passValues}/>

    			<div id="graph">
    				{valueArr}
    			</div>
    		</div>
        );
    },

    //   <div className="graph-data" key={value.id}>	
    //					<span className="graph-data-index">{value.index}</span>
    //					<span className="graph-data-name">{value.name}</span>
    //					<span className="graph-data-value">{value.value}</span>
    //				</div>

    passValues: function(dataName, dataValue, formIndex) {
        var valuesArr = this.state.values;
        // this.state.values.splice(index, 1, {
        //     index: formIndex,
        //     name: dataName,
        //     value: dataValue
        // })

        valuesArr.push({
            name: dataName,
            value: dataValue
        });

        this.setState({
            values: valuesArr
        });
        console.log(valuesArr);


    },

    removeData: function(id) {
        console.log(id)
        var valuesArr = this.state.values.filter(function(value, index) {
            return id !== index;
            console.log(index);
        });
        this.setState({
            values: valuesArr
        });
        console.log(valuesArr);
        console.log('clicked');
    }


});
// <Graph values={this.state.values} />

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