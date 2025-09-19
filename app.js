// Modal handling
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeBtns = document.querySelectorAll(".close");

// Open modals
loginBtn.onclick = () => loginModal.style.display = "block";
registerBtn.onclick = () => registerModal.style.display = "block";

// Close modals
closeBtns.forEach(btn => {
  btn.onclick = () => {
    loginModal.style.display = "none";
    registerModal.style.display = "none";
  };
});

// Close if user clicks outside modal
window.onclick = (event) => {
  if (event.target === loginModal) loginModal.style.display = "none";
  if (event.target === registerModal) registerModal.style.display = "none";
};

// Cart button alert
document.querySelectorAll(".cart-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Item added to cart!");
  });
});

// Cart nav button
document.getElementById("cartBtn").onclick = () => {
  alert("Cart page coming soon!");
};
