import React, {Component} from 'react';
import { Input,TextArea,Form,Select } from 'semantic-ui-react'

class Essential extends React.Component {

constructor(props){
super(props);
}
changeName(i,event){
  let val = event.target.value;
  console.log(val,i,'value in child');
  this.props.changeEssential(val,i);
}
render() {
var component = this.props.EssentialIngredient.map((item,i) =>{
return(
<div>
<Form  key={i}>
<Form.Group>
<Form.Input placeholder='Name'  width={13} onBlur={this.changeName.bind(this,i)}/>
<Form.Button width={4} onClick={this.props.addEssential}>Add</Form.Button >
</Form.Group>

</Form>
</div>
)
});
  return (

    <div>
    {component}
    </div>
  );

}
}
module.exports = Essential;
