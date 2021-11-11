"use strict";
// ========== GLOBAL VARIABLER =========
let _categories = [];
let _data;
let _searches = [];

const _baseUrl = "https://api.jsonbin.io/b/618120f7aa02be1d4462754e";
const _headers = {
  "X-Master-Key":
    "$2b$10$5DEHz9MIE9TIv8IqBuQRju.qGk9/Z0.CioC42q5ZBlEKw/iAcZMq.",
  "Content-Type": "application/json",
};

async function loadCategories() {
  const url = _baseUrl + "/latest"; // make sure to get the latest version
  const response = await fetch(url, {
    headers: _headers,
  });
  const data = await response.json();
  console.log(data);
  _categories = data;
  appendCategories(_categories);
  inspirationCategories(_categories);
}
loadCategories();

function appendCategories(categories) {
  let htmlTemplate = "";
  for (const category of categories) {
    htmlTemplate += /*html*/ `
      <article>
        <h2>${category.Name}</h2>
        <p>${category.Children[0].Name}</p>
        <img src="${category.ImageUrl}">
      </article>
      `;
  }
  document.querySelector("#grid-categories").innerHTML = htmlTemplate;
}

// LANGUAGE SWAP
var selectedLanguage = document.getElementById("selected_language");
var smallLanguage = document.getElementsByClassName("small_language");

smallLanguage[0].onclick = function () {
  selectedLanguage.src = smallLanguage[0].src;
};

smallLanguage[1].onclick = function () {
  selectedLanguage.src = smallLanguage[1].src;
};

//FIND INSPIRATION SECTION
function inspirationCategories(categoriesHome) {
  let htmlTemplate = "";
  for (const category of categoriesHome) {
    htmlTemplate += /*html*/ `
    <div class="flex">
   <article class="citybox2">
     <img class="citybox2-img" src="${category.ImageUrl}">
    </article>
    <div class="box1txt box1txt2">
    <p>${category.Name}</p>
    </div></div>
    
    `;
  }
  document.querySelector("#homebox1").innerHTML = htmlTemplate;
}
// Fetch data.json
async function getData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  return data;
}

// Filtrer alle Arrays der har id: '63' og '62'
async function getDataByCategory(id) {
  const results = _data.filter((item) => item.Category.Id === id);
  console.log(results);

  restaurantOnClick(results);
}

async function getDataByMainCategory(id) {
  const results = _data.filter((item) => item.MainCategory.Id === id);
  console.log(results);
  return results;
}

async function init() {
  _data = await getData();
  console.log(_data);
  await getDataByCategory(63);
  await getDataByMainCategory(62);
}

init();

// FILTER
function restaurantOnClick(restaurants) {
  let htmlTemplate = "";
  for (const restaurant of restaurants) {
    for (const Files of restaurant.Files) {
      htmlTemplate += /*html*/ `
    <section>
    <span class="iconify iconify7" data-icon="bytesize:heart"></span>
    <img class="filter-img" src="${Files.Uri}">
    <p class="restaurantName">${restaurant.Name}</p>
    </section>
    `;
    }
  }
  document.querySelector("#restaurantview").innerHTML = htmlTemplate;
}

// DETAIL VIEW
function detailview(categoriesDetail) {
  let htmlTemplate = "";
  for (const category of categoriesDetail) {
    htmlTemplate += /*html*/ `
    <p>${category.Name}</p>
    `;
  }
  document.querySelector("#detailView").innerHTML = htmlTemplate;
}

//SEARCH FUNCTION
function appendResultSearch(data) {
  let htmlDrinks = "";
  for (const filteredData of data) {
    htmlTemplate += /*html*/ `
    <article class="result-section" onclick="showData('${filteredData.id}')">
      <div class="result-card">
      
        <div class="${filteredData.Children[0].Name}">
          <img src="${filteredData.ImageUrl}">
        </div>
        
      </div>
    </article>  
    `;
  }
  document.querySelector("#search-result").innerHTML = htmlDrinks;
}

function search(searchValue) {
  searchValue = searchValue.toLowerCase();
  console.log(searchValue);
  let results = [];
  for (const searchedData of _data) {
    let name = searchedData.name.toLowerCase();
    if (name.includes(searchValue)) {
      results.push(searchedData);
    }
  }
  appendResultSearch(results);
}

/*
function search(searchValue) {
  searchValue = searchValue.toLowerCase();
  console.log(searchValue);

  let results = [];

  for (const search of _data) {
    console.log(search);
    let name = search.name.toLowerCase();
    if (name.includes(searchValue)) {
      results.push(search);
    }
  }

  appendCategories(results);
}
*/
