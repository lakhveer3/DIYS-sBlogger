import React, {Component} from 'react';
import { Input,TextArea,Label,Icon,Segment,Form,Button} from 'semantic-ui-react';
import request from 'superagent';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
//import createBrowserHistory from 'history/createBrowserHistory';
//let myApp = { history: createBrowserHistory() };
export default class Login extends React.Component {
  constructor(){
    super();
    this.state={
      username:'',
      password:''
    }
    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  handleUser(event){
    let val = event.target.value;
    this.setState({username:val});
  }
  handlePassword(event){
    let val = event.target.value;
    this.setState({password:val});
  }
  submitLogin(){
    request.post('/login')
    .query({username:this.state.username,password:this.state.password})
    .set('X-API-Key', 'foobar')
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err || !res.ok) {
        alert('Incorrect username or password');
      } else {
        console.log(res);
        console.log('cookie name:'+res.body.email);
          cookies.set('email',res.body.email);
          hashHistory.push('/bloggerPage');

      }
    });
  }
 submitRegister(){
   hashHistory.push('/register');
      //myApp.history.push('/Register');
/*    request.post('/register')
    .query({username:'lakhveer',password:'1234'})
    .end(function(err, res){
      if (err || !res.ok) {
        alert('Oh no! error');
      } else {
        alert('Logged in successfully' );
      }
    });*/

  }
render() {
    console.log('state : ',this.state);
    return (
      <div>

  <Segment color='green' style={{marginLeft:'10%', marginRight:'10%', marginTop:'2%'}}>
   <h1 style={{color:'grey',textAlign:'left'}}>DIYS</h1>
    <h1 style={{color:'grey',textAlign:'center'}}>Account Login</h1>
    <Form style={{width:'86%',marginLeft:'7.5%'}}>
    <Form.Field>
      <label>Username</label>
      <input placeholder='Username' onChange={this.handleUser}/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' onChange={this.handlePassword} />
    </Form.Field>
  <Button type='submit' onClick={this.submitLogin}>Login</Button>
  <Button type='submit' onClick={this.submitRegister.bind(this)}>Register</Button>

  </Form>
  </Segment>
      </div>);
    }
  }
