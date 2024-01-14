// const wrapper = document.querySelector(".sliderWrapper");
// const menuItems = document.querySelectorAll(".menuItem");

// const products = [
//   {
//     id: 1,
//     title: "Air Force",
//     price: 119,
//     colors: [
//       {
//         code: "black",
//         img: "./img/air.png",
//       },
//       {
//         code: "darkblue",
//         img: "./img/air2.png",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Air Jordan",
//     price: 149,
//     colors: [
//       {
//         code: "lightgray",
//         img: "./img/jordan.png",
//       },
//       {
//         code: "green",
//         img: "./img/jordan2.png",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "Blazer",
//     price: 109,
//     colors: [
//       {
//         code: "lightgray",
//         img: "./img/blazer.png",
//       },
//       {
//         code: "green",
//         img: "./img/blazer2.png",
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: "Crater",
//     price: 129,
//     colors: [
//       {
//         code: "black",
//         img: "./img/crater.png",
//       },
//       {
//         code: "lightgray",
//         img: "./img/crater2.png",
//       },
//     ],
//   },
//   {
//     id: 5,
//     title: "Hippie",
//     price: 99,
//     colors: [
//       {
//         code: "gray",
//         img: "./img/hippie.png",
//       },
//       {
//         code: "black",
//         img: "./img/hippie2.png",
//       },
//     ],
//   },
// ];

// let choosenProduct = products[0];

// const currentProductImg = document.querySelector(".productImg");
// const currentProductTitle = document.querySelector(".productTitle");
// const currentProductPrice = document.querySelector(".productPrice");
// const currentProductColors = document.querySelectorAll(".color");
// const currentProductSizes = document.querySelectorAll(".size");

// menuItems.forEach((item, index) => {
//   item.addEventListener("click", () => {
//     //change the current slide
//     wrapper.style.transform = `translateX(${-100 * index}vw)`;

//     //change the choosen product
//     choosenProduct = products[index];

//     //change texts of currentProduct
//     currentProductTitle.textContent = choosenProduct.title;
//     currentProductPrice.textContent = "$" + choosenProduct.price;
//     currentProductImg.src = choosenProduct.colors[0].img;

//     //assing new colors
//     currentProductColors.forEach((color, index) => {
//       color.style.backgroundColor = choosenProduct.colors[index].code;
//     });
//   });
// });

// currentProductColors.forEach((color, index) => {
//   color.addEventListener("click", () => {
//     currentProductImg.src = choosenProduct.colors[index].img;
//   });
// });

// currentProductSizes.forEach((size, index) => {
//   size.addEventListener("click", () => {
//     currentProductSizes.forEach((size) => {
//       size.style.backgroundColor = "white";
//       size.style.color = "black";
//     });
//     size.style.backgroundColor = "black";
//     size.style.color = "white";
//   });
// });

// const productButton = document.querySelector(".productButton");
// const payment = document.querySelector(".payment");
// const close = document.querySelector(".close");

// productButton.addEventListener("click", () => {
//   payment.style.display = "flex";
// });

// close.addEventListener("click", () => {
//   payment.style.display = "none";
// });

Date.now ||
  (Date.now = function () {
    return new Date().getTime();
  }),
  (function () {
    "use strict";
    for (
      var e = ["webkit", "moz"], t = 0;
      t < e.length && !window.requestAnimationFrame;
      ++t
    ) {
      var i = e[t];
      (window.requestAnimationFrame = window[i + "RequestAnimationFrame"]),
      (window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]);
    }
    if (
      /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) ||
      !window.requestAnimationFrame || 
      !window.cancelAnimationFrame
    ) {
      var n = 0;
      (window.requestAnimationFrame = function (e) {
          var t = Date.now(),
          i = Math.max(n + 16, t);
          return setTimeout(function () {
            e((n = i));
          }, i - t);
      }),
        (window.cancelAnimationFrame = clearTimeout);
      }
  })();


