// Sepete ekleme işlemi
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Sepetteki ürünlerin sayısını güncelleme
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = `(${cartItems.length})`; // Sepetteki ürün sayısını göster
}

// Sepete ürün ekleme işlemi
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = button.getAttribute('data-product');
        const productPrice = button.getAttribute('data-price');

        // Sepetteki ürünleri al
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Yeni ürünü sepete ekle
        cartItems.push({ name: productName, price: productPrice });

        // Sepeti localStorage'a kaydet
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Sepet sayısını güncelle
        updateCartCount();
    });
});

// Sepet sayfası - Sepetteki ürünleri listeleme
if (window.location.pathname.includes('sepet.html')) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');

    // Sepetteki ürünleri göster
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `<p>${item.name} - ${item.price}</p>`;
        cartContainer.appendChild(itemDiv);
    });

    // Toplam fiyatı hesapla
    const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `<p>Toplam: ${totalPrice}₺</p>`;
    cartContainer.appendChild(totalDiv);
}
