import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import twenty from './../../../public/images/twenty-dollar-bill.jpg'
import ten from './../../../public/images/ten-dollar-bill.jpg';
import five from './../../../public/images/five-dollar-bill.jpg';
import { modalTenderClose, calculateOrder, inputDigit } from './AppActions';

const modalStyle = {
  overlay: {
    zIndex: 199
  }
}


class TenderScreen extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.calculate = this.calculate.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  closeModal() {
    const { dispatch } = this.props;
    dispatch(modalTenderClose());
  }

  calculate(payment) {
    const { dispatch, total } = this.props;
    payment = Number(payment)
    dispatch(calculateOrder(payment, total))
  }
  addDigit(digit) {
    const { dispatch, inputBox } = this.props;
    dispatch(inputDigit(digit, inputBox))
  }

  render() {
    const { total, tenderModalIsOpen, returnedAmount, inputBox, payment } = this.props;   
    let checkTotal = total;
    if (checkTotal == undefined) {checkTotal = 0;}  
    return (
      <div className="tender-screen">
        <Modal
          isOpen={tenderModalIsOpen}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          style={modalStyle}
          className={'ReactModal_TENDER'}
        >
          <div className='tender-modal'>
            <div className='tender-modal-message'>
              $ {returnedAmount.toFixed(2)}
            </div>
            <div className='tender-modal-btns'>
              <button onClick={this.closeModal}
                className='tender-modal-btns-exit'>
                Exit
          </button>
            </div>
          </div>
        </Modal>
        <div className="tender-screen-cash">
          <div className="tender-screen-cash-header">
            <b><i>Quick Cash</i></b>
          </div>
          <img src={twenty} className='tender-screen-cash-bills'
            onClick={() => this.calculate(20)} />
          <img src={ten} className="tender-screen-cash-bills"
            onClick={() => this.calculate(10)} />
          <img src={five} className="tender-screen-cash-bills"
            onClick={() => this.calculate(5)} />

          <div className="tender-screen-cash-btns">
            <button className='round-up'
              onClick={() => this.calculate(Math.ceil(checkTotal))}>
              $ {Math.ceil(checkTotal).toFixed(2)}
            </button>
          </div>
          <div className="tender-screen-cash-btns">
            <button className='exact' onClick={() => this.calculate(payment)}>
              Cash
            </button>
          </div>
        </div>
        <div className="tender-screen-inputs">
          <div className="tender-screen-inputs-total">
            <div>$</div>
            <div className='total-input-screen'>
              {inputBox.map((digit, i) => {
                return (
                  <span key = {i}>
                    {digit}
                  </span>
                )
              })}
            </div>
          </div>
          <div className="tender-screen-inputs-row">
            <div className="tender-screen-inputs-row-btns">
              <button onClick = {() => this.addDigit(1)}>1</button>
            </div>
            <div className="tender-screen-inputs-row-btns">
              <button onClick = {() => this.addDigit(2)}>2</button>
            </div>
            <div className="tender-screen-inputs-row-btns">
              <button onClick = {() => this.addDigit(3)}>3</button>
            </div>
          </div>
          <div className="tender-screen-inputs-row">
            <div className="tender-screen-inputs-row-btns">
              <button onClick = {() => this.addDigit(4)}>4</button>
            </div>
            <div className="tender-screen-inputs-row-btns">
              <button onClick = {() => this.addDigit(5)}>5</button>
            </div>
            <div className="tender-screen-inputs-row-btns">
              <button onClick = {() => this.addDigit(6)}>6</button>
            </div>
          </div>
          <div className="tender-screen-inputs-row">
            <div className="tender-screen-inputs-row-btns">
              <button onClick = {() => this.addDigit(7)}>7</button>
            </div>
            <div className="tender-screen-inputs-row-btns">
              <button onClick = {() => this.addDigit(8)}>8</button>
            </div>
            <div className="tender-screen-inputs-row-btns">
              <button onClick = {() => this.addDigit(9)}>9</button>
            </div>
          </div>
          <div className="tender-screen-inputs-row">
            <div className="tender-screen-inputs-row-btns">
            {(inputBox[inputBox.length -1 ] === '') ? 
              <button disabled>0</button>
              : 
              <button onClick = {() => this.addDigit(0)}>0</button>
              }
            </div>
            <div className="tender-screen-inputs-row-btns">
              {(inputBox[inputBox.length -1 ] === '') ? 
              <button disabled>00</button>
              : 
              <button onClick = {() => this.addDigit('0 0')}>00</button>
              }
            </div>
          </div>
          <div className="tender-screen-inputs-row">
            <div className="tender-screen-inputs-row-btns">
              
              <button onClick = {() => this.calculate(total)}>
              Exact Tender
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    total: state.posCalc.orderTotal,
    returnedAmount: state.posCalc.returnedAmount,
    tenderModalIsOpen: state.posCalc.tenderModalIsOpen,
    inputBox: state.posCalc.inputBox,
    payment: state.posCalc.payment
  }
}

export default connect(mapStateToProps)(TenderScreen);