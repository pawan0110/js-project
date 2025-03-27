document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "product 1", price: 29.99 },
        { id: 2, name: "product 2", price: 19.99 },
        { id: 3, name: "product 3", price: 39.99 },
    ];

    let cart = JSON.parse(localStorage.getItem("cart"))|| [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    // Populate Product List
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(productDiv);
    });

    // Add Product to Cart
    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            if (product) {
                addToCart(product);
            }
        }
    });

    function addToCart(product) {
        cart.push(product);
        saveItems();
        renderCart();

    }

    // Render Cart
    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        
        } else {
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
            totalPriceDisplay.textContent = `$0.00`;
        }
    }

    // Remove Product from Cart (Event Delegation)
    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const itemIndex = parseInt(e.target.getAttribute("data-index"));
            if (!isNaN(itemIndex)) {
                cart.splice(itemIndex, 1); // Remove the item from the cart
                saveItems();
                renderCart(); // Re-render the cart
            }
        }
    });

    // Checkout
    checkOutBtn.addEventListener("click", () => {
        if (cart.length > 0) {
            alert("Checkout successful!");
            cart.length = 0; // Clear the cart
            renderCart(); // Re-render the cart
        } else {
            alert("Your cart is empty!");
        }
    });

    function saveItems() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    renderCart();
});
