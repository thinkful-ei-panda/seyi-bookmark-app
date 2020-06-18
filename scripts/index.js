import bookmarkPage from './bookmarkPage.js';
import api from './api.js';
import store from './store.js';



function main() {
    api.getBookmarkAPI()
        .then((items) => {
            items.forEach((item) => store.addBookmark(item));
            bookmarkPage.render();
        });

    bookmarkPage.bindEventListeners();
    bookmarkPage.render();
}
$(main);
