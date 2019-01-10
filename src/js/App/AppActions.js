import axios from 'axios';

export function getMenu() {
  const getAllItems = axios.get('/menu');
  return (dispatch) => {
    dispatch({
      type: 'GET_MENU',
      payload: getAllItems.then((res) => {
        return res.data
      })
    })
  }
}

export function changeScreen(screen) {
  return {
    type: 'CURRENT_SCREEN',
    payload: screen
  }
}

function getDrinkPrice(obj, item, size) {
  obj.name = item.name;
  obj.size = size;
  obj.sizes = { 'tall': item.tall, 'grande': item.grande, 'venti': item.venti };
  let keys = Object.keys(item);
  keys.forEach((key) => {
    if (key == size) {
      obj.price = item[key]
    }
  })
  return obj;
};

export function addItem(currentOrder, item, type, size) {  
  let orderLength = currentOrder.length;
  let arr = [];
  let obj = {};
  let subTotal = 0;
  let tax, addTotal;
  let total = 0;
  if (orderLength > 0) {
    arr = currentOrder.slice();
    obj.key = orderLength;
    if (size) {
      getDrinkPrice(obj, item, size);
    } else {
      obj.price = item.price;
      obj.name = item.name;
      obj.price = item.price;
    }
    obj.type = type
    arr.push(obj);
    addTotal = getTotal(arr)
  } else {
    if (size) {
      getDrinkPrice(obj, item, size);
      subTotal = obj.price;
    } else {
      obj.price = item.price;
      obj.name = item.name;
    }
    obj.key = 0;
    obj.type = type
    arr.push(obj);
    addTotal = getTotal(arr);    
  }

  return {
    type: "ADD_ITEM",
    payload: { order: arr, currentSelected: orderLength, subTotal: addTotal.subTotal, total: addTotal.total }
  }
}

function getTotal(arr) {
  let subTotal = 0;
  let total = 0;
  let tax;
  for (let i = 0; i < arr.length; i++) {
    subTotal = arr[i].price + subTotal;
  }
  tax = subTotal * .0775;
  total = tax + subTotal;
  return { subTotal, total }
}

export function changeSize(size, order, selected) {    
  let arr = order.map((item) => {
    let price;
    if (item == order[selected]) {          
      price = item.sizes[size]
      return {
        ...item,   
        price: price,      
        size: size,        
      }
    }
    return item
  })
  let editTotal = getTotal(arr);
  return {
    type: "CHANGE_SIZE",
    payload: { size: size, currentOrder: arr, subTotal: editTotal.subTotal, total: editTotal.total}
  }
}

export function selected(key, type, currentOrder) {  
  let size = currentOrder[key].size
  return {
    type: 'SELECTED_ITEM',
    payload: { selected: key, currentScreen: type, drinkSize: size }
  }
}

export function removeSelected(order, selected) {    
  let arr = order.filter(item => item.key !== selected
    )  
  let updatedArr = arr.map((item, i) => {
    return {
      ...item,
      key: i
    }
  })  
  let editTotal = getTotal(updatedArr);  
  return {
    type: 'REMOVED_ITEM',
    payload: { order: updatedArr, subTotal: editTotal.subTotal, total: editTotal.total, selected: arr.length, currentScreen: 'drinks'}
  }
}

export function cancelOrder() {
  let arr = [];
  return {
    type: 'CANCEL_ORDER',
    payload: { order : arr, subTotal: 0, total: 0, modalIsOpen: false, currentScreen: 'drinks'}
  }
}

export function modalPosOpen(modal) {  
  return {
    type: 'OPEN_POS_MODAL',
    payload: {openModal: true, modalType: modal }
  }
}

export function modalPosClose() {
  return {
    type: 'CLOSE_POS_MODAL',
    payload: false
  }
}
export function modalTenderClose() {
  return {
    type: 'CLOSE_TENDER_MODAL',
    payload: {tenderModal: false, currentOrder: [], currentScreen: 'drinks', subTotal: 0, total: 0}
  }
}

export function saveOrder(order, orderTotal, savedOrders) {  
  let copy = order.slice();
  let obj = {};
  let arr = savedOrders.slice();
  obj.name = '$' + orderTotal.toFixed(2);
  copy.unshift(obj);
  arr.unshift(copy);     
  
  return {
    type: 'SAVE_ORDER',
    payload: {savedOrders: arr, modalIsOpen: false, currentOrder: [], orderTotal: 0, subTotal: 0}
  }
}

export function openOrder(order, savedOrders, key) { 
  let copy = order.slice();
  let saved = savedOrders.slice();
  saved.splice(key, 1);    
  copy.shift()
  let addTotal = getTotal(copy);
  let type = copy[copy.length -1].type;  
  return {
    type: 'OPEN_ORDER', 
    payload : { currentOrder: copy, subTotal: addTotal.subTotal, total: addTotal.total, currentScreen: type, savedOrders: saved }
  }
}

export function calculateOrder(payment, total) {
  let orderTotal = total;
  let returnedAmount = payment - orderTotal;
  let modal, leftover, paid;
  if (returnedAmount < 0) {
    modal = false;
    leftover = returnedAmount * -1
    paid = payment
  } else {
    modal = true;
    paid = payment
  }  

  return {
    type: 'CALCULATE_ORDER',
    payload: { returnedAmount: returnedAmount, tenderModalIsOpen: modal, payment: paid, inputBox: ['', '.', '', '' ], total: leftover }
  }
}

export function inputDigit(digit, inputBox) {  
  const copy = inputBox.slice();
  if (digit == '0 0') {
    copy.push(0)
    copy.push(0)
    copy.reverse();
    let p = copy[4]
    copy[4] = copy[3]
    copy[3] = copy[2];
    copy[2] = p;
    copy.reverse();
  } else {
    copy.push(digit)  
    copy.reverse();
    let p = copy[3]
    copy[3] = copy[2]
    copy[2] = p;
    copy.reverse();  
  }
  let returned = copy.toString().replace(/,/g, '')  
  returned = Number(returned);
  return {
    type: 'ADD_DIGIT',
    payload: { inputBox: copy, payment: returned  }
  }
}