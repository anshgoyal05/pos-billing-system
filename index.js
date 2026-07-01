//Testing weather this js file is contected.
//window.alert("Hello, world!");

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

function getData(val) {
    const product = products.filter((data) => data.productId === val);
    console.log(product);
}

productFilterInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
        getData(event.target.value);
    }
})