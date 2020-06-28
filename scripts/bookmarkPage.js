import store from './store.js';
import template from './template.js';
import api from './api.js';

function render() {
    if (store.isAdding) {
        
        let bookmarkForm = template.bookmarkForm(getTitle(), getURL());
        $('main').html(bookmarkForm);
        
    } else {
        const bookmarkList = template.createBookmark();

        $('main').html(bookmarkList);
    }
}

function getTitle() {
    
    let ans = $(".js-title-input").val();

    if(ans === 'undefined') {
        return ''
    }
    return ans;
}

function getURL() {
    let ans = $(".js-url-input").val();

    if(ans === 'undefined') {
        return ''
    }

    return ans;
}
function getID(bookmark) {
    return $(bookmark).closest('li').data('item-id');
}

function handleNewButton() {
    $('main').on('click', '.js-create-bookmark-button', event =>{
        event.preventDefault();
        store.isAdding = true;
        render();
    });
}

function handleCreateButton() {
    $('main').on('submit', '#js-bookmark-list-form', event => {
        event.preventDefault();
        
        let input = {};
        
        input.title = $('#title').val();
        input.url = $('#link').val();
        input.desc = $('#desc').val();
        input.rating = $('#rating').val();

        api.createBookmarkAPI(input)
            .then(bookmarks => {
                store.addBookmark(bookmarks);
                store.isAdding = false;
                render();
            })
            .catch((error) => {
                store.makeError(error.message);
                renderError();
            });
    });
}

function handleCancel() {
    $('main').on('click', '.js-cancel', event => {
        event.preventDefault();
        store.isAdding = false;
        render();
        store.makeError(null);
        renderError();
    });
}

function handleDelete() {
    $('main').on('click', '.js-delete', event => {
        event.preventDefault();
        let id = getID(event.currentTarget);
        api.deleteBookmark(id)
            .then(() => {
                store.remove(id);
                render();
            })
            .catch((error) => {
                store.makeError(error.message);
                renderError();
            });
    });
}

function handleFilter() {
    $('main').on('change', '#js-filter', event => {
        store.filter = $('option:selected').val();
        render();
    });
}

function handleExpand() {
    $('main').on('click', '.js-item-element', event => {
        const id = getID(event.currentTarget);
        const curr = store.find(id);
        curr.expanded = !curr.expanded;
        render();
    });
}

const renderError = function () {
    if (store.error !== null) {
      const errorHTML = template.generateError(store.error);
      $('.error-container').html(errorHTML);
    } else {
      $('.error-container').empty();
    }
  };




function bindEventListeners() {
    handleNewButton();
    handleCreateButton();
    handleCancel();
    handleDelete();
    handleFilter();
    handleExpand();
    

}
export default {
    render,
    bindEventListeners,
};