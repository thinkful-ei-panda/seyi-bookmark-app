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
        <input type="text" name="title-input" class="js-title-input" placeholder="Title" required>
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
      <input type="text" name="title" value = ${title} id="title" required>
      <label for="website">Website URL:</label>
      <input type="link" name="url" value = ${url} id="link" required>
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


//
// function generateBookmarksTemplate() {
//     const allBookmarks = generateBookmarkItem();
//     let ans =
//         `<ul class="bookmarks-list">
//             ${allBookmarks}
//          </ul>`;
    
//     return ans;
// }

// function createEditTemplate(title, url) {
//     return `
//     <div class="error-container"></div>
//     <div class="create-item-box">
//       <section>
//         <h2>New bookmark</h2>
//       </section>
//       <form action="" method="post" id="js-creation-form">
//         <section>
//           <label for="url">Insert url:</label>
//           <input type="url" id="url-input" name="url" value = ${url} required>
//         </section>
//         <section class="ten-margin-top">
//           <label for="title">Title:</label>
//           <input type="text" id="title-input" name="title" value=${title} required>
//         </section>
//         <section>
//           <div class="stars ten-margin-top">
//           </div>
//         </section>
//         <section>
//           <label for="description">Description:</label>
//           <textarea id="description" name="description"></textarea>
//         </section>
//         <section id="bottom-create" class="force-row space-between">
//           <input  id="js-cancel-add" class="button-unlit set-width active-button" type="button" value="Cancel"></input>
//           <input id="js-create-button" class="button-lit set-width active-button" type="submit" value="Create">
//         </section>
//       </form>
//     </div>  
//   `;
// }

// function generateBookmarkItem() {
//     let bookmarksString = "";

//     store.bookmarks.forEach(element => {
//         if (element.rating >= store.filter) {
//             bookmarksString += bookmarkTemplate(
//                 element.id,
//                 element.title,
//                 element.url,
//                 element.desc,
//                 element.rating,
//                 element.expanded
//             );
//         }
//     });
//     return bookmarksString;
// }

// function bookmarkTemplate(id, url, title, rating, description, expanded) {
//     let expandable = ``;
//     // let stars = []

//     // for (let i = 0; i < 5; i++) {
//     //     if (i < rating) {
//     //         stars[i] = '<img src="images/star.jpg" alt="Lit Star" />';
//     //     } else {
//     //         stars[i] = '<img src="images/star.jpg" alt="Unlit Star" />';
//     //     }
//     // }

//     if (expanded) {
//         expandable =
//             `<div class="collapsible-content">
//         <p>
//         ${description}
//         </p>
//         <div class="force-row space-between">
//           <div>
//             <button data-item-id="${id}" type="button" class="delete-button active-button">Delete</button>
//           </div>
//           <form action="${url}" target="_blank">
//             <input id="visit-button" class="button-lit active-button" type="submit" value="Visit Site" />
//           </form>
//         </div>
//       </div>`;
//     }

//     return `
//             <li class="collapsible list-item">
//             // <button data-item-id="${id}" type="button" class="collapsible-button active-button">
//             //     <h2>${title}</h2>
//             //     <div class="stars">
//             //     </div>
//             // </button>
//                 ${expandable}
//             </li>`;
// }


// const generateError = function (message) {
//     return `
//       <section class="error-content">
//         <p>${message}</p>
//       </section>
//     `;
// };

export default {
  // generateBookmarksTemplate,
  // generateError,
  // bookmarkTemplate,
  // generateBookmarkItem,
  // createEditTemplate,
  homeScreen,
  bookmarkForm,
  createBookmark,
    
};