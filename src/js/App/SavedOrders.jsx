import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openOrder } from './AppActions';

class SavedOrders extends Component {
  constructor(props) {
    super(props);   
    this.openSelectedOrder = this.openSelectedOrder.bind(this); 
  }
  openSelectedOrder(order, savedOrders, key) {
    const { dispatch } = this.props;
    dispatch(openOrder(order, savedOrders, key))
  }
  render() {
    const { savedOrders } = this.props;        
    return (
      <div className = 'saved-screen'>  
        {savedOrders.length > 0 ? 
        <div className="saved-screen-row">
          {savedOrders.map((order, i) => {
            return (
              
              <button className = 'saved-btns' key = {i} 
                onClick = {() => this.openSelectedOrder(order, savedOrders, i)}>
                {order.map((item, i) => {
                  return (
                    <div key = {i}>
                      {item.name}
                    </div>
                  )
                })}
              </button>
            )
          })}
        </div>
        : 
        <div className="saved-screen-row">
          <div className="saved-screen-row-message">
              No Current Orders
          </div>
        </div>
      }      
      </div>
    )
  }
}

function mapStateToProps(state) {  
  return {
    savedOrders: state.posCalc.savedOrders
  }
}

export default connect(mapStateToProps)(SavedOrders);

