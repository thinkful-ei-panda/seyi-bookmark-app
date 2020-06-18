
const bookmarks = [];
const error = null;
const filter = 1;
const expanded = { expanded: false };
const isAdding = false;


function find(id) {
    return this.bookmarks.find(curr => curr.id === id);
}

function addBookmark(bookmark) {
    $.extend(bookmark, expanded);
    this.bookmarks.push(bookmark);
}

function remove(id) {
    this.bookmarks = this.bookmarks.filter(curr => curr.id !== id);
}

function makeError() {
    this.error = error;
}

// function createBookmark(title, url) {
//     // this.bookmarks.forEach(element => {
//     //     if (title === element.title) {
//     //         throw new Error("No duplicate titles");
//     //     } else if (url === element.url) {
//     //         throw new Error("No duplicate urls");
//     //     }
//     // });
//     let curr = new bookmark.bookmark(title, url);
//     // this.bookmarks.push(curr);
//     return curr;
// }

// function changeUrl(title, input) { 
//     find(title).url = input; 

// }

// function changeTitle(title, input) {
//     find(title).title = input; 

// }

// function changeRating(title, input) {
//     find(title).rating = input; 

// }

// function changeDescription(title, input) {
//     find(title).description = input; 

// }



// let test = new bookmark("testing", 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes');
// test.desc = 'this is a test';
// test.rating = 5;
// console.log(test);

// test.desc = 'this is';
// console.log(test);

// let test2 = new bookmark("changing", "export default {};");
// console.log(test, test2);

// let test = createBookmark("test", "let curr = new bookmark(title, url); this.bookmarks.push(curr);");
// let test2 = createBookmark("testing", "123");
// console.log(test,test2,bookmarks);

// let test = createBookmark("test", "let curr = new bookmark(title, url); this.bookmarks.push(curr);");
// console.log(test, bookmark);

// changeUrl(test.title, "123");
// console.log(bookmarks);

export default {
    bookmarks,
    // createBookmark,
    remove,
    find,
    // changeDescription,
    // changeRating,
    // changeTitle,
    // changeUrl,
    addBookmark,
    filter,
    error,
    makeError,
    isAdding
};