document.addEventListener('DOMContentLoaded', () => {
    // Array of sample product data
    // In a real application, you would fetch this data from an API
    const products = [
        {
            name: "Hand-painted Ceramic Vase",
            description: "A beautiful, hand-painted vase with intricate patterns inspired by traditional art.",
            price: "₹1,200",
            image: "https://images.unsplash.com/photo-1599424608359-54378f85f3de",
            artisan: "Meera"
        },
        {
            name: "Woven Bamboo Basket",
            description: "A durable and stylish basket, meticulously hand-woven from sustainably sourced bamboo.",
            price: "₹850",
            image: "https://images.unsplash.com/photo-1515286280436-e0f393850125",
            artisan: "Prakash"
        },
        {
            name: "Block Printed Scarf",
            description: "Soft cotton scarf featuring a classic Sanganeri block print design in natural dyes.",
            price: "₹600",
            image: "https://images.unsplash.com/photo-1521406691122-f04b281f6c46",
            artisan: "Radha"
        },
        {
            name: "Carved Wooden Elephant",
            description: "A meticulously hand-carved miniature elephant, a symbol of good luck and strength.",
            price: "₹1,500",
            image: "https://images.unsplash.com/photo-1621644781403-4c9f16e39818",
            artisan: "Rajesh"
        }
    ];

    const productGrid = document.getElementById('product-grid');

    // Function to create a product card element
    const createProductCard = (product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const html = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price}</div>
            </div>
        `;

        productCard.innerHTML = html;
        return productCard;
    };

    // Populate the product grid with the data
    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
});
// Chatbot logic
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

chatToggle.addEventListener('click', () => {
    chatContainer.classList.toggle('hidden');
});

chatClose.addEventListener('click', () => {
    chatContainer.classList.add('hidden');
});

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    appendMessage(userMessage, 'user-message');
    chatInput.value = '';

    // Simulate AI response (replace with API call)
    const aiResponse = await getAiResponse(userMessage);
    appendMessage(aiResponse, 'ai-message');
});

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', className);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Dummy function to simulate a backend AI service
async function getAiResponse(message) {
    // In a real app, you would make a fetch call here
    // e.g., fetch('YOUR_AI_API_ENDPOINT', { ... })
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

    if (message.toLowerCase().includes('hello')) {
        return "Hi there! I'm the Artisan Hub assistant. How can I help you today?";
    } else if (message.toLowerCase().includes('products')) {
        return "You can browse our marketplace or tell me what kind of craft you're looking for!";
    } else if (message.toLowerCase().includes('artisan')) {
        return "Our artisans are the heart of this marketplace. You can read their stories in the 'Stories' section.";
    } else {
        return "I'm sorry, I don't understand that. Can you please rephrase?";
    }
}
// Product data with categories
const products = [
    {
        name: "Hand-painted Ceramic Vase",
        description: "A beautiful, hand-painted vase with intricate patterns inspired by traditional art.",
        price: "₹1,200",
        image: "https://images.unsplash.com/photo-1599424608359-54378f85f3de",
        artisan: "Meera",
        category: "ceramics"
    },
    {
        name: "Woven Bamboo Basket",
        description: "A durable and stylish basket, meticulously hand-woven from sustainably sourced bamboo.",
        price: "₹850",
        image: "https://images.unsplash.com/photo-1515286280436-e0f393850125",
        artisan: "Prakash",
        category: "woodwork"
    },
    {
        name: "Block Printed Scarf",
        description: "Soft cotton scarf featuring a classic Sanganeri block print design in natural dyes.",
        price: "₹600",
        image: "https://images.unsplash.com/photo-1521406691122-f04b281f6c46",
        artisan: "Radha",
        category: "textiles"
    },
    {
        name: "Carved Wooden Elephant",
        description: "A meticulously hand-carved miniature elephant, a symbol of good luck and strength.",
        price: "₹1,500",
        image: "https://images.unsplash.com/photo-1621644781403-4c9f16e39818",
        artisan: "Rajesh",
        category: "woodwork"
    },
    {
        name: "Ceramic Tea Set",
        description: "A unique handmade tea set, perfect for a cozy evening.",
        price: "₹1,800",
        image: "https://images.unsplash.com/photo-1628122283842-17a4128f7318",
        artisan: "Priya",
        category: "ceramics"
    }
];

// ... (existing code to create product cards) ...
document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing createProductCard and productGrid population logic) ...
    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });

    // Filtering logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedCategory = btn.dataset.category;

            // Update active state of buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide products
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});
// Authentication logic
const loginBtn = document.getElementById('login-btn'); // Add this button to your navbar HTML
const authModal = document.getElementById('auth-modal');
const closeModal = document.querySelector('.close-button');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Open modal
//loginBtn.addEventListener('click', () => {
//    authModal.classList.remove('hidden');
//});

// Close modal
closeModal.addEventListener('click', () => {
    authModal.classList.add('hidden');
});

// Toggle between login and signup forms
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});
