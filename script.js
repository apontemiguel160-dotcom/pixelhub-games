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
        title: "Spotify Premium - 3 Meses",
        genre: "Entretenimiento",
        priceOld: 50700,
        priceNew: 25000,
        discount: "-50%",
        image: "spotify_pin.png"
    },
    {
        id: 5,
        title: "2800 FC Points - EA Sports FC",
        genre: "Monedas Virtuales",
        priceOld: 120000,
        priceNew: 95000,
        discount: "-20%",
        image: "https://images.unsplash.com/photo-1518605368461-1e1e114151fc?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Xbox Game Pass Ultimate - 1 Mes",
        genre: "Entretenimiento",
        priceOld: 33900,
        priceNew: 24900,
        discount: "-26%",
        image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=1932&auto=format&fit=crop"
    },
    {
        id: 7,
        title: "1000 Valorant Points",
        genre: "Monedas Virtuales",
        priceOld: 45000,
        priceNew: 38000,
        discount: "-15%",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 8,
        title: "Crunchyroll Mega Fan - 1 Mes",
        genre: "Entretenimiento",
        priceOld: 14900,
        priceNew: 9900,
        discount: "-33%",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1974&auto=format&fit=crop"
    }
];

// Formateador de moneda colombiana (COP)
const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(value);
};

// Referencias al DOM
const gameGrid = document.getElementById('game-grid');
const cartCount = document.getElementById('cart-count');
const toast = document.getElementById('toast');
const filterBtns = document.querySelectorAll('.btn-filter');

let cartItems = 0;

// Renderizar tarjetas de producto
const renderGames = (gamesToRender) => {
    gameGrid.innerHTML = '';
    
    gamesToRender.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        card.innerHTML = \`
            <div class="game-image-container">
                <span class="game-discount">\${game.discount}</span>
                <img src="\${game.image}" alt="\${game.title}" class="game-image">
            </div>
            <div class="game-info">
                <h3 class="game-title">\${game.title}</h3>
                <p class="game-genre">\${game.genre}</p>
                <div class="game-price-row">
                    <span class="game-price-old">\${formatCurrency(game.priceOld)}</span>
                    <span class="game-price-new">\${formatCurrency(game.priceNew)}</span>
                </div>
                <button class="btn-buy" onclick="addToCart()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Comprar
                </button>
            </div>
        \`;
        
        gameGrid.appendChild(card);
    });
};

// Función para añadir al carrito
window.addToCart = () => {
    cartItems++;
    cartCount.textContent = cartItems;
    
    // Animar el contador
    cartCount.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
    
    // Mostrar Toast
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
};

// Filtros básicos
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Quitar clase active de todos
        filterBtns.forEach(b => b.classList.remove('active'));
        // Añadir al clickeado
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
});
