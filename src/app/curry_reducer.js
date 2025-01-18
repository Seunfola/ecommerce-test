const isSameItem = (item1) => (item2) => item1.id === item2.id;

const calculateTotal = (price) => (quantity) => price * quantity;

const getTotalPrice = (cart, newItem) => {
  const itemExists = cart.some((item) => isSameItem(item)(newItem));

  return itemExists
    ? calculateTotal(newItem.price)(newItem.quantity)
    : cart.reduce((total, item) => total + calculateTotal(item.price)(item.quantity), 0);
};

//reducer method

const getTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};