function getCartItems() {
  db.collection("cart-items").onSnapshot((snapshot) => {
    let totalCount = 0;
    snapshot.forEach((doc) => {
      totalCount += doc.data().quantity;
    });
    setCartCounter(totalCount);
  });

  onSnapshot();
}

function setCartCounter(totalCount) {
  document.querySelector(".cart-item-number").innerText = totalCount;
}

getCartItems();
