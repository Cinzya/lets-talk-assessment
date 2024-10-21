window.onload = async () => {
  let data = [];
  try {
    const response = await fetch("./products.json");
    data = await response.json();
    console.log("Succesfully fetched data", data);
  } catch (error) {
    console.error("Error while fetching data", error);
  }
};

function filterByCategory(data, category) {
  return data.filter((product) => product.category === category);
}
