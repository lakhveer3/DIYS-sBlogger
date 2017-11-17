import React, {Component} from 'react';
import { Input,TextArea,Form,Select } from 'semantic-ui-react'

class child extends React.Component {

constructor(props){
super(props);
this.changeUnit=this.changeUnit.bind(this);
}
changeName(i,event){
  let val = event.target.value;
  console.log(val,i,'value in child');
  this.props.changeName(val,i);
}
changeQuantity(i,event){
  let val = event.target.value;
  this.props.changeQuantiy(val,i);
}
 changeUnit(i,data){
   console.log(data,"dataaaaa******");

  // console.log(`event.target.value: ${JSON.stringify(event.target.value)}`);
  //
  // console.log(`data : ${JSON.stringify(data, null, 2)}`);
  var value=data.value
	, indexOfValue = data.options.findIndex(x => x.value==value)
	, indexOfMap = data.options[indexOfValue].index;
  console.log(value, ' -- ',indexOfMap);

}
render() {
var component = this.props.MainIngred.map((item,i) =>{

  var option = [ { key: 'ounce', text: 'Ounce', value: 'Ounce',index:i  },
                  { key: 'pound', text: 'Pound', value: 'pound',index:i  },
                  { key: 'kg', text: 'Kg', value: 'kg' ,index:i },
                  { key: 'gm', text: 'gm', value: 'gm',index:i  },
                  { key: 'li', text: 'litres', value: 'li',index:i  },
				  { key: 'Number', text: 'Number', value: 'number',index:i  }
      ];
return(
<div key={i}>
<Form  >
<Form.Group widths='equal'>
<Form.Input placeholder='Name' type="text" onBlur={this.changeName.bind(this,i)} />
<Form.Input placeholder='Quantity' type="number" onBlur={this.changeQuantity.bind(this,i)} />
<Form.Select placeholder='Unit' placeholder='Unit' onChange={this.changeUnit} options={option}  />
<Form.Button  onClick={this.props.addfield}>Add</Form.Button>
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
module.exports = child;
