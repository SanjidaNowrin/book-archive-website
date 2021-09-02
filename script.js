const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("search-result");
const errorDiv = document.getElementById("error");
const searchBtn = (value) => {
  const searchText = searchInput.value;
  // clear data
  searchInput.value = "";
  errorDiv.innerText = "";
  searchResult.textContent = "";
  //error handle
  if (searchText === "") {
    errorDiv.innerText = "Sorry!No Search result Found";
  } else {
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.docs));
  }
};
//Show Book search result
const displaySearchResult = (docs) => {
  const first30Book = docs.slice(0, 30);
  //error handle for not exixting input
  if (first30Book.length === 0) {
    errorDiv.innerText = "No result Found";
    searchResult.textContent = "";
  } else {
    errorDiv.innerText = "Total Books Found:" + "" + first30Book.length;
    searchResult.textContent = "";
    first30Book.forEach((doc) => {
      const div = document.createElement("div");
      const imageUrl =
        "https://covers.openlibrary.org/b/id/" + doc.cover_i + "-M.jpg";
      div.classList.add("col");
      div.innerHTML = `
      <div class="card h-100 shadow rounded">
      <img src="${
        imageUrl ? imageUrl : ""
      }" class="card-img-top img-fluid h-75" alt="">
      <div class="card-body">
        <h3 class="card-title">${doc.title ? doc.title : "No Data"}</h3>
        <p class="card-text fst-italic text-danger">${
          doc.author_name?.[0] ? doc.author_name?.[0] : "No Data Found"
        }</p>
        <p class="card-text">Publisher: ${
          doc.publisher ? doc.publisher?.[0] : "No Data Found"
        }</p>
        <p class="card-text">First Published: ${
          doc.first_publish_year ? doc.first_publish_year : "No Data Found"
        }</p>
      </div>
    </div>
          `;
      searchResult.appendChild(div);
    });
  }
};
