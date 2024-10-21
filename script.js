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
    });
  });
};

function filterByCategory(data, category) {
  if (category === "All") {
    return data;
  }
  return data.filter((item) => item.category === category);
}
