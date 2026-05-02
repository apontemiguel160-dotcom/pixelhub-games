// Base de datos simulada de Productos Digitales
const games = [
    {
        id: 1,
        title: "1000 Pavos - Fortnite",
        genre: "Monedas Virtuales",
        priceOld: 39900,
        priceNew: 31900,
        discount: "-20%",
        image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Perfil Netflix 4K - 1 Mes",
        genre: "Entretenimiento",
        priceOld: 25000,
        priceNew: 18000,
        discount: "-28%",
        image: "netflix_pin.png"
    },
    {
        id: 3,
        title: "800 Robux - Roblox",
        genre: "Monedas Virtuales",
        priceOld: 25000,
        priceNew: 19500,
        discount: "-22%",
        image: "https://images.unsplash.com/photo-1629856578056-b0eec82da171?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Disney+ Premium - 1 Mes",
        genre: "Entretenimiento",
        priceOld: 23900,
        priceNew: 15000,
        discount: "-37%",
        image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "1100 CP - Call of Duty",
        genre: "Monedas Virtuales",
        priceOld: 45000,
        priceNew: 38000,
        discount: "-15%",
        image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=2019&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "520 Diamantes - Free Fire",
        genre: "Monedas Virtuales",
        priceOld: 20000,
        priceNew: 15500,
        discount: "-22%",
        image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=2067&auto=format&fit=crop"
    },
    {
        id: 7,
        title: "Spotify Premium - 3 Meses",
        genre: "Entretenimiento",
        priceOld: 40000,
        priceNew: 20000,
        discount: "-50%",
        image: "spotify_pin.png"
    },
    {
        id: 8,
        title: "Max (HBO) Estándar - 1 Mes",
        genre: "Entretenimiento",
        priceOld: 19900,
        priceNew: 13900,
        discount: "-30%",
        image: "https://images.unsplash.com/photo-1614113489855-66422ad300a4?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 9,
        title: "Crunchyroll Mega Fan - 1 Mes",
        genre: "Entretenimiento",
        priceOld: 14900,
        priceNew: 9900,
        discount: "-33%",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 10,
        title: "Xbox Game Pass Ultimate - 1 Mes",
        genre: "Entretenimiento",
        priceOld: 33900,
        priceNew: 24900,
        discount: "-26%",
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1932&auto=format&fit=crop"
    }
];

// Estado del Carrito
let cart = [];

// Formateador de moneda colombiana (COP)
const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(value);
};

// Referencias al DOM principales
const gameGrid = document.getElementById('game-grid');
const cartCount = document.getElementById('cart-count');
const toast = document.getElementById('toast');
const filterBtns = document.querySelectorAll('.btn-filter');

// Referencias del Modal del Carrito
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Renderizar tarjetas de producto
const renderGames = (gamesToRender) => {
    gameGrid.innerHTML = '';
    
    gamesToRender.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        card.innerHTML = `
            <div class="game-image-container">
                <span class="game-discount">${game.discount}</span>
                <img src="${game.image}" alt="${game.title}" class="game-image">
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-genre">${game.genre}</p>
                <div class="game-price-row">
                    <span class="game-price-old">${formatCurrency(game.priceOld)}</span>
                    <span class="game-price-new">${formatCurrency(game.priceNew)}</span>
                </div>
                <button class="btn-buy" onclick="addToCart(${game.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Añadir al Carrito
                </button>
            </div>
        `;
        
        gameGrid.appendChild(card);
    });
};

// Función para añadir al carrito
window.addToCart = (id) => {
    const game = games.find(g => g.id === id);
    cart.push(game);
    updateCartUI();
    
    // Mostrar Toast
    toast.textContent = `${game.title} añadido al carrito`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

// Función para eliminar del carrito
window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
};

// Actualizar UI del Carrito (Contador y Modal)
const updateCartUI = () => {
    // Actualizar contador
    cartCount.textContent = cart.length;
    cartCount.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);

    // Renderizar items en el modal
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#a0a0b8;">Tu carrito está vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.priceNew;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${formatCurrency(item.priceNew)}</div>
                </div>
                <div class="cart-item-remove" onclick="removeFromCart(${index})">X</div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Actualizar Total
    cartTotalPrice.textContent = formatCurrency(total);
};

// Funciones del Modal
cartBtn.onclick = () => {
    cartModal.style.display = 'block';
};

closeCartBtn.onclick = () => {
    cartModal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
};

// Checkout por WhatsApp
checkoutBtn.onclick = () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let message = "Hola, vengo de la tienda web. Quiero comprar los siguientes productos:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        message += `- *${item.title}* (${formatCurrency(item.priceNew)})%0A`;
        total += item.priceNew;
    });

    message += `%0A*Total a Pagar:* ${formatCurrency(total)}%0A%0A¿A qué cuenta transfiero?`;

    const phone = "573007301270";
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
    
    // Vaciar carrito después de comprar (opcional)
    cart = [];
    updateCartUI();
    cartModal.style.display = 'none';
};

// Filtros básicos
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.textContent.trim();
        
        if (filter === 'Todos') {
            renderGames(games);
        } else {
            const filtered = games.filter(game => game.genre.trim() === filter);
            renderGames(filtered);
        }
    });
});

// Inicializar la tienda
document.addEventListener('DOMContentLoaded', () => {
    renderGames(games);
    updateCartUI();
});
