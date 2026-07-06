let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
    { productId: "101", productName: "Samosa", productPrice: "10" },
    { productId: "102", productName: "Pakoda", productPrice: "100" },
    { productId: "103", productName: "Vada Pav", productPrice: "20" },
    { productId: "104", productName: "Kulad Chai", productPrice: "15" }
]

const productFilterInput = document.getElementById("product-filter");
const productPriceInput = document.getElementById("product-price");
const productQtyInput = document.getElementById("product-qty");
const addToCartButton = document.getElementById("add-to-cart");
const tablebody = document.getElementById("cart-items-body");

function getData(val) {
    const product = products.filter((data) => data.productId === val);
    if (product.length <= 0) {
        window.alert("Product not found");
        return;
    }
    else {
        productFilterInput.value = product[0].productName;
        productPriceInput.value = product[0].productPrice;
        productQtyInput.focus();
        return;
    }
}

function renderData() {
    cart.forEach((item) => {
        const row = tablebody.insertRow();
        row.setAttribute("id", item.id);

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.textContent = item.name;
        cell2.textContent = item.price;
        cell3.textContent = item.quantity;
        cell4.textContent = item.total;
        cell5.innerHTML = `<button class="remove-btn" aria-label="Remove">&#10060;</button>`;
    })
}

document.addEventListener("DOMContentLoaded", () => {
    renderData();
    productFilterInput.focus();
})

function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addNewRow(productName, productPrice, productQty) {
    const row = tablebody.insertRow();
    const unquieId = Date.now().toString();
    row.setAttribute("id", unquieId);

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = productName;
    cell2.textContent = productPrice;
    cell3.textContent = productQty;
    cell4.textContent = (productPrice * productQty).toFixed(2);
    cell5.innerHTML = `<button class="remove-btn" aria-label="Remove">&#10060;</button>`;

    const item = {
        id: unquieId,
        name: productName,
        price: productPrice,
        quantity: productQty,
        total: (productPrice * productQty).toFixed(2)
    }

    cart.push(item);
    saveCartToLocalStorage();
    console.log(cart);
}

productFilterInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
        getData(event.target.value);
    }
})

addToCartButton.addEventListener("click", () => {
    if (productFilterInput.value === "" || productPriceInput.value === "" || productQtyInput.value === "") {
        window.alert("Please fill in all fields");
        return;
    }
    if (productQtyInput.value <= 0) {
        window.alert("Quantity should be greater than 0");
        return;
    }

    addNewRow(productFilterInput.value, productPriceInput.value, productQtyInput.value);

    productFilterInput.value = "";
    productPriceInput.value = "";
    productQtyInput.value = "";
    productFilterInput.focus();
})

tablebody.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-btn");
    if (button) {
        const row = button.closest("tr");
        const rowId = row.getAttribute("id");
        cart = cart.filter(data => data.id !== rowId);
        saveCartToLocalStorage();
        console.log(cart);
        row.remove();
    }
})