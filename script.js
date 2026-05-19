
let product = JSON.parse(localStorage.getItem("product"));

if(product){

    const name = document.getElementById("name");
    const price = document.getElementById("price");
    const mainImage = document.getElementById("mainImage");
    const thumb1 = document.getElementById("thumb1");
    const thumb2 = document.getElementById("thumb2");
    const thumb3 = document.getElementById("thumb3");

    if(name) name.innerText = product.name;

    if(price) price.innerText = "₹" + product.price;

    if(mainImage) mainImage.src = product.image;

    if(thumb1) thumb1.src = product.image;

    if(thumb2) thumb2.src = product.image;

    if(thumb3) thumb3.src = product.image;
}

updateProductCount();

let count = 0;

function addToCart(name, price, image){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

   let existing = cart.find( item => item.name === name);

   if(existing){
    existing.qty += 1;
   } else {
    cart.push({
        name: name,
        price: price,
        image: image,
        qty:1
    });
   }

    localStorage.setItem("cart", JSON.stringify(cart));

     const cartCount = document.getElementById("cartCount");
     if(cartCount){
        cartCount.innerText = cart.length;
     }

    showToast("Added to Cart!");

    const floatingCount = document.getElementById("floatingCount");
    if(floatingCount){
        floatingCount.innerText = cart.length;
    }
}

function goToCart(){

    window.location.href = "cart.html";

}

function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems = document.getElementById("cartItems");
    if(!cartItems) return;

    let total = 0;

    cartItems.innerHTML = "";

    if(cart.length === 0){

    cartItems.innerHTML = `
    <div class="empty-cart">
        <h2>Your Cart is Empty 🛒</h2>
        <p>Add products to continue shopping.</p>
    </div>
    `;

}

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        cartItems.innerHTML += `

        <div class="cart-card">

            <img src="${item.image}" class="cart-img">

            <div class="cart-details">

                <h2>${item.name}</h2>

                <p>₹${item.price}</p>

                <div class="qty-box">

                    <button onclick="changeQty(${index},-1)">-</button>

                    <span>${item.qty}</span>

                    <button onclick="changeQty(${index},1)">+</button>

                </div>

                <button class="remove-btn"
                onclick="removeItem(${index})">
                Remove
                </button>

            </div>

        </div>
        `;
    });

    const totalBox = document.getElementById("total");

    if(totalBox){
        totalBox.innerText = total;
    }
}

function changeQty(index,change){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty += change;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    localStorage.setItem("cart",JSON.stringify(cart));

    loadCart();
}

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    loadCart();
}

function checkout(){
    window.location.href = "checkout.html";
}

loadCart();
   

function toggleHeart(icon){
    icon.classList.toggle("active");

    if(icon.style.color == "red"){
        icon.style.color = "black";
    } else {
        icon.style.color = "red";
    }
}

function searchProduct(){

    let input =
    document.getElementById("search").value.toLowerCase();

    let cards =
    document.querySelectorAll(".card");

    let found = false;

    cards.forEach(card=>{

        let name =
        card.querySelector("h3").innerText.toLowerCase();

        if(name.includes(input)){
            card.style.display = "block";
            found = true;
        }
        else{
            card.style.display = "none";
        }

    });

    let message =
    document.getElementById("notFound");

    if(!found){
        message.style.display = "block";
    }
    else{
        message.style.display = "none";
    }

}

