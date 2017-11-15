import React, {Component} from 'react';
import { Input,TextArea,Label,Icon,Segment,Form,Button} from 'semantic-ui-react';
import request from 'superagent';

export default class RegisterForm extends React.Component {
  constructor(){
    super();
    this.state={
      name:'',
      username:'',
      password:'',
      email:''
    }
  this.handleUser = this.handleUser.bind(this);
  this.handleUsername = this.handleUsername.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
  this.handleEmail = this.handleEmail.bind(this);
  this.submitRegister = this.submitRegister.bind(this);
  }
  handleUser(event){
    let val = event.target.value;
    this.setState({name:val});
  }
  handleUsername(event){
    let val = event.target.value;
    this.setState({username:val});
  }
  handlePassword(event){
    let val = event.target.value;
    this.setState({password:val});
  }
  handleEmail(event){
    let val = event.target.value;
    this.setState({email:val});
  }
  submitRegister(){
    request.post('/register')
       .query({UserDetails:JSON.stringify(this.state)})
       .end(function(err, res){
         if (err || !res.ok) {
           alert('Oh no! error');
         } else {
           alert('Details submitted successfully' );
         }
  });
}
  render(){
    return(
      <div>
      <Segment color='green' style={{marginLeft:'10%', marginRight:'10%', marginTop:'2%'}}>
       <h1 style={{color:'grey',textAlign:'center'}}>Account Registration</h1>
       <Form style={{width:'86%',marginLeft:'7.5%'}}>
       <Form.Field>
         <label>Name</label>
         <input placeholder='Name' onChange={this.handleUser}/>
       </Form.Field>
       <Form.Field>
         <label>Username</label>
         <input placeholder='Username' onChange={this.handleUsername} />
       </Form.Field>
       <Form.Field>
         <label>Password</label>
         <input placeholder='Password' onChange={this.handlePassword} />
       </Form.Field>
       <Form.Field>
         <label>Email</label>
         <input placeholder='Email' onChange={this.handleEmail} />
       </Form.Field>
     <Button type='submit' onClick={this.submitRegister}>Submit</Button>
     </Form>
     </Segment>
      </div>
    );
  }
}
