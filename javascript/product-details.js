document.addEventListener("DOMContentLoaded", function () {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (product) {
    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-price").innerText = "$" + product.price;
    document.getElementById("product-description").innerText =
      product.description;

    const productImage = document.getElementById("product-image");

    if (product.img) {
      productImage.src = product.img;
    } else {
      productImage.src = product.image;
    }
  }
});