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
const totalItems = document.getElementById("total-items");
const subTotal = document.getElementById("sub-total");
const gst = document.getElementById("GST");
const grantTotal = document.getElementById("grant-total");
const invoice = document.getElementById("invoice");
const invoiceItems = document.getElementById("invoice-items");
const invoiceNumber = document.getElementById("invoice-number");
const invoiceDate = document.getElementById("invoice-date");
const invoiceTime = document.getElementById("invoice-time");
const invoiceSubtotal = document.getElementById("invoice-subtotal");
const invoiceGst = document.getElementById("invoice-gst");
const invoiceGrandTotal = document.getElementById("invoice-grandtotal");
const finalBillButton = document.getElementById("finalbill");

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

function billCalculation() {

    let st = 0.0;
    let tax = 0.0;
    totalItems.textContent = cart.length;
    cart.forEach((item) => {
        st += parseFloat(item.total);
    });
    tax = st * 0.18;
    subTotal.textContent = st.toFixed(2);
    gst.textContent = tax.toFixed(2);
    grantTotal.textContent = (st + tax).toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
    invoice.style.display = "none";
    renderData();
    billCalculation();
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
    billCalculation();
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
        billCalculation();
        row.remove();
    }
})

function generateInvoice() {
    if (cart.length === 0) {
        window.alert("Cart is empty");
        return;
    }

    const now = new Date();
    invoiceNumber.textContent = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
    invoiceDate.textContent = now.toLocaleDateString("en-IN");
    invoiceTime.textContent = now.toLocaleTimeString("en-IN");

    invoiceItems.innerHTML = "";

    let subtotal = 0;
    cart.forEach((item) => {
        subtotal += parseFloat(item.total);

        const row = invoiceItems.insertRow();
        const itemNameCell = row.insertCell(0);
        const itemPriceCell = row.insertCell(1);
        const itemQtyCell = row.insertCell(2);
        const itemTotalCell = row.insertCell(3);

        itemNameCell.textContent = item.name;
        itemPriceCell.textContent = item.price;
        itemQtyCell.textContent = item.quantity;
        itemTotalCell.textContent = parseFloat(item.total).toFixed(2);
    });

    const gstAmount = subtotal * 0.18;
    invoiceSubtotal.textContent = subtotal.toFixed(2);
    invoiceGst.textContent = gstAmount.toFixed(2);
    invoiceGrandTotal.textContent = (subtotal + gstAmount).toFixed(2);
    invoice.style.display = "block";
    invoice.classList.add("show");
}

finalBillButton.addEventListener("click", generateInvoice);