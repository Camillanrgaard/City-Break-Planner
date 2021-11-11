"use strict";
// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  }
}

// navigate to a new view/page by changing href
function navigateTo(pageId) {
  location.href = `#${pageId}`;
}

// set default page or given page by the hash url
// function is called 'onhashchange'
function pageChange() {
  let page = "login";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}
pageChange(); // called by default when the app is loaded for the first time

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  console.log(pageId);
  if (pageId === "login") {
    showTabbar(false);
    showHeader(false);
  } else {
    showTabbar(true);
    showHeader(true);
  }
  setActiveTab(pageId);
}

function showHeader(show) {
  let tabbar = document.querySelector(".topbar");
  if (show) {
    tabbar.classList.remove("hide");
  } else {
    tabbar.classList.add("hide");
  }
}

function showTabbar(show) {
  let tabbar = document.querySelector(".tabbar");
  if (show) {
    tabbar.classList.remove("hide");
  } else {
    tabbar.classList.add("hide");
  }
}
