import React, {Component} from 'react';
import { Input,TextArea,Button,Form} from 'semantic-ui-react'
import Child from './child.jsx';
import Essential from './Essential.jsx';
import request from 'superagent';
import { Segment } from 'semantic-ui-react'

import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      url:'',
      procedure:'',
      MainIngredient:[{
        name:'butter',
        quantity:'',
        unit:'gm',
              },
      ],
      EssentialIngredient:[{
        name:''
      }],
    }

this.onChangeUrl= this.onChangeUrl.bind(this);
this.handleTextarea = this.handleTextarea.bind(this);
this.addFields =this.addFields.bind(this);
this.updateNames= this.updateNames.bind(this);
this.updateQuantity = this.updateQuantity.bind(this);
this.updateEssential = this.updateEssential.bind(this);
this.addEssentialfield = this.addEssentialfield.bind(this);
this.handlelogout =this.handlelogout.bind(this);
  }
  handleTextarea(event){
    let val = event.target.value;
    this.setState({procedure:val});

  }
  handleSubmit()
  {
    request
 .post('/userIngredientDetails') //http://localhost:3000
 .query({details:JSON.stringify(this.state)})
 .set('X-API-Key', 'foobar')
 .set('Accept', 'application/json')
 .end(function(err, res){
   if (err || !res.ok) {
     alert('Oh no! error');
   } else {
     alert('Details are succesfully submitted ' );
   }
 });
  }
  handlelogout(){
    console.log(cookies.get('email'),"cookie before logout");
    cookies.remove('email');
     request.post('/logout')
     .query({email: cookies.get('email')})
     .end((err, res) => {
       if (err)
         console.log(err);
         else
         console.log(res,'response')
      hashHistory.push('/Logout');
     });
  }
  onChangeUrl(event){
    let val1 = event.target.value;
    this.setState({url:val1});
    console.log('url : ',this.state.url);
  }
  addFields(){
    console.log('click***********',this.state.MainIngredient);
    let copy = this.state.MainIngredient;
    console.log(copy,"copy");
    let newField = {
      name:'',
      quantity:'',
      unit:'gm',
    }
    copy.push(newField);
    this.setState({copy});

  }
  addEssentialfield(){
    let copy = this.state.EssentialIngredient;
    let newField = {
      name:''
    }
    copy.push(newField);
    this.setState({copy});
  }
  updateNames(value,index){
    console.log(this.state.MainIngredient);
    let ingredientname =  this.state.MainIngredient[index];
    ingredientname.name= value;
    console.log(ingredientname,"name");
    //this.setState({MainIngredient:ingredientname});

  }
  updateQuantity(value,index){
    let ingredient =  this.state.MainIngredient[index];
    ingredient.quantity = value;
    console.log(ingredient,"quantity");
    console.log(this.state.MainIngredient,"inside update quantity");
  //  this.setState({MainIngredient:ingredient});

  }
  updateEssential(value,index){
    let mainIng = this.state.EssentialIngredient[index];
    mainIng.name=value;
    console.log(mainIng,"essentialing=====");

    //this.setState({EssentialIngredient:mainIng});
  }
  render() {

      return(<div>
      <Segment color='green' style={{marginLeft:'10%', marginRight:'10%', marginTop:'2%'}}>
      <br/>
      <h1 style={{color:'grey',textAlign:'center'}}>Enter Details of your DIYS Video</h1>
      <br/>
      <Button type='submit'style={{textAlign:'center'}} onClick={this.handlelogout}>logout</Button>
      <Form style={{width:'86%',marginLeft:'7.5%'}}>
      <Form.Input required={true} placeholder='Enter url of your DIYS video' onChange={this.onChangeUrl}/>
      <Form.TextArea required={true} autoHeight placeholder='Procedure to make' onChange={this.handleTextarea}/>
      <br/>
      <br/>

      <label><b>Enter Main ingredients </b></label>
      <br/>
      <br/>
      <Child MainIngred = {this.state.MainIngredient} addfield= {this.addFields} changeName ={this.updateNames} changeQuantiy={this.updateQuantity}/>
      <br/>
      <br/>

      <label><b>Enter Essential ingredients here</b></label>
      <br/>
      <br/>
      <Essential EssentialIngredient = {this.state.EssentialIngredient} addEssential={this.addEssentialfield} changeEssential = {this.updateEssential}/>
      <hr></hr>
      <br/>

      <Button inverted color='green' floated='right' onClick={this.handleSubmit.bind(this)}>Submit</Button>
      <br/>
      <br/>
      </Form>
      </Segment>
      </div>)
    }

}
