const BASE_URL = 'https://thinkful-list-api.herokuapp.com/seyi';

function fetchList(...args) {
    let error;

    return fetch(...args)
        .then(response => {
            if (!response.ok) {
                error = { code: response.status };
                
                if (!response.headers.get('content-type').includes('json')) {
                    error.message = response.statusText;
                    return Promise.reject(error);
                }
            }
            return response.json();
        })
        .then(responseJson => {
            if (error) {
                error.message = responseJson.message;
                return Promise.reject(error);
            }
            return responseJson;
        });
}

function createBookmarkAPI(bookmark) {
    const newBookmark = JSON.stringify(bookmark);
    return fetchList(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    });
}

function deleteBookmark(id) {
    return fetchList(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE'
    });
}

function getBookmarkAPI() {
    return fetchList(`${BASE_URL}/bookmarks`);
}



export default {
    getBookmarkAPI,
    createBookmarkAPI,
    deleteBookmark,
    fetchList
};