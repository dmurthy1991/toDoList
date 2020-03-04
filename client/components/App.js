import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add.js';
import Delete from './Delete.js'
import '../css/App.css';

export default class App extends React.Component {
constructor() {
    super();
  this.state = {selectedPriority: 'Low', data: []};
    this.getData = this.getData.bind(this);
  }
componentDidMount() {
    this.getData(this, 'Low');
  }
  componentWillReceiveProps(nextProps) {
    this.getData(this, 'Low');
  }
getData(ev, item){
    axios.get('/getAll')
      .then(function(response) {
        ev.setState({data: response.data});
        ev.setState({selectedPriority: item})
      });
  }
  render() {
    return (
      <div>
        <Add selectedPriority={this.state.selectedPriority} />
        <table>
          <thead>
            <tr><th></th><th className='desc-col'>Items</th><th className='button-col'>Priority</th></tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(exp){
                return  <tr><td className='counterCell'></td><td className='desc-col'>{exp.item}</td><td className='button-col'>{exp.priority}</td><td className='button-col'><Delete id={exp._id} item={exp} /></td></tr>
              })
            }
            </tbody>
</table>
      </div>
    );
  }
}