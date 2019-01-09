import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import Modal from 'react-modal';
import ProjectClose from './../../ProjectClose';
import TenderScreen from './TenderScreen';
import DrinksScreen from './DrinksScreen';
import FoodScreen from './FoodScreen';
import SavedOrders from './SavedOrders';
import { getMenu, changeScreen, selected, removeSelected, cancelOrder, modalPosOpen, modalPosClose, saveOrder } from './PosCalcActions';

const modalStyle = {
  overlay: {
    zIndex: 199
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.selectScreen = this.selectScreen.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.cancelEntireOrder = this.cancelEntireOrder.bind(this);
    this.openModal = this.openModal.bind(this);
    this.cancelOrderModal = this.cancelOrderModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveEntireOrder = this.saveEntireOrder.bind(this);    
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getMenu())
  }

  selectScreen(screen) {
    const { dispatch } = this.props;
    dispatch(changeScreen(screen));
  }
  selectedItem(key, type) {
    const { dispatch, currentOrder } = this.props;
    dispatch(selected(key, type, currentOrder))
  }
  removeItem() {
    const { dispatch, currentOrder, currentSelected } = this.props;
    dispatch(removeSelected(currentOrder, currentSelected))
  }
  cancelEntireOrder() {
    const { dispatch } = this.props;
    dispatch(cancelOrder())
  }
  openModal(modal) {
    
    const { dispatch } = this.props;
    dispatch(modalPosOpen(modal))
  }
  closeModal() {
    const { dispatch } = this.props;
    dispatch(modalPosClose());
  }
  gitHub() {
    ReactGA.event({
      category: 'Visited GitHub from Modal',
      action: 'From Change Modal'
    })
  }
  cancelOrderModal() {
    return (
      <div className = 'pos-modal'>
        <div className = 'pos-modal-message'>
          Are you sure you want to cancel the entire order?
        </div>
        <div className = 'pos-modal-btns'>
          <button onClick={this.closeModal} 
            className = 'pos-modal-btns-cancel'> 
            Cancel
          </button>
          <button onClick={this.cancelEntireOrder}
            className = 'pos-modal-btns-submit'> 
            Submit 
          </button>
        </div>
      </div>
    )
  }
  saveEntireOrder() {
    const { dispatch, currentOrder, orderTotal, savedOrders } = this.props;
    dispatch(saveOrder(currentOrder, orderTotal, savedOrders))
  }


  saveOrderModal() {
    return (
      <div className = 'pos-modal'>
      <div className = 'pos-modal-message'>
      Are you sure you want to save this order?
      </div>
      <div className = 'pos-modal-btns'>
      <button onClick={this.closeModal} 
        className = 'pos-modal-btns-cancel'> 
        Cancel
      </button>
      <button onClick={this.saveEntireOrder}
        className = 'pos-modal-btns-save'> 
        Save
      </button>
    </div>
  </div>
    )
  }

  render() {
    const { currentScreen, currentOrder, currentSelected, subTotal, orderTotal, posModalIsOpen, modalType, returnedAmount, payment } = this.props;      
    let sub = subTotal ? subTotal : 0;
    let total = orderTotal ? orderTotal : 0;
    let order = currentOrder ? currentOrder : null;    
    return (
      <div id="posCalcProject">
        <div className="container pos-container">
          <Modal
            isOpen={posModalIsOpen}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
            style={modalStyle}
            className={'ReactModal_POS'}
          >
            {(modalType == 'cancel') && this.cancelOrderModal()}
            {(modalType == 'save') && this.saveOrderModal()}

          </Modal>
          <div className="pos-header">
            <header>
              Point of Sale Calculator
            </header>
          </div>
          <div className="pos-menus">
            <div className="pos-menus-functions">
              {(orderTotal > 0) ?
              <button className='pos-menus-functions-btns pos-menus-functions-btns--default'
                onClick={() => this.selectScreen('tender')}>
                Tender
              </button>
              : 
              <button className='pos-menus-functions-btns pos-menus-functions-btns--default'
                disabled>
                Tender
              </button>
              }
            </div>
            <div className="pos-menus-screens">
              <button className='pos-menus-screens-btns pos-menus-screens-btns--default'
                onClick={() => this.selectScreen('food')}>
                Food
              </button>
              <button className='pos-menus-screens-btns pos-menus-screens-btns--default'
                onClick={() => this.selectScreen('drinks')}>
                Drinks
              </button>
            </div>
          </div>
          <div className="pos-order-screen">
            <div className="pos-order-screen-list">
              <div className="pos-order-screen-list-items">
                <table>
                  <tbody>
                    {order.map((item, i) => {
                      let selected = 'items'
                      if (i == currentSelected) selected = 'items items-selected'
                      return (
                        <tr key={i}
                          onClick={() => this.selectedItem(i, item.type)}
                          className={selected}>
                          {(item.size) ? <td>{item.size + ' ' + item.name}</td> : <td>{item.name}</td>}
                          <td>{item.price.toFixed(2)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <table className='pos-order-screen-list-total'>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td></td>
                    <td>{sub.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td></td>
                    <td> 7.75 %</td>
                  </tr>
                  {(returnedAmount < 0) ?
                    <tr className='final-total-under'>
                      <td>paid</td>
                      <td></td>
                      <td>(- {payment.toFixed(2)})</td>
                    </tr>
                    : 
                    <tr className='final-total'>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  }
                  <tr className='final-total'>
                    <td>TOTAL DUE</td>
                    <td>$</td>
                    <td>{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="pos-order-screen-voids">
                <button className='pos-order-screen-voids-btns void'
                  onClick={this.removeItem}>
                  Void Item
                </button>
                <button className='pos-order-screen-voids-btns cancel'
                  onClick={() => this.openModal('cancel')}>
                  Cancel
                </button>
                {(currentOrder.length < 1 ) ? 
                <button className='pos-order-screen-voids-btns save' 
                  onClick= {() => this.selectScreen('orders')}>
                Find Order
                </button>
                :
                <button className='pos-order-screen-voids-btns save' 
                  onClick= {() => this.openModal('save')}>
                  Save Order
                </button>
                }
              </div>
            </div>
            <div className='side-screen'>
              {(currentScreen === 'drinks') && <DrinksScreen />}
              {(currentScreen === 'tender') && <TenderScreen />}
              {(currentScreen === 'food') && <FoodScreen />}
              {(currentScreen === 'orders') && <SavedOrders />}
            </div>

          </div>          
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    currentScreen: state.posCalc.currentScreen,
    currentOrder: state.posCalc.currentOrder,
    currentSelected: state.posCalc.currentSelected,
    subTotal: state.posCalc.subTotal,
    orderTotal: state.posCalc.orderTotal,
    posModalIsOpen: state.posCalc.posModalIsOpen,
    modalType: state.posCalc.modalType,
    savedOrders: state.posCalc.savedOrders,
    returnedAmount: state.posCalc.returnedAmount,
    payment: state.posCalc.payment    
  }
}

export default connect(mapStateToProps)(App);


