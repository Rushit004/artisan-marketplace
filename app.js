const artisans = [
    {
        name: "Aarohi Textiles",
        craft: "Handloom Sarees",
        story: "Weaving tradition passed down for generations.",
        img: "https://i.imgur.com/xyz123.jpg",
        price: "₹1800"
    },
    {
        name: "Ravi's Pottery",
        craft: "Terracotta Pots",
        story: "Inspired by village life and nature.",
        img: "https://i.imgur.com/abc456.jpg",
        price: "₹320"
    }
];

function generateStory(name, craft, oldStory) {
    // Simple AI-like suggestion
    return oldStory + " This unique product reflects their dedication and brings heritage to your modern home.";
}

function renderArtisans() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    artisans.forEach(a => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${a.img}" alt="${a.craft}">
            <h3>${a.name}</h3>
            <p><strong>Craft:</strong> ${a.craft}</p>
            <p><strong>Story:</strong> ${generateStory(a.name, a.craft, a.story)}</p>
            <p><strong>Price:</strong> ${a.price}</p>
            <button>Contact Artisan</button>
        `;
        list.appendChild(card);
    });
}
renderArtisans();
