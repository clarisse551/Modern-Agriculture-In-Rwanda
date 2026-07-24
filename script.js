/* ==========================================
   MODERN AGRICULTURE IN RWANDA
   SCRIPT.JS VERSION 2 - PART 1
========================================== */

/* ========= VARIABLES ========= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* ========= ADD TO CART ========= */

function addToCart(name, price){

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    alert(name + " added to cart successfully.");

}

/* ========= UPDATE CART ========= */

function updateCart(){

    const cartItems = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");

    if(!cartItems || !total) return;

    cartItems.innerHTML = "";

    let grandTotal = 0;

    if(cart.length === 0){

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        total.innerHTML = "0 RWF";

        return;

    }

    cart.forEach((item,index)=>{

        grandTotal += item.price;

        cartItems.innerHTML += `

        <div class="cart-item">

            <h4>${item.name}</h4>

            <p>${item.price.toLocaleString()} RWF</p>

            <button onclick="removeCartItem(${index})">

            Remove

            </button>

        </div>

        `;

    });

    total.innerHTML = grandTotal.toLocaleString() + " RWF";

}

/* ========= REMOVE ITEM ========= */

function removeCartItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}

/* ========= OPEN CART ========= */

function openCart(){

    document
    .getElementById("cartSidebar")
    .classList
    .add("active");

}

/* ========= CLOSE CART ========= */

function closeCart(){

    document
    .getElementById("cartSidebar")
    .classList
    .remove("active");

}

/* ========= CHECKOUT ========= */

function checkout(){

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    alert("Checkout completed successfully.");

    cart=[];

    localStorage.removeItem("cart");

    updateCart();

}

/* ========= SEARCH PRODUCTS ========= */

const search=document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const products=document.querySelectorAll(".product-card");

products.forEach(product=>{

const title=product.querySelector("h3")
.textContent.toLowerCase();

if(title.includes(value)){

product.style.display="block";

}else{

product.style.display="none";

}

});

});

}

/* ========= WISHLIST ========= */

function addToWishlist(product){

    wishlist.push(product);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert(product+" added to wishlist.");

}

/* ========= PAGE LOAD ========= */

window.onload=function(){

updateCart();

}
/* ==========================================
   LOGIN, REGISTER & USER MANAGEMENT
========================================== */

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

/* ========= OPEN LOGIN ========= */

function openLogin(){
    document.getElementById("loginPopup").style.display="flex";
}

function closeLogin(){
    document.getElementById("loginPopup").style.display="none";
}

/* ========= OPEN REGISTER ========= */

function openRegister(){

    closeLogin();

    document.getElementById("registerPopup").style.display="flex";

}

function closeRegister(){

    document.getElementById("registerPopup").style.display="none";

}

/* ========= REGISTER ========= */

const registerForm=document.querySelector("#registerPopup form");

if(registerForm){

registerForm.addEventListener("submit",function(e){

e.preventDefault();

const inputs=this.querySelectorAll("input");

const fullname=inputs[0].value.trim();

const email=inputs[1].value.trim();

const phone=inputs[2].value.trim();

const password=inputs[3].value;

const confirm=inputs[4].value;

if(password!==confirm){

alert("Passwords do not match.");

return;

}

const exists=users.find(user=>user.email===email);

if(exists){

alert("This email is already registered.");

return;

}

const user={

fullname,
email,
phone,
password

};

users.push(user);

localStorage.setItem("users",JSON.stringify(users));

alert("Account created successfully.");

this.reset();

closeRegister();

openLogin();

});

}

/* ========= LOGIN ========= */

const loginForm=document.querySelector("#loginPopup form");

if(loginForm){

loginForm.addEventListener("submit",function(e){

e.preventDefault();

const email=this.querySelectorAll("input")[0].value.trim();

const password=this.querySelectorAll("input")[1].value;

const user=users.find(u=>u.email===email && u.password===password);

if(!user){

alert("Invalid email or password.");

return;

}

currentUser=user;

localStorage.setItem("currentUser",JSON.stringify(user));

alert("Welcome "+user.fullname);

closeLogin();

showCurrentUser();

});

}

/* ========= SHOW CURRENT USER ========= */

function showCurrentUser(){

const icon=document.querySelector(".fa-user");

if(icon && currentUser){

icon.style.color="#22c55e";

icon.title=currentUser.fullname;

}

}

