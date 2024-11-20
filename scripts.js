



$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Sepete ürün ekleme
    $(".add-to-cart").click(function () {
        let product = $(this).closest(".product");
        let id = product.data("id");
        let name = product.data("name");
        let price = parseFloat(product.data("price"));
        let quantity = parseInt(product.find(".quantity").text());

        let existing = cart.find(item => item.id === id);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({ id, name, price, quantity });
        }

   
    });

    // Sepet sayfasını doldurma
    if ($("#cart-items").length) {
        function renderCart() {
            let total = 0;
            $("#cart-items").empty();

            cart.forEach(item => {
                let subtotal = item.price * item.quantity;
                total += subtotal;

                $("#cart-items").append(`
                    <tr>
                        <td>${item.name}</td>
                        <td>
                            <button class="decrease" data-id="${item.id}">-</button>
                            ${item.quantity}
                            <button class="increase" data-id="${item.id}">+</button>
                        </td>
                        <td>${item.price} TL</td>
                        <td>${subtotal.toFixed(2)} TL</td>
                        <td><button class="delete" data-id="${item.id}">Sil</button></td>
                    </tr>
                `);
            });

            $("#cart-total").text(`${total.toFixed(2)} TL`);
        }

        renderCart();

        $(document).on("click", ".increase", function () {
            let id = $(this).data("id");
            let product = cart.find(item => item.id === id);
            if (product) product.quantity++;
            saveCart();
            renderCart();
        });

        $(document).on("click", ".decrease", function () {
            let id = $(this).data("id");
            let product = cart.find(item => item.id === id);
            if (product && product.quantity > 1) product.quantity--;
            saveCart();
            renderCart();
        });

        $(document).on("click", ".delete", function () {
            let id = $(this).data("id");
            cart = cart.filter(item => item.id !== id);
            saveCart();
            renderCart();
        });

        $("#empty-cart").click(function () {
            if (confirm("Sepeti boşaltmak istediğinizden emin misiniz?")) {
                cart = [];
                saveCart();
                renderCart();
            }
        });
    }
});

$(document).ready(function () {
    // Sepetteki ürünler
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Ürünlerin adetlerini artırma ve azaltma
    $(document).on("click", ".increase", function () {
        let product = $(this).closest(".product");
        let quantitySpan = product.find(".quantity");
        let currentQuantity = parseInt(quantitySpan.text());
        let price = parseFloat(product.data("price"));
        let newQuantity = currentQuantity + 1;
        
        quantitySpan.text(newQuantity);  // Yeni adet yazdır
        product.find(".price").text((newQuantity * price) + " TL");  // Yeni fiyatı güncelle
    });

    $(document).on("click", ".decrease", function () {
        let product = $(this).closest(".product");
        let quantitySpan = product.find(".quantity");
        let currentQuantity = parseInt(quantitySpan.text());
        let price = parseFloat(product.data("price"));
        let newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1; // Adet 1'den az olmasın
        
        quantitySpan.text(newQuantity);  // Yeni adet yazdır
        product.find(".price").text((newQuantity * price) + " TL");  // Yeni fiyatı güncelle
    });




$(document).ready(function () {
    // Ürünler
    const products = [
        { id: 1, name: 'Elma', price: 10, img: 'elma.jpg' },
        { id: 2, name: 'Armut', price: 15, img: 'armut.jpg' },
		   { id: 3, name: 'Çikolata', price: 10, img: 'wd.jpg' },
        { id: 4, name: 'Çilek', price: 12, img: 'dwdw.jpg' },
		   { id: 5, name: 'Elma', price: 10, img: 'dwd.jpg' },
        { id: 6, name: 'Armut', price: 15, img: '2ewe.jpg' },
        // Daha fazla ürün ekleyebilirsiniz
    ];

    function renderProducts(productsToRender) {
        $('#products-list').empty();
        productsToRender.forEach(product => {
            $('#products-list').append(`
                <div class="product" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Fiyat: <span class="price">${product.price} TL</span></p>
                    <div class="quantity-control">
                        <button class="decrease">-</button>
                        <span class="quantity">1</span>
                        <button class="increase">+</button>
                    </div>
                    <button class="add-to-cart">Sepete Ekle</button>
                </div>
            `);
        });
    }

    // Başlangıçta tüm ürünleri göster
    renderProducts(products);

    // Arama fonksiyonu
    $('#search-input').on('input', function () {
        let searchTerm = $(this).val().toLowerCase();
        let filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
        renderProducts(filteredProducts);
    });

    // Sepete ekleme işlemi
    $(".add-to-cart").click(function () {
        let product = $(this).closest(".product");
        let id = product.data("id");
        let name = product.data("name");
        let price = parseFloat(product.data("price"));
        let quantity = parseInt(product.find(".quantity").text());

        // Sepetteki ürünü bul
        let existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ id, name, price, quantity });
        }

        saveCart();
        alert(`${name} sepete eklendi!`);
    });

});


    // Sepete ekleme
    $(".add-to-cart").click(function () {
        let product = $(this).closest(".product");
        let id = product.data("id");
        let name = product.data("name");
        let price = parseFloat(product.data("price"));
        let quantity = parseInt(product.find(".quantity").text());

        // Sepetteki ürünü bul
        let existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ id, name, price, quantity });
        }

        saveCart();
        alert(`${name} sepete eklendi!`);
    });
});


//


