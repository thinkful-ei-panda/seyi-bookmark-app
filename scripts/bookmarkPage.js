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
    return ans;
}

function getURL() {
    let ans = $(".js-url-input").val();
    return ans;
}
function getID(bookmark) {
    return $(bookmark).closest('li').data('item-id');
}

function handleNewButton() {
    $('main').on('click', '.js-create-bookmark-button', event =>{
        event.preventDefault();
        store.isAdding = !store.isAdding;
        render();
        // store.filterMenuOpen = false;
        // store.setExpansionsFalse();
        // render('footer', '');
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
                store.isAdding = !store.isAdding;
                render();
            })
            .catch((error) => {
                store.makeError(error.message);
                render();
            });
    });
}

function handleCancel() {
    $('main').on('click', '.js-cancel', event => {
        event.preventDefault();

        

        store.isAdding = !store.isAdding;
        render();
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
                render();
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


/////////////////////////////////////////////////////


// function handleNewButton() {
//     $('body').on('.create-bookmark-button', function () {
//         event.preventDefault();
//         render('main', template.createEditTemplate($(".js-title-input").val(), $(".js-url-input").val()));
//         // store.filterMenuOpen = false;
//         // store.setExpansionsFalse();
//         // render('footer', '');
//     });

// }

// function handleCreateButton() {
//     $('main').on('submit', '#js-creation-form', function () {
//         const title = $('#url-input').val();
//         const url = $('#title-input').val();
//         const desc = $('#description').val();

//         const creation = store.createBookmark(title, url);
//         creation.desc = desc;

//         api.createBookmark(creation)
//             .then((creation) => {
//                 store.addBookmark(creation);
//                 checkInitial();
//             })
//             .catch((error) => {
//                 store.setError(error.message);
//                 renderError();
//             });
//         store.rating = 0;

//     });
// }
// function checkInitial() {
//     if (store.bookmarks.length > 0) {
//         render('main', template.generateBookmarksTemplate);
//         // store.filterMenuOpen = false;
//         // render('footer', template.footerTemplate());
//     } 
//     //else {
//     //     render('main', template.initialViewTemplate);
//     // }
// }

// function renderError() {
//     if (store.error) {
//         const errorHtml = template.generateError(store.error);
//         $('.error-container').html(errorHtml);
//     } else {
//         $('.error-container').empty();
//     }
// }


function bindEventListeners() {
    // renderError();
    handleNewButton();
    handleCreateButton();
    // checkInitial();
    handleCancel();
    handleDelete();
    handleFilter();
    handleExpand();
    

}
export default {
    render,
    bindEventListeners,
    // checkInitial,
};