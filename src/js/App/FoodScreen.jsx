import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from './AppActions';

class FoodScreen extends Component {
  constructor(props) {
    super(props);
    this.addFood = this.addFood.bind(this);
  }


  addFood(food) {
    const { dispatch, currentOrder } = this.props;    
    dispatch(addItem(currentOrder, food, 'food'));
  }

  render() {
    const { bakery, breakfast } = this.props;
    const baked = bakery ? bakery : [];
    const sandwhiches = breakfast ? breakfast : []     
    return (
      <div className = 'food-screen'>        
        <div className="food-screen-row">
          {baked.map((bake, i ) => {
            return (
              <button className = 'food-btns food-btns-bakery' 
                key = {i}
                onClick = {() => this.addFood(bake)}>{bake.name}</button>
            )
          })}
        </div>
        <div className="food-screen-row">
          {sandwhiches.map((sandwhich, i ) => {
            return (
              <button className = 'food-btns food-btns-breakfast'
                key = {i}
                onClick = {() => this.addFood(sandwhich)}>{sandwhich.name}</button>
            )
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {  
  return {
    bakery: state.posCalc.bakery,
    breakfast: state.posCalc.breakfast,
    currentOrder: state.posCalc.currentOrder
  }
}

export default connect(mapStateToProps)(FoodScreen);

