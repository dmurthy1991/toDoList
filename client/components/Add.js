import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../css/App.css';
var querystring = require('querystring');

class Add extends React.Component {
constructor() {
      super();
this.state = {
        item: '',
        priority: '',
        messageFromServer: '',
        modalIsOpen: false
      }
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.onClick = this.onClick.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.insertNewItem = this.insertNewItem.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
openModal() {
      this.setState({
        modalIsOpen: true
      });
    }
closeModal() {
      this.setState({
        modalIsOpen: false,
        item: '',
        priority: 'Low',
        messageFromServer: ''
      });
    }
componentDidMount() {
      this.setState({
        month: this.props.selectedPriority
      });
    }
handleSelectChange(e) {
        if (e.target.name == 'priority') {
          this.setState({
            priority: e.target.value
          });
        }
    }
onClick(e) {
      this.insertNewItem(this);
    }
insertNewItem(e) {
      axios.post('/insert',
        querystring.stringify({
          item: e.state.item,
          priority: e.state.priority
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
        e.setState({
          messageFromServer: response.data
        });
      });
    }
handleTextChange(e) {
      if (e.target.name == "item") {
        this.setState({
          item: e.target.value
        });
      }
    }
render() {
   if(this.state.messageFromServer == ''){
      return (
        <div>
      <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"> Add</span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Expense"
       className="Modal">
<Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
       <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
      </Link><br/>
<fieldset>
       <label for="item">Item:</label><input type="text" id="item" name="item" value={this.state.item} onChange={this.handleTextChange}></input>
       <label for="priority">Priority:</label><select id="priority" name="priority" value={this.state.priority} onChange={this.handleSelectChange}>
            <option value="High" id="High">High</option>
            <option value="Medium" id="Medium">Medium</option>
            <option value="Low" id="Low">Low</option>
         </select>
      </fieldset>
<div className='button-center'>
        <br/>
        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Item</Button>
       </div>
          </Modal>
        </div>
      )
   }
   else{
    return (
     <div>
       <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
       <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Add Item"
        className="Modal">
<div className='button-center'>
        <h3>{this.state.messageFromServer}</h3>
        <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
         <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
        </Link>
       </div>
      </Modal>
       </div>
     )
    }
   }
}
export default Add;