document.addEventListener('DOMContentLoaded', function() {
    const cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            const productImg = this.getAttribute('data-img');

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                img: productImg,
                quantity: 1
            };

            addToCart(product);
            this.textContent = "Added to Cart";
            this.disabled = true;
        });
    });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCartItems() {
        cartContainer.innerHTML = '';

        if (cart.length > 0) {
            cart.forEach(product => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <div>
                        <h4>${product.name}</h4>
                        <p>Price: Rs.${product.price}</p>
                        <div>
                            <button class="decrease-quantity" data-id="${product.id}">-</button>
                            <span>${product.quantity}</span>
                            <button class="increase-quantity" data-id="${product.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${product.id}">Remove</button>
                    </div>
                `;
                cartContainer.appendChild(itemDiv);
            });

            document.querySelectorAll('.increase-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    increaseQuantity(productId);
                });
            });

            document.querySelectorAll('.decrease-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    decreaseQuantity(productId);
                });
            });

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    removeItem(productId);
                });
            });
        } else {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        }
    }

    function increaseQuantity(productId) {
        let product = cart.find(item => item.id === productId);
        product.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    function decreaseQuantity(productId) {
        let product = cart.find(item => item.id === productId);
        if (product.quantity > 1) {
            product.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    displayCartItems();
});

// to check for signin when user visit cart
document.addEventListener('DOMContentLoaded', () => {
    /*const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        alert('Please sign in to view your cart');
        window.location.href = 'signin.html'; // Redirect to sign-in page
        return;
    }
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" width="100">
            <h4>${item.name}</h4>
            <p>Price: Rs.${item.price}</p>
            <p>Quantity: <button class="quantity-decrease">-</button> ${item.quantity} <button class="quantity-increase">+</button></p>
            <button class="delete-item" data-id="${item.id}">Delete</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });*/

    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('You need to sign in first!');
            window.location.href = 'signin.html';
        } else {
            alert('Successfully checked out');
            localStorage.removeItem('cart');
            updateCartDisplay();
        }
    });

    // Handle quantity increase/decrease and item deletion here
});