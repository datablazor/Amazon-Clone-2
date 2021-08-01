function getItems() {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((item) => {
        items.push({
          id: item.id,
          image: item.data().image,
          name: item.data().name,
          make: item.data().make,
          rating: item.data().rating,
          price: item.data().price,
        });
      });
      generateItems(items);
    });
}

function addToCart(item) {
  let cartItem = db.collection("cart-item").doc(item.id);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      cartItem.update({
        quantity: doc.data().quantity + 1,
      });
    } else {
      cartItem.set({
        image: item.image,
        make: item.make,
        name: item.name,
        rating: item.rating,
        price: item.price,
        quantity: 1,
      });
    }
  });
}

function generateItems(items) {
  items.forEach((item) => {
    let doc = document.createElement("div");
    doc.classList.add("main-product", "mr-5");
    doc.innerHTML = `
    <div class="product-image w-48 h-52 bg-white rounded-lg p-4">
          <img class="w-full h-full object-contain"
              src="${item.image}" />
      </div>
      <div class="product-name text-gray-700 font-bold mt-2 text-sm">${
        item.name
      }
      </div>
      <div class="product-make text-green-700 font-bold">${item.make}
      </div>
      <div class="product-rating text-yellow-300 font-bold my-1">⭐⭐⭐⭐⭐ ${
        item.rating
      }
      </div>
      <div class="product-price font-bold text-gray-700 text-lg"> ${numeral(
        item.price
      ).format("$0,0.00")}
      </div>
    `;
    let addToCartEl = document.createElement("div");
    addToCartEl.classList.add(
      "hover:bg-yellow-600",
      "add-to-cart",
      "h-8",
      "mt-2",
      "w-28",
      "flex",
      "items-center",
      "justify-center",
      "bg-yellow-500",
      "rounded",
      "text-white",
      "text-md",
      "cursor-pointer"
    );
    addToCartEl.innerText = "Add to Cart";
    addToCartEl.addEventListener("click", function () {
      addToCart(item);
    });
    doc.appendChild(addToCartEl);
    document.querySelector(".main-section-products").appendChild(doc);
  });
}
getItems();
