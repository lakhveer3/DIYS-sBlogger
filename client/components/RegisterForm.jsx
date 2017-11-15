import React, {Component} from 'react';
import { Input,TextArea,Label,Icon,Segment,Form,Button} from 'semantic-ui-react';
import request from 'superagent';
import {hashHistory} from 'react-router';
export default class RegisterForm extends React.Component {
  constructor(){
    super();
    this.state={
      name:'',
      username:'',
      password:'',
      email:'',
      disable:true
    }
  this.handleUser = this.handleUser.bind(this);
  this.handleUsername = this.handleUsername.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
  this.handleEmail = this.handleEmail.bind(this);
  this.submitRegister = this.submitRegister.bind(this);
  }
  validateForm() {
    if (this.state.name == '' || this.state.name == null ||
        this.state.username == '' || this.state.username == null ||
        this.state.email == '' || this.state.email == null ||
        this.state.password == '' || this.state.password == null)
        {
          this.setState({disable: true})
        } else {
            this.setState({disable: false})
          }
  }

  handleUser(event){
    let val = event.target.value;
    this.setState({name:val});
    this.validateForm();
  }
  handleUsername(event){
    let val = event.target.value;
    this.setState({username:val});
    this.validateForm();
  }
  handlePassword(event){
    let val = event.target.value;
    this.setState({password:val});
    this.validateForm();
  }
  handleEmail(event){
    let val = event.target.value;
    this.setState({email:val});
    this.validateForm();
  }
  submitRegister(){
    request.post('/register')
       .query({UserDetails:JSON.stringify(this.state)})
       .end(function(err, res){
         if (err || !res.ok) {
           alert('Oh no! error');
         } else {
           hashHistory.push('/Login');
         }
  });
}
  render(){

    return(
      <div>
      <Segment color='green' style={{marginLeft:'10%', marginRight:'10%', marginTop:'2%'}}>
       <h1 style={{color:'grey',textAlign:'center'}}>Account Registration</h1>
       <Form style={{width:'86%',marginLeft:'7.5%'}} onSubmit={this.submitRegister}>
       <Form.Field>
         <label>Name</label>
         <input placeholder='Name' required="true" onChange={this.handleUser}/>
       </Form.Field>
       <Form.Field>
         <label>Username</label>
         <input placeholder='Username' required="true" onChange={this.handleUsername} />
       </Form.Field>
       <Form.Field>
         <label>Password</label>
         <input placeholder='Password' required="true" onChange={this.handlePassword} />
       </Form.Field>
       <Form.Field>
         <label>Email</label>
         <input placeholder='Email' name="email" type="text" required="true" onChange={this.handleEmail} />
       </Form.Field>

     <Button type='submit' disabled={this.state.disable} >Submit</Button>
     </Form>
     </Segment>
      </div>
    );
  }
}