var snowFall = (function () {
  function e() {
    var e = {
      flakeCount: 35,
      flakeColor: "#ffffff",
      flakeIndex: 999999,
      flakePosition: "absolute",
      minSize: 1,
      maxSize: 2,
      minSpeed: 1,
      maxSpeed: 5,
      round: !1,
      shadow: !1,
      collection: !1,
      image: !1,
      collectionHeight: 40,
    },
    t = [],
    n = {},
    o = 0,
    s = 0,
    a = 0,
    r = 0,
    l = function (e, t) {
      for (var i in t) e.hasOwnProperty(i) && (e[i] = t[i]);
    },
    h = function (e, t) {
      (e.style.webkitTransform = t),
      (e.style.MozTransform = t),
      (e.style.msTransform = t),
      (e.style.OTransform = t),
      (e.style.transform = t);
    },
    m = function (e, t) {
      return Math.round(e + Math.random() * (t - e));
    },
    f = function (e, t) {
      for (var i in t)
        e.style[i] = t[i] + ("width" == i || "height" == i ? "px" : "");
    },
    d = function (t, i, n) {
      (this.x = m(a, s - a)),
      (this.y = m(0, o)),
      (this.size = i),
      (this.speed = n),
      (this.step = 0),
      (this.stepSize = m(1, 10) / 100),
      e.collection && (this.target = canvasCollection[ m(0, canvasCollection.length - 1)]);
      var r = null;
      e.image
      ? ((r = new Image()), (r.src = e.image))
      : ((r = document.createElement("div")),
      f(r, { background: e.flakeColor })),
      (r.className = "snowfall-flakes"),
      f(r, {
        width: this.size,
        height: this.size,
        position: e.flakePosition,
        top: 0,
        left: 0,
        "will-change": "transform",
        fontSize: 0,
        zIndex: e.flakeIndex,
      }),
      e.round &&
        f(r, {
          "-moz-border-radius": ~~e.maxSize + "px",
          "-webkit-border-radius": ~~e.maxSize + "px",
          borderRadius: ~~e.maxSize + "px",
        }),
      e.shadow &&
        f(r, {
          "-moz-box-shadow": "1px 1px 1px #555",
          "-webkit-box-shadow": "1px 1px 1px #555",
          boxShadow: "1px 1px 1px #555",
        }),
        t.tagName === document.body.tagName
        ? document.body.appendChild(r)
        : t.appendChild(r),
        (this.element = r),
        (this.update = function () {
          (this.y += this.speed),
          this.y > o - (this.size + 6) && this.reset(),
          h(
            this.element,
            "translateY(" + this.y + "px) translateX(" + this.x + "px)"
          ),
          (this.step += this.stepSize),
          (this.x += Math.cos(this.step)),
          (this.x + this.size > s - a || this.x < a) && this.reset();
        }),
        (this.reset = function () {
          (this.y = 0),
          (this.x = m(a, s - a)),
          (this.stepSize = m(1, 10) / 100),
          (this.size = m(100 * e.minSize, 100 * e.maxSize) / 100),
          (this.element.style.width = this.size + "px"),
          (this.element.style.height = this.size + "px"),
          (this.speed = m(e.minSpeed, e.maxSpeed));
        });
    },
            w = function () {
                for (var e = 0; e < t.length; e += 1) t[e].update();
                r = requestAnimationFrame(function () {
                    w();
                });
            };
        return {
            snow: function (r, h) {
                for (
                    l(e, h),
                        n = r,
                        o = n.offsetHeight,
                        s = n.offsetWidth,
                        n.snow = this,
                        "body" === n.tagName.toLowerCase() && (a = 25),
                        window.addEventListener(
                            "resize",
                            function () {
                                (o = n.clientHeight), (s = n.offsetWidth);
                            },
                            !0
                        ),
                        i = 0;
                    i < e.flakeCount;
                    i += 1
                )
                    t.push(
                        new d(
                            n,
                            m(100 * e.minSize, 100 * e.maxSize) / 100,
                            m(e.minSpeed, e.maxSpeed)
                        )
                    );
                w();
      },
      clear: function () {
        var e = null;
        e = n.getElementsByClassName
        ? n.getElementsByClassName("snowfall-flakes")
        : n.querySelectorAll(".snowfall-flakes");
        for (var t = e.length; t--; )
          e[t].parentNode === n && n.removeChild(e[t]);
        cancelAnimationFrame(r);
      },
    };
  }
  return {
      snow: function (t, i) {
      if ("string" == typeof i)
        if (t.length > 0)
          for (var n = 0; n < t.length; n++)
            t[n].snow && t[n].snow.clear();
        else t.snow.clear();
      else if (t.length > 0)
        for (var n = 0; n < t.length; n++) new e().snow(t[n], i);
      else new e().snow(t, i);
    },
  };
})();

// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Start when the document is ready
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== START ====================
function start() {
  addEvents();
}

// ============= UPDATE & RERENDER ===========
function update() {
  addEvents();
  updateTotal();
}

// =============== ADD EVENTS ===============
function addEvents() {
  // Remove items from cart
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Change item quantity
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Add item to cart
  let addCart_btns = document.querySelectorAll(".add-cart");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Buy Order
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= HANDLE EVENTS FUNCTIONS =============
let itemsAdded = [];

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".product-title").innerHTML;
  let price = product.querySelector(".product-price").innerHTML;
  let imgSrc = product.querySelector(".product-img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // handle item is already exist
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("This Item Is Already Exist!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // to keep it integer

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("There is No Order to Place Yet! \nPlease Make an Order first.");
    return;
  }
  const cartContent = cart.querySelector(".cart-content");
  cartContent.innerHTML = "";
  alert("Your Order is Placed Successfully :)");
  itemsAdded = [];

  update();
}

// =========== UPDATE & RERENDER FUNCTIONS =========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = cart.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // keep 2 digits after the decimal point
  total = total.toFixed(2);
  // or you can use also
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "$" + total;
}

// ============= HTML COMPONENTS =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVE CART  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

const products = [
  {
   id: 0,
   name: 'Black Mask & White Goggles',
   price: 80.00,
   image: "./img/Mask1.png",
  },
  {
    id: 2,
    name: 'Black Mask & Purple Goggles',
    price: 80.00,
    image: "./img/Mask2.png",
   },
];



document.addEventListener('DOMContentLoaded', function() {
  const productId = params.get('id');
  
  // Example: Fetch product data based on productId
  // Replace with your method of fetching product data
  const productData = products[productId];

  // Update page content
  document.getElementById('productImage').src = productData.image;
  document.getElementById('productName').textContent = String(productData.price);
  document.getElementById('productPrice').textContent = productData.price;
  // document.getElementById('productDescription').textContent = productData.description;
});
