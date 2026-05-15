document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsList = document.getElementById("cart-items-list");

    function displayCartItems() {
        cartItemsList.innerHTML = "";

        let subtotal = 0;

        cart.forEach((item,index)=>{

            subtotal += item.price * item.quantity;

            cartItemsList.innerHTML += `
                <div class="cart-item">
                    
                    <div style="display:flex; gap:20px;">
                        <img src="${item.image}">
                        
                        <div>
                            <h3>${item.name}</h3>
                            <p>$${item.price}</p>

                            <button onclick="removeItem(${index})">
                                Remove
                            </button>
                        </div>
                    </div>

                    <div>
                        Qty: ${item.quantity}
                    </div>

                </div>
            `;
        });

        let tax = subtotal * 0.10;
        let total = subtotal + tax;

        document.getElementById("subtotal").innerText = "$" + subtotal;
        document.getElementById("tax").innerText = "$" + tax;
        document.getElementById("total-price").innerText = "$" + total;
        document.getElementById("cart-count").innerText = cart.length;

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.removeItem=function(index){
        cart.splice(index,1)
        displayCartItems()
    }

    displayCartItems();
});