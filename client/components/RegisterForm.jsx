import React, {Component} from 'react';
import { Input,TextArea,Label,Icon,Segment,Form,Button,Checkbox,Radio} from 'semantic-ui-react';
import request from 'superagent';
import {hashHistory} from 'react-router';
export default class RegisterForm extends React.Component {
  constructor(){
    super();
    this.state={
      name:'',
      username:'',
      password:'',
	  rePassword:'',
      email:'',
      disable:true,
	  checked:false,
	  value:''
    }
  this.handleUser = this.handleUser.bind(this);
  this.handleUsername = this.handleUsername.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
  this.handleRePassword =  this.handleRePassword.bind(this); 
  this.handleEmail = this.handleEmail.bind(this);
  this.submitRegister = this.submitRegister.bind(this);
  this.handleCheck = this.handleCheck.bind(this);
  this.handleChange =this.handleChange.bind(this);
  }
  validateForm() {
    if (this.state.name == '' || this.state.name == null ||
        this.state.username == '' || this.state.username == null ||
        this.state.email == '' || this.state.email == null ||
        this.state.password == '' || this.state.password == null||
		this.state.rePassword == '' || this.state.rePassword == null)
        {
          this.setState({disable: true})
        } else {
            this.setState({disable: false})
          }
  }
  handleChange(e, { value }){
	  this.setState({ value:value });
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
  handleCheck(event){
	this.setState({checked: !this.state.checked});  
  }
  handleRePassword(event){
	let val = event.target.value;
    this.setState({rePassword:val});
    this.validateForm();
  }
  handleEmail(event){
    let val = event.target.value;
    this.setState({email:val});
    this.validateForm();
  }
  submitRegister(){
	  console.log(this.state.checked,"checked");
	if((this.state.password == this.state.rePassword)){
		console.log("&&&&")
	 var registerForm = {
      'username': this.state.username,
      'password': this.state.password,
	  'email': this.state.email,
	  'name': this.state.name,
	  'value':this.state.value
    }
	
    request.post('/register')
       .query({details:JSON.stringify(registerForm)})
       .end(function(err, res){
         if (err || !res.ok) {
           alert('Oh no! error');
         } else {
           hashHistory.push('/');
		   location.reload();
         }
	   
    });
	}
	else{
		  alert('Password and confirm password should be same');
	}
}
  render(){

    return(
      <div>
      <Segment color='green' style={{marginLeft:'10%', marginRight:'10%', marginTop:'2%'}}>
       <h1 style={{color:'grey',textAlign:'center'}}>Account Registration</h1>
       <Form style={{width:'86%',marginLeft:'7.5%'}} onSubmit={this.submitRegister}>
       <Form.Field>
         <label>Name</label>
         <input placeholder='Name' type="text" required="true" onChange={this.handleUser}/>
       </Form.Field>
       <Form.Field>
         <label>Username</label>
         <input placeholder='Username' type="text" required="true" onChange={this.handleUsername} />
       </Form.Field>
       <Form.Field>
         <label>Password</label>
         <input placeholder='Password' type="password" required="true" onChange={this.handlePassword} />
       </Form.Field>
	   <Form.Field>
         <label>Confirm Password</label>
         <input placeholder='Confirm Password' type="password" required="true" onChange={this.handleRePassword} />
       </Form.Field>
       <Form.Field>
         <label>Email</label>
         <input placeholder='Email' name="email" type="text" required="true" onChange={this.handleEmail} />
       </Form.Field>
	   <Form.Field>
          Select User: <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label='Blogger'
            name='radioGroup'
            value='Blogger'
            checked={this.state.value === 'Blogger'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Retailer'
            name='radioGroup'
            value='Retailer'
            checked={this.state.value === 'Retailer'}
            onChange={this.handleChange}
          />
        </Form.Field>
       <Checkbox checked={this.state.checked} onChange={this.handleCheck} />I Agree <a href="terms" >all terms and conditions</a><br /><br/>
     <Button type='submit' disabled={this.state.disable} >Submit</Button>
     </Form>
     </Segment>
      </div>
    );
  }
}