/* ========= LOGOUT ========= */

function logout(){

localStorage.removeItem("currentUser");

currentUser=null;

alert("Logged out successfully.");

location.reload();

}

/* ========= ADMIN LOGIN ========= */

function adminLogin(){

const username=prompt("Admin Username");

const password=prompt("Admin Password");

if(username==="admin" && password==="1234"){

document.getElementById("adminPanel").style.display="block";

alert("Welcome Admin");

}else{

alert("Invalid Admin Login");

}

}

/* ========= PAGE LOAD ========= */

document.addEventListener("DOMContentLoaded",function(){

if(currentUser){

showCurrentUser();

}

});
/* ==========================================
   BUYER REQUESTS & ADMIN REQUEST MANAGEMENT
========================================== */

let requests = JSON.parse(localStorage.getItem("requests")) || [];

/* ========= REQUEST FORM ========= */

const requestForm = document.getElementById("requestForm");

if(requestForm){

requestForm.addEventListener("submit", function(e){

e.preventDefault();

const request={

name:document.getElementById("name").value.trim(),

email:document.getElementById("email").value.trim(),

phone:document.getElementById("phone").value.trim(),

country:document.getElementById("country").value,

product:document.getElementById("product").value,

quantity:document.getElementById("quantity").value,

message:document.getElementById("message").value.trim(),

date:new Date().toLocaleString()

};

requests.push(request);

localStorage.setItem("requests",JSON.stringify(requests));

alert("Request sent successfully.");

this.reset();

loadRequests();

updateStatistics();

});

}

/* ========= LOAD REQUESTS ========= */

