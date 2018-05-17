import React, { Component } from 'react';
import Slider from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class Range extends Component {

  // onChange(component, values) {
  onChange(values) {
    const { input: { onChange } } = this.props;
    console.log('Range, values',values);
    // console.log('Range, onChange this.props',this.props);
    // console.log('Range, onChange this.props.input',this.props.input);
    console.log('onChange, this.props.input.value: ', this.props.input.value);
    console.log('onChange, this.props.input: ', this.props.input);
    console.log('onChange, this.props ', this.props);
    const vmax = values.max;
    const vmin = values.min;

    // if(values.min < this.props.input.value.min || 
    //   values.max < this.props.input.value.max) {
    //   values.min = this.props.input.value.min;
    // }
    // if(values.max > this.props.input.value.max) {
    //   values.min = this.props.input.value.min;
    // }
    if (values.min < this.props.range.min) {
      values = {min: this.props.range.min, max: vmax};
    }
    if (values.max > this.props.range.max) {
      values = {min: vmin, max:this.props.range.max};
    }
    onChange(values);
  }
  // onChange={this.props.input.onChange.bind(this)}
  // onDragStart={this.onDragStart.bind(this)}
  // onDragStart (args) {
  //   console.log('onDragStart args',args)
  //   const { input: { onDragStart } } = this.props;
  //   onDragStart(args);
  // }
  
  render() {
    const { input: { onChange } } = this.props;
    const { input: { value } } = this.props;
    // const initial_value = {min:5, max:10};
   // formatLabel={value => `${value} yrs`}
   //   draggableTrack
       
   // console.log('In Range component:, this.props',this.props);
   // console.log('In Range component:, this.props.input',this.props.input);
    console.log('In Range component:, this.props.input.value',this.props.input.value);
    return (
      <div className="range-slider">
        <label>{this.props.label}</label>
        <Slider
          onChange={this.onChange.bind(this)}
          minValue={this.props.range.min}
          maxValue={this.props.range.max}
          value={this.props.input.value || this.props.range}
        
        />
      </div>
    );
  }
};

Range.defaultProps = {
  range: { min: 0, max: 100 }
};

export { Range };
