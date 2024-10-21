window.onload = async () => {
  let data = [];
  const counter = document.querySelector("#productCount");

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
      // Active styling
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("id");
      const filteredData = filterByCategory(data, category);
      console.log("Filtered data", filteredData);
      size = filteredData.length;
      renderProducts(filteredData);
    });
  });

  // Render all products
  renderProducts(data);
  // Set All button to active
  document.querySelector("#All").classList.add("active");
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
    const productElement = document.createElement("article");
    productElement.setAttribute("key", `${product.name}-${product.id}`);
    productElement.classList.add("product");
    productElement.innerHTML = ` 
        <img src="${imageUrl}" alt="${product.name}" />
        <div class="details">
        <h3>${product.name}</h3><br>
        <span>€ ${product.price}</span>
        </div>
      `;
    // Design has space for a description, but it's not in the assignment
    document.querySelector("#products").appendChild(productElement);

    const counter = document.querySelector("#productCount");
    counter.innerHTML = `(${products.length})`;
  });
}

function parseProductImageURL(url) {
  // parses the imageUrl in product.json so it can be used in the img tag
  const pattern = /\[http[s]?:\/\/[^\]]+\]/;
  return url.match(pattern)[0].replace("[", "").replace("]", "");
}
