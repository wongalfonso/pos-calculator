const defaultState = {
  coffees: [],
  breakfast: [],
  bakery: [],
  currentScreen: 'drinks',
  currentOrder: [],
  currentSelected: 0,  
  orderTotal: 0,
  savedOrders: [],
  subTotal: 0,
  drinkSize: 'grande',
  sizes: ['tall', 'grande', 'venti'],
  tenderModalIsOpen: false,
  posModalIsOpen: false,
  modalType: '',
  returnedAmount: 0,
  inputBox: ['', '.', '', '' ],
  payment: 0,
  previousPaid: 0
};

export default function PosReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case 'GET_MENU_FULFILLED': {      
      return {
        ...state, coffees: payload.coffees[0], breakfast: payload.food[0].breakfast, bakery: payload.food[1].bakery
      }
    }
    case 'CURRENT_SCREEN': {         
      return {
        ...state, currentScreen: payload
      }
    }
    case 'ADD_ITEM' : {          
      return {
        ...state, currentOrder: payload.order, currentSelected: payload.currentSelected, subTotal: payload.subTotal, orderTotal: payload.total
      }
    }    
    case 'CHANGE_SIZE': {
      return {
        ...state, drinkSize: payload.size, currentOrder: payload.currentOrder, subTotal: payload.subTotal, orderTotal: payload.total
      }
    }
    case 'SELECTED_ITEM' : {
      return {
        ...state, currentSelected: payload.selected, currentScreen: payload.currentScreen, drinkSize: payload.drinkSize
      }
    }
    case 'REMOVED_ITEM' : {
      return {
        ...state, currentOrder: payload.order, subTotal: payload.subTotal, orderTotal: payload.total, currentSelected: payload.selected, currentScreen: payload.currentScreen
      }
    }
    case 'CANCEL_ORDER' : {
      return {
        ...state, currentOrder: payload.order, subTotal: payload.subTotal, orderTotal: payload.total, posModalIsOpen: payload.modalIsOpen, currentScreen: payload.currentScreen
      }
    }
    case 'OPEN_POS_MODAL' : {
      
      return {
        ...state, posModalIsOpen: payload.openModal, modalType: payload.modalType
      }
    }
    case 'CLOSE_POS_MODAL' : {
      return {
        ...state, posModalIsOpen: payload
      }
    }
    case 'CLOSE_TENDER_MODAL' : {
      return {
        ...state, tenderModalIsOpen: payload.tenderModal, currentOrder: payload.currentOrder, currentScreen: payload.currentScreen, subTotal: payload.subTotal, orderTotal: payload.total
      }
    }
    case 'SAVE_ORDER' : {
      return {
        ...state, posModalIsOpen: payload.modalIsOpen, savedOrders: payload.savedOrders, currentOrder: payload.currentOrder, orderTotal: payload.orderTotal, subTotal: payload.subTotal
      }
    }
    case 'OPEN_ORDER' : {
      return {
        ...state, currentOrder: payload.currentOrder, subTotal: payload.subTotal, orderTotal: payload.total, currentScreen: payload.currentScreen, savedOrders: payload.savedOrders
      }
    }
    case 'CALCULATE_ORDER' : {
      return {
        ...state, returnedAmount: payload.returnedAmount, tenderModalIsOpen: payload.tenderModalIsOpen, payment: payload.payment, inputBox: payload.inputBox, orderTotal: payload.total
      }
    }
    case 'ADD_DIGIT' : {      
      return {
        ...state, inputBox: payload.inputBox, payment: payload.payment
      }
    }
    default: {
      return state;
    }
  }
}