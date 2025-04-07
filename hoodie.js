document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    
    // Change header style on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Product data
    const products = [
        {
            id: 1,
            title: "Urban Classic Hoodie",
            price: 700,
            oldPrice: 900,
            discount: 29,
            image: "images/hoodie/men/h2.png",
            category: "men",
            rating: 4,
            description: "Classic urban style hoodie with premium cotton blend for ultimate comfort."
        },
        {
            id: 2,
            title: "Pastel Dream Hoodie",
            price: 500,
            oldPrice: 600,
            discount: 15,
            image: "images/hoodie/women/h3.png",
            category: "women",
            rating: 5,
            description: "Soft pastel hoodie with oversized fit for a cozy and stylish look."
        },
        {
            id: 3,
            title: "Graphic Print Hoodie",
            price: 800,
            image: "images/hoodie/men/h4.png",
            category: "unisex",
            rating: 4,
            description: "Bold graphic print hoodie that makes a statement wherever you go."
        },
        {
            id: 4,
            title: "Athletic Fit Hoodie",
            price: 400,
            oldPrice: 500,
            discount: 25,
            image: "images/hoodie/men/h5.png",
            category: "men",
            rating: 4.5,
            description: "Performance hoodie designed for both workouts and casual wear."
        },
        {
            id: 5,
            title: "Oversized Comfort Hoodie",
            price: 800,
            image: "images/hoodie/men/h6.png",
            category: "women",
            rating: 5,
            description: "Ultra-comfy oversized hoodie perfect for lounging or layering."
        },
        {
            id: 6,
            title: "Vintage Wash Hoodie",
            price: 400,
            oldPrice: 500,
            discount: 20,
            image: "images/hoodie/men/h7.png",
            category: "unisex",
            rating: 4,
            description: "Vintage-inspired hoodie with distressed details for a retro vibe."
        },
        {
            id: 7,
            title: "Fleece-Lined Hoodie",
            price: 600,
            image: "images/hoodie/men/h8.png",
            category: "men",
            rating: 4.5,
            description: "Extra warm fleece-lined hoodie for chilly days and nights."
        },
        {
            id: 8,
            title: "Cropped Hoodie",
            price: 600,
            oldPrice: 850,
            discount: 23,
            image: "images/hoodie/men/h9.png",
            category: "men",
            rating: 4,
            description: "Trendy cropped hoodie that pairs perfectly with high-waisted bottoms."
        }
    ];
    
    // Display products
    const productsContainer = document.getElementById('products-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    let visibleProducts = 8; // Initial number of visible products
    let allProducts = [...products]; // Copy of all products
    
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = '';
        
        productsToDisplay.slice(0, visibleProducts).forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.setAttribute('data-category', product.category);
            
            let discountBadge = '';
            if (product.discount) {
                discountBadge = `<div class="product-badge">${product.discount}% OFF</div>`;
            }
            
            let oldPrice = '';
            if (product.oldPrice) {
                oldPrice = `<span class="old-price">ksh${product.oldPrice.toFixed(2)}</span>`;
            }
            
            let ratingStars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(product.rating)) {
                    ratingStars += '<i class="fas fa-star"></i>';
                } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
                    ratingStars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    ratingStars += '<i class="far fa-star"></i>';
                }
            }
            
            productCard.innerHTML = 
                `${discountBadge}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-actions">
                        <button class="action-btn quick-view" data-id="${product.id}"><i class="fas fa-eye"></i></button>
                        <button class="action-btn add-to-wishlist wishlist-btn" data-id="${product.id}"><i class="far fa-heart"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">ksh${product.price.toFixed(2)}</span>
                        ${oldPrice}
                    </div>
                    <div class="product-rating">
                        ${ratingStars}
                        <span>(${Math.floor(Math.random() * 50) + 10})</span>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                </div>`;
            
            productsContainer.appendChild(productCard);
        });
        
        // Show/hide load more button
        loadMoreBtn.style.display = visibleProducts >= productsToDisplay.length ? 'none' : 'block';
        
        // Initialize quick view and add to cart buttons
        initProductButtons();
    }
    
    // Filter products
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            allProducts = filter === 'all' ? [...products] : products.filter(product => product.category === filter);
            visibleProducts = 8; // Reset visible products when filtering
            displayProducts(allProducts);
        });
    });
    
    // Load more products
    loadMoreBtn.addEventListener('click', function() {
        visibleProducts += 4;
        displayProducts(allProducts);
    });
    
    // Initialize product buttons (quick view and add to cart)
    function initProductButtons() {
        // Quick view buttons
        const quickViewBtns = document.querySelectorAll('.quick-view');
        
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                openQuickView(product);
            });
        });
        
        // Add to cart buttons
        const addToCartBtns = document.querySelectorAll('.add-to-cart');
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                addToCart(product);
                
                this.innerHTML = '<i class="fas fa-check"></i> Added';
                this.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                    this.style.backgroundColor = '';
                }, 2000);
            });
        });
        
        // Add to wishlist buttons
        const addToWishlistBtns = document.querySelectorAll('.add-to-wishlist');
        
        addToWishlistBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (addToWishlist(productId, product)) {
                    this.innerHTML = '<i class="fas fa-heart" style="color: red;"></i>';
                    showNotification('Added to wishlist');
                } else {
                    this.innerHTML = '<i class="far fa-heart"></i>';
                    showNotification('Removed from wishlist');
                }
            });
        });
    }
    
    // Quick view modal
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeModal = document.querySelector('.close-modal');
    
    function openQuickView(product) {
        document.getElementById('modal-product-title').textContent = product.title;
        document.getElementById('modal-product-price').textContent = `ksh${product.price.toFixed(2)}`;
        
        if (product.oldPrice) {
            document.getElementById('modal-product-old-price').textContent = `ksh${product.oldPrice.toFixed(2)}`;
            document.getElementById('modal-product-discount').textContent = `${product.discount}% OFF`;
        } else {
            document.getElementById('modal-product-old-price').textContent = '';
            document.getElementById('modal-product-discount').textContent = '';
        }
        
        document.getElementById('modal-product-description').textContent = product.description;
        document.getElementById('modal-main-image').src = product.image;
        
        // Open modal
        quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Cart functionality
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    const continueShopping = document.querySelector('.continue-shopping');
    let cart = [];
    
    // Open/close cart
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    continueShopping.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Add to cart function
    function addToCart(product, quantity = 1) {
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        updateCart();
    }
    
    // Update cart display
    function updateCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const totalPriceElement = document.querySelector('.total-price');
        
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = 
                `<div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>`;
            totalPriceElement.textContent = 'ksh0.00'; // Reset total price
        } else {
            cartItemsContainer.innerHTML = '';
            let subtotal = 0; // Initialize subtotal
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = 
                    `<div class="cart-item-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">ksh${(item.price * item.quantity).toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="decrement">-</button>
                            <span>${item.quantity}</span>
                            <button class="increment">+</button>
                        </div>
                    </div>
                    <div class="remove-item" data-id="${item.id}">&times;</div>`;
                
                cartItemsContainer.appendChild(cartItem);
                
                // Add event listeners to quantity buttons
                const decrementBtn = cartItem.querySelector('.decrement');
                const incrementBtn = cartItem.querySelector('.increment');
                const quantitySpan = cartItem.querySelector('.cart-item-quantity span');
                const removeBtn = cartItem.querySelector('.remove-item');
                
                decrementBtn.addEventListener('click', function() {
                    if (item.quantity > 1) {
                        item.quantity--;
                        quantitySpan.textContent = item.quantity;
                        cartItem.querySelector('.cart-item-price').textContent = `ksh${(item.price * item.quantity).toFixed(2)}`;
                        updateSubtotal();
                    }
                });
                
                incrementBtn.addEventListener('click', function() {
                    item.quantity++;
                    quantitySpan.textContent = item.quantity;
                    cartItem.querySelector('.cart-item-price').textContent = `ksh${(item.price * item.quantity).toFixed(2)}`;
                    updateSubtotal();
                });
                
                removeBtn.addEventListener('click', function() {
                    cart = cart.filter(cartItem => cartItem.id !== item.id);
                    updateCart();
                    showNotification(`${item.title} removed from cart`);
                });
                
                // Calculate subtotal
                subtotal += item.price * item.quantity;
            });
            
            totalPriceElement.textContent = `ksh${subtotal.toFixed(2)}`; // Update total price
        }
    }
    
    // Update subtotal
    function updateSubtotal() {
        const totalPriceElement = document.querySelector('.total-price');
        let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElement.textContent = `ksh${subtotal.toFixed(2)}`;
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty', 'error');
        } else {
            showNotification('Proceeding to checkout...');
            // In a real app, this would redirect to checkout page
            setTimeout(() => {
                cart = [];
                updateCart();
                cartSidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 1500);
        }
    });
    
    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 3000;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            background-color: #4CAF50;
        }
        
        .notification.error {
            background-color: #F44336;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // Wishlist Functionality
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Initialize wishlist
    function initWishlist() {
        updateWishlistCount();
        
        // Wishlist icon click event
        document.querySelector('.wishlist-icon').addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.wishlist-sidebar').classList.add('active');
            document.body.style.overflow = 'hidden';
            updateWishlistDisplay();
        });
        
        // Close wishlist
        document.querySelector('.close-wishlist').addEventListener('click', function() {
            document.querySelector('.wishlist-sidebar').classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Update wishlist count display
    function updateWishlistCount() {
        const count = document.querySelector('.wishlist-count');
        count.textContent = wishlist.length;
        count.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }

    // Update wishlist items display
    function updateWishlistDisplay() {
        const container = document.querySelector('.wishlist-items');
        
        if (wishlist.length === 0) {
            container.innerHTML = 
                `<div class="empty-wishlist">
                    <i class="far fa-heart"></i>
                    <p>Your wishlist is empty</p>
                </div>`;
            return;
        }
        
        container.innerHTML = '';
        
        wishlist.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            
            const wishlistItem = document.createElement('div');
            wishlistItem.className = 'wishlist-item';
            wishlistItem.innerHTML = 
                `<div class="wishlist-item-img">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="wishlist-item-details">
                    <h4 class="wishlist-item-title">${product.title}</h4>
                    <div class="wishlist-item-price">ksh${product.price.toFixed(2)}</div>
                    <button class="move-to-cart" data-id="${product.id}">Move to Cart</button>
                </div>
                <div class="remove-wishlist-item" data-id="${product.id}">&times;</div>`;
            container.appendChild(wishlistItem);
        });
        
        // Add event listeners to new elements
        document.querySelectorAll('.move-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                const product = products.find(p => p.id === productId);
                addToCart(product);
                removeFromWishlist(productId);
                updateWishlistDisplay();
                showNotification('Moved to cart');
            });
        });
        
        document.querySelectorAll('.remove-wishlist-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                removeFromWishlist(productId);
                updateWishlistDisplay();
                showNotification('Removed from wishlist');
            });
        });
    }

    // Add to wishlist
    function addToWishlist(productId, productData) {
        if (!wishlist.some(item => item.id === productId)) {
            wishlist.push({
                id: productId,
                ...productData // Include all product data
            });
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistCount();
            return true;
        }
        return false;
    }

    // Remove from wishlist
    function removeFromWishlist(productId) {
        wishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
    }

    // Initialize when DOM loads
    initWishlist();
    displayProducts(products);
});