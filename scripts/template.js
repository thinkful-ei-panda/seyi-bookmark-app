import store from './store.js';


function homeScreen(htmlList) {
  let htmlHome =`
  <div class="wrapper">
    <div>
      <header>
        <h1>My Bookmarks</h1>
      </header>

    <div>
      <form class="bookmark-form">
        <label for="title">Add Bookmark Title:</label>
        <input type="text" name="title-input" class="js-title-input" placeholder="Title" required>
        <label for="website">Website URL:</label>
        <input type="text" name="url-input" class="js-url-input" placeholder="https://" required>
        <button class="js-create-bookmark-button">New</button>
      </form>
      </div>
    <div>
      <select class "js-filter" id="js-filter" name="filter">
        <option value="">Filter By Rating</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </select>
      </div>

    <div class = "book-list">
      <ul>
        ${htmlList}
      </ul>
    </div>
    </div>`;
  return htmlHome;
}

function bookmarkForm(title, url) {
  let error = ``;

  if (store.error) {
    error = `${store.error}`;
  }

  const form = `<form class = "js-bookmark-list-form" id="js-bookmark-list-form">
      <label for="title">Add Bookmark Title:</label>
      <input type="text" name="title" id="title" required value = ${title}  >
      <label for="website">Website URL:</label>
      <input type=text name="url" id="link" required value = ${url}>
      <select id="rating" name="rating" required>
        <option value="">Please Select A Rating</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </select>
      <label for="descript">Write Description Here:</label>
      <input type="text" name="desc" placeholder="Add Description Here" id="desc" required>
      ${error}
      <button class="js-submit" type="submit">Create</button>
      <button class="js-cancel" type="cancel">Cancel</button>
    </form>`;
  
  return form;
  
}

function createBookmark() {
  let list = ``;

  store.bookmarks.forEach(element => {
    let expandable = ``;

    if (element.expanded) {
      expandable = `<div class = "book-list">
          <div><p>${element.desc}</p>
          </div>
          <div>
            <a href = "${element.url}">Visit Webpage</a>
          </div>
          <div>
            <button class = "js-delete">Remove</button>
          </div>
        </div>`;
    }

    if (element.rating >= store.filter) {
      list += `<li class = "js-item-element" data-item-id = "${element.id}">
        ${element.title} <span>${element.rating}</span>
        ${expandable}
      </li>`;
    } else {
      list += ``;
    }
    
  });
  return homeScreen(list);
}




export default {
  homeScreen,
  bookmarkForm,
  createBookmark,
    
};