function showToast(message){
    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i>
    <span>${message}</span>
    `;

    toast.classList.add("show");

    clearTimeout(toast.timeout);

    toast.timeout = setTimeout(() =>{
        toast.classList.remove("show");
    }, 2200);
    
}

function filterCategory(category){

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        if(category === "all" || card.dataset.category.includes(category)){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }

    });

    // Active category highlight
    document.querySelectorAll(".cat").forEach(cat=>{
        cat.classList.remove("active");
    });

    event.currentTarget.classList.add("active");

    updateProductCount();
}

function addToWishlist(icon, name, price, image){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let existing = wishlist.find(item => item.name === name);

    if(existing){
        showToast("Already in Wishlist ❤️");
        return;
    }

    wishlist.push({
        name:name,
        price:price,
        image:image
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    icon.classList.add("active");

    showToast("Added to Wishlist ❤️");

    
    const floatingWishlist = 
    document.getElementById("floatingWishlistCount");

    if(floatingWishlist){
        floatingWishlist.innerText = wishlist.length;
    }

    updateWishlistCount();
}





function showToastWishlist(){
    let toast = document.getElementById("toast");

    toast.innerText = 
    "Added to Wishlist ❤️";

    toast.style.opacity = "1";

    setTimeout(()=>{
        toast.style.opacity = "0";
    },2000);
}

function goToWishlist(){
    window.location.href = 'wishlist.html';
}

function buyNow(name, price){
    let cart = [{
        name: name,
        price: price,
        qty: 1
    }];

    localStorage.setItem("cart", JSON.stringify(cart));
    
}

function buyNowFromPage(){
    openPayment();
}

function changeImage(src){

    document.getElementById("mainImage").src = src;


}

function selectSize(size){
    let allSizes = document.querySelectorAll(".size-options span");
    allSizes.forEach(s => s.classList.remove("active-size"));
    size.classList.add("active-size");
}

function selectColor(color){

    let colors =
    document.querySelectorAll(".color");

    colors.forEach(c =>
    c.classList.remove("active-color"));

    color.classList.add("active-color");
}

function checkDelivery(){

    let pin =
    document.getElementById("pincode").value;

    let msg =
    document.getElementById("deliveryMessage");

    if(pin.length === 6){

        msg.innerText =
        "Delivery Available 🚚";

        msg.style.color = "green";

    }else{

        msg.innerText =
        "Invalid Pincode ❌";

        msg.style.color = "red";
    }
}

function openLogin(){
    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin(){
    document.getElementById("loginModal").style.display = "none";
}

function openPayment(){
    document.getElementById("paymentSection").style.display = "block";

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}



function placeOrder(){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    let orders =
    JSON.parse(localStorage.getItem("orders")) || [];

    cart.forEach(item => {

        let orderId = 
        "SHOPX" + Math.floor(Math.random()*1000000);

        orders.unshift({
            id: orderId,
            name: item.name,
            price: item.price,
            image: item.image,
            qty: item.qty

        });

    });

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    localStorage.removeItem("cart");

    document.getElementById("successPopup")
    .style.display = "flex";
}



function closeSuccess(){
    document.getElementById("successPopup").style.display = "none";

    window.location.href = "index.html";
}

window.onload = ()=>{

    setTimeout(()=>{

        document.getElementById("loader").style.display = "none";

    },1000);

}

function applyCoupon(){

    let code =
    document.getElementById("coupon").value;

    if(code === "SHOPX50"){

        showToast("Coupon Applied 🎉");

    }else{

        showToast("Invalid Coupon ❌");
    }
}


function sortProducts(type){

    let products =
    document.querySelector(".products");

    let cards =
    Array.from(document.querySelectorAll(".card"));

    cards.sort((a,b)=>{

        let priceA =
        parseInt(
            a.querySelector("p")
            .innerText.replace("₹","")
        );

        let priceB =
        parseInt(
            b.querySelector("p")
            .innerText.replace("₹","")
        );

        if(type === "low"){

            return priceA - priceB;
        }

        if(type === "high"){

            return priceB - priceA;
        }

    });

    products.innerHTML = "";

    cards.forEach(card=>{

        products.appendChild(card);

    });

}

function showSuccess(){

    document.getElementById("successPopup")
    .style.display = "flex";
}

function closeSuccess(){

    document.getElementById("successPopup")
    .style.display = "none";
}

function updateProductCount(){

    let visibleProducts = document.querySelectorAll(".card");

    let count = 0;

    visibleProducts.forEach(card=>{

        if(card.style.display !== "none"){
            count++;
        }

    });

    document.getElementById("productCount").innerText =
    count + " Products Available";
}

window.onscroll = function(){

    if(document.documentElement.scrollTop > 300){
        document.getElementById("topBtn").style.display = "block";
    }
    else{
        document.getElementById("topBtn").style.display = "none";
    }

}

window.onscroll = function(){

    let btn =
    document.getElementById("topBtn");

    if(document.documentElement.scrollTop > 300){
        btn.style.display = "block";
    }
    else{
        btn.style.display = "none";
    }
}


function updateWishlistCount(){

    let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

    const wishlistCount = 
    document.getElementById("wishlistCount");

    if(wishlistCount){
        wishlistCount.innerText = wishlist.length;
    }
}

updateWishlistCount();

function scrollToProducts(){

    document
    .getElementById("productsSection")
    .scrollIntoView({
        behavior:"smooth"
    });

}

function viewProduct(name, price, image){

    let productData = {

        name: name,
        price: price,
        image: image

    };



    // Fashion Products
    if(name === "T-Shirt"){

        productData.options = {
            title: "Select Size",
            values: ["S", "M", "L", "XL"]
        };

    }

    else if(name === "Men Kurta"){

        productData.options = {
            title: "Select Size",
            values: ["M", "L", "XL", "XXL"]
        };

    }

    else if(name === "Kurta"){

        productData.options = {
            title: "Select Size",
            values: ["S", "M", "L", "XL"]
        };

    }

    else if(name === "Saree"){

        productData.options = {
            title: "Select Fabric",
            values: ["Cotton", "Silk", "Georgette"]
        };

    }

    else if(name === "Midy Dress"){

        productData.options = {
            title: "Select Size",
            values: ["S", "M", "L"]
        };

    }

    else if(name === "Hand Bag"){

        productData.options = {
            title: "Select Type",
            values: ["Leather", "Party Wear", "Casual"]
        };

    }



    // Electronics Products
    else if(name === "Mobile"){

        productData.options = {
            title: "Select Variant",
            values: ["128GB", "256GB", "512GB"]
        };

    }

    else if(name === "Headphone"){

        productData.options = {
            title: "Select Type",
            values: ["Wireless", "Gaming", "Bluetooth"]
        };

    }

    else if(name === "Smart Watch"){

        productData.options = {
            title: "Select Strap",
            values: ["Black", "Silver", "Blue"]
        };

    }

    else if(name === "Wireless Keyboard"){

        productData.options = {
            title: "Select Type",
            values: ["Gaming", "Office", "Bluetooth"]
        };

    }

    else if(name === "Hair Dryer"){

        productData.options = {
            title: "Select Power",
            values: ["1200W", "1800W", "2200W"]
        };

    }



    // Beauty Products
    else if(name === "Lipstick"){

        productData.options = {
            title: "Select Shade",
            values: ["Nude", "Pink", "Red"]
        };

    }

    else if(name === "Foundation"){

        productData.options = {
            title: "Select Shade",
            values: ["Light", "Medium", "Dark"]
        };

    }

    else if(name === "Serum"){

        productData.options = {
            title: "Select Size",
            values: ["30ml", "50ml", "100ml"]
        };

    }

    else if(name === "Face Wash"){

        productData.options = {
            title: "Select Size",
            values: ["50ml", "100ml", "150ml"]
        };

    }

    else if(name === "Perfume"){

        productData.options = {
            title: "Select Fragrance",
            values: ["Rose", "Oud", "Vanilla"]
        };

    }



    // Home Products
    else if(name === "Sofa"){

        productData.options = {
            title: "Select Size",
            values: ["2 Seater", "3 Seater", "5 Seater"]
        };

    }

    else if(name === "Chair"){

        productData.options = {
            title: "Select Material",
            values: ["Wood", "Plastic", "Metal"]
        };

    }

    else if(name === "Lamp"){

        productData.options = {
            title: "Select Light",
            values: ["Warm", "Cool", "RGB"]
        };

    }

    else if(name === "Plant"){

        productData.options = {
            title: "Select Pot",
            values: ["White", "Black", "Brown"]
        };

    }

    else if(name === "Curtains"){

        productData.options = {
            title: "Select Size",
            values: ["5ft", "7ft", "9ft"]
        };

    }



    // Kids Products
    else if(name === "Toy Car"){

        productData.options = {
            title: "Select Color",
            values: ["Red", "Blue", "Yellow"]
        };

    }

    else if(name === "Teddy Bear"){

        productData.options = {
            title: "Select Size",
            values: ["Small", "Medium", "Large"]
        };

    }

    else if(name === "Kids Dress"){

        productData.options = {
            title: "Select Size",
            values: ["2-3Y", "4-5Y", "6-7Y"]
        };

    }

    else if(name === "Kids Shoes"){

        productData.options = {
            title: "Select Size",
            values: ["5", "6", "7", "8"]
        };

    }

    else if(name === "School Bag"){

        productData.options = {
            title: "Select Type",
            values: ["Small", "Medium", "Large"]
        };

    }



    localStorage.setItem(
        "selectedProduct",
        JSON.stringify(productData)
    );

    window.location.href = "product.html";
}

function buyNow(name, price, image){

let cart = [];

cart.push({
name:name,
price:price,
image:image,
qty:1
});

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

window.location.href = "checkout.html";

}

function scrollToProducts(){

    document
    .getElementById("products")
    .scrollIntoView({
        behavior:"smooth"
    });

}

let selectorHTML = "";

if(product.category === "fashion"){

    selectorHTML = `

    <div class="sizes">

        <h3>Select Size</h3>

        <div class="size-options">

            <span onclick="selectSize(this)">S</span>
            <span onclick="selectSize(this)">M</span>
            <span onclick="selectSize(this)">L</span>
            <span onclick="selectSize(this)">XL</span>

        </div>

    </div>

    `;

}

else if(product.category === "electronics"){

    selectorHTML = `

    <div class="sizes">

        <h3>Select Variant</h3>

        <div class="size-options">

            <span onclick="selectSize(this)">128GB</span>
            <span onclick="selectSize(this)">256GB</span>
            <span onclick="selectSize(this)">512GB</span>

        </div>

    </div>

    `;

}

else if(product.category === "headphones"){

    selectorHTML = `

    <div class="sizes">

        <h3>Select Type</h3>

        <div class="size-options">

            <span onclick="selectSize(this)">Wireless</span>
            <span onclick="selectSize(this)">Gaming</span>
            <span onclick="selectSize(this)">Bluetooth</span>

        </div>

    </div>

    `;

}

else if(product.category === "beauty"){

    selectorHTML = `

    <div class="sizes">

        <h3>Select Shade</h3>

        <div class="size-options">

            <span onclick="selectSize(this)">Nude</span>
            <span onclick="selectSize(this)">Pink</span>
            <span onclick="selectSize(this)">Red</span>

        </div>

    </div>

    `;

}

document.getElementById("dynamicSelectors").innerHTML =
selectorHTML;


function goToOrders(){
    window.location.href = "orders.html";
}




document.getElementById("year").textContent = new Date().getFullYear();

