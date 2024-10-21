window.onload = async () => {
  let data = [];

  // Fetch data
  try {
    const response = await fetch("./products.json");
    data = await response.json();
    console.log("Succesfully fetched data", data);
  } catch (error) {
    console.error("Error while fetching data", error);
  }

  // Filter on button click
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("id");
      const filteredData = filterByCategory(data, category);
      console.log("Filtered data", filteredData);
      renderProducts(filteredData);
    });
  });
};

function filterByCategory(data, category) {
  if (category === "All") {
    return data;
  }
  return data.filter((item) => item.category === category);
}

function removeProductsFromDOM() {
  const products = document.querySelector("#products");
  while (products.firstChild) {
    products.removeChild(products.firstChild);
  }
}

function renderProducts(products) {
  removeProductsFromDOM();
  products.forEach((product) => {
    const imageUrl = parseProductImageURL(product.imageUrl);
    const productElement = document.createElement("div");
    productElement.setAttribute("key", `${product.name}-${product.id}`);
    productElement.classList.add("product");
    productElement.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <span>${product.price}</span>
      `;
    document.querySelector("#products").appendChild(productElement);
  });
}

function parseProductImageURL(url) {
  // parses the imageUrl in product.json so it can be used in the img tag
  const pattern = /\[http[s]?:\/\/[^\]]+\]/;
  return url.match(pattern)[0].replace("[", "").replace("]", "");
}
