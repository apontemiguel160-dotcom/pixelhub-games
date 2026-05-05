// Base de datos simulada de Productos Digitales
const games = [
    {
        id: 1,
        title: "Perfil Netflix 4K - 1 Mes",
        genre: "Entretenimiento",
        plans: [
            { name: "1 Pantalla",    price: 20500 },
            { name: "2 Pantallas",   price: 30500 },
            { name: "3 Pantallas",   price: 35500 },
            { name: "4K Premium",    price: 40500 },
            { name: "Plan Familiar", price: 50500 }
        ],
        image: "assets/img/netflix_pin.png"
    },
    {
        id: 2,
        title: "Xbox Game Pass",
        genre: "Entretenimiento",
        plans: [
            { name: "Essential 3M",  price: 88400 },
            { name: "Ultimate 1M",   price: 50400 },
            { name: "Premium 1M",    price: 40400 }
        ],
        image: "https://store-images.s-microsoft.com/image/apps.35529.13510798887677013.e94e60d5-0e9d-4aaa-b29a-ee55eb2f7fc4.1bca2c9e-c4a7-4a1b-b9d8-4a72a4a00e0d"
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

        const hasPlans = game.plans && game.plans.length > 0;
        const defaultPrice = hasPlans ? game.plans[0].price : game.priceNew;

        const planOptions = hasPlans
            ? game.plans.map((p, i) =>
                `<option value="${i}">${p.name} — ${formatCurrency(p.price)}</option>`
              ).join('')
            : '';

        const planSelector = hasPlans ? `
            <div class="plan-selector-wrap">
                <label class="plan-label">Plan</label>
                <select class="plan-select" id="plan-select-${game.id}" onchange="updatePrice(${game.id})">
                    ${planOptions}
                </select>
            </div>` : '';

        card.innerHTML = `
            <div class="game-image-container">
                <img src="${game.image}" alt="${game.title}" class="game-image">
            </div>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-genre">${game.genre}</p>
                <div class="game-price-row">
                    <span class="game-price-new" id="price-display-${game.id}">${formatCurrency(defaultPrice)}</span>
                    ${planSelector}
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

// Actualizar precio al cambiar el plan
window.updatePrice = (id) => {
    const game = games.find(g => g.id === id);
    const selectEl = document.getElementById(`plan-select-${id}`);
    const idx = parseInt(selectEl.value);
    const priceDisplay = document.getElementById(`price-display-${id}`);
    priceDisplay.textContent = formatCurrency(game.plans[idx].price);

    // Animación de pulso en el precio
    priceDisplay.classList.add('price-pulse');
    setTimeout(() => priceDisplay.classList.remove('price-pulse'), 400);
};

// Función para añadir al carrito
window.addToCart = (id) => {
    const game = games.find(g => g.id === id);
    const selectEl = document.getElementById(`plan-select-${id}`);
    const hasPlans = game.plans && game.plans.length > 0;
    const selectedPlan = hasPlans
        ? game.plans[parseInt(selectEl.value)]
        : { name: '', price: game.priceNew };

    const cartItem = {
        id: game.id,
        title: hasPlans ? `${game.title} · ${selectedPlan.name}` : game.title,
        priceNew: selectedPlan.price
    };

    cart.push(cartItem);
    updateCartUI();

    // Mostrar Toast
    toast.textContent = `${cartItem.title} añadido al carrito`;
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
