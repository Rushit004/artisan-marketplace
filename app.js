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