function loadRequests(){

const table=document.getElementById("requestTable");

if(!table) return;

table.innerHTML="";

requests.forEach((request,index)=>{

table.innerHTML += `

<tr>

<td>${request.name}</td>

<td>${request.email}</td>

<td>${request.country}</td>

<td>${request.product}</td>

<td>${request.quantity} Kg</td>

<td>

<button onclick="deleteRequest(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

/* ========= DELETE REQUEST ========= */

function deleteRequest(index){

const answer=confirm("Delete this request?");

if(!answer) return;

requests.splice(index,1);

localStorage.setItem("requests",JSON.stringify(requests));

loadRequests();

updateStatistics();

}

/* ========= STATISTICS ========= */

function updateStatistics(){

const buyers=document.getElementById("totalBuyers");

const orders=document.getElementById("totalOrders");

const revenue=document.getElementById("totalRevenue");

if(buyers){

buyers.innerHTML=requests.length;

}

if(orders){

orders.innerHTML=requests.length;

}

if(revenue){

let total=0;

requests.forEach(item=>{

total += Number(item.quantity)*1000;

});

revenue.innerHTML=total.toLocaleString()+" RWF";

}

}

/* ========= PAGE LOAD ========= */

document.addEventListener("DOMContentLoaded",function(){

loadRequests();

updateStatistics();

});
/* ==========================================
   PRODUCT MANAGEMENT (CRUD)
========================================== */

let products = JSON.parse(localStorage.getItem("products")) || [];

/* ========= PRODUCT FORM ========= */

const productForm = document.getElementById("productForm");

if(productForm){

productForm.addEventListener("submit",function(e){

e.preventDefault();

const product={

id:Date.now(),

name:document.getElementById("productName").value.trim(),

price:Number(document.getElementById("productPrice").value),

image:document.getElementById("productImage").value.trim(),

description:document.getElementById("productDescription").value.trim()

};

products.push(product);

localStorage.setItem("products",JSON.stringify(products));

alert("Product added successfully.");

this.reset();

loadProducts();

updateProductStatistics();

});

}

/* ========= LOAD PRODUCTS ========= */

function loadProducts(){

const table=document.getElementById("productTable");

if(!table) return;

table.innerHTML="";

products.forEach(product=>{

table.innerHTML+=`

<tr>

<td>${product.name}</td>

<td>${product.price.toLocaleString()} RWF</td>

<td>

<button onclick="editProduct(${product.id})">

Edit

</button>

</td>

<td>

<button onclick="deleteProduct(${product.id})">

Delete

</button>

</td>

</tr>

`;

});

}

/* ========= DELETE PRODUCT ========= */

function deleteProduct(id){

if(!confirm("Delete this product?")) return;

products=products.filter(product=>product.id!==id);

localStorage.setItem("products",JSON.stringify(products));

loadProducts();

updateProductStatistics();

}

/* ========= EDIT PRODUCT ========= */

function editProduct(id){

const product=products.find(product=>product.id===id);

if(!product) return;

const newName=prompt("Product Name",product.name);

if(newName===null) return;

const newPrice=prompt("Product Price",product.price);

if(newPrice===null) return;

const newDescription=prompt("Description",product.description);

product.name=newName;

product.price=Number(newPrice);

product.description=newDescription;

localStorage.setItem("products",JSON.stringify(products));

loadProducts();

alert("Product updated successfully.");

}

/* ========= PRODUCT STATISTICS ========= */

function updateProductStatistics(){

const totalProducts=document.getElementById("totalProducts");

if(totalProducts){

totalProducts.innerHTML=products.length;

}

}

/* ========= INITIALIZE ========= */

document.addEventListener("DOMContentLoaded",function(){

loadProducts();

updateProductStatistics();

});
/* ==========================================
   SCRIPT.JS VERSION 2 - PART 5
   FINAL FUNCTIONS
========================================== */

/* ========= WISHLIST ========= */

function updateWishlistCount(){

    const count=document.getElementById("wishlistCount");

    if(count){

        count.innerHTML=wishlist.length;

    }

}

function clearWishlist(){

    if(!confirm("Clear wishlist?")) return;

    wishlist=[];

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    updateWishlistCount();

}

/* ========= CART COUNTER ========= */

function updateCartCounter(){

    const counter=document.getElementById("cartCount");

    if(counter){

        counter.innerHTML=cart.length;

    }

}

/* ========= CHECKOUT ========= */

function checkout(){

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    let total=0;

    cart.forEach(item=>{

        total+=item.price;

    });

    alert(
        "Order placed successfully!\n\nTotal: "+
        total.toLocaleString()+" RWF"
    );

    cart=[];

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCart();

    updateCartCounter();

}

/* ========= ADMIN LOGOUT ========= */

function logoutAdmin(){

    document.getElementById("adminPanel").style.display="none";

    alert("Admin logged out.");

}

/* ========= AUTO SAVE ========= */

window.addEventListener("beforeunload",function(){

    localStorage.setItem("cart",JSON.stringify(cart));

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    localStorage.setItem("products",JSON.stringify(products));

    localStorage.setItem("requests",JSON.stringify(requests));

    localStorage.setItem("users",JSON.stringify(users));

});

/* ========= NOTIFICATION ========= */

function showNotification(message){

    const note=document.createElement("div");

    note.innerHTML=message;

    note.style.position="fixed";
    note.style.top="20px";
    note.style.right="20px";
    note.style.background="#16a34a";
    note.style.color="white";
    note.style.padding="15px 20px";
    note.style.borderRadius="10px";
    note.style.zIndex="99999";

    document.body.appendChild(note);

    setTimeout(()=>{

        note.remove();

    },3000);

}

/* ========= OPEN CART FROM ICON ========= */

const cartIcon=document.querySelector(".fa-cart-shopping");

if(cartIcon){

cartIcon.addEventListener("click",openCart);

}

/* ========= OPEN LOGIN FROM USER ICON ========= */

const userIcon=document.querySelector(".fa-user");

if(userIcon){

userIcon.addEventListener("click",openLogin);

}

/* ========= INITIALIZATION ========= */

document.addEventListener("DOMContentLoaded",()=>{

    updateCart();

    updateCartCounter();

    updateWishlistCount();

    loadProducts();

    loadRequests();

    updateStatistics();

    updateProductStatistics();

    if(currentUser){

        showCurrentUser();

    }

    console.log("Modern Agriculture In Rwanda Version 2 Loaded Successfully.");

});
const menuToggle=document.querySelector(".menu-toggle");

const nav=document.querySelector("nav");

if(menuToggle){

menuToggle.onclick=function(){

nav.classList.toggle("active");

}

}
const searchInput = document.getElementById("search");

if(searchInput){

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

const title=card.querySelector("h3").textContent.toLowerCase();

card.style.display=title.includes(value) ? "block" : "none";

});

});

}
window.addEventListener("load",function(){

const loader=document.getElementById("loader");

if(loader){

loader.style.display="none";

}

});