
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

export default {
    bookmarks,
    remove,
    find,
 
    addBookmark,
    filter,
    error,
    makeError,
    isAdding
};