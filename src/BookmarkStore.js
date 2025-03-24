import { Bookmark } from "./bookmark";

class BookmarkStore {
    constructor() {
        this.bookmarks = [];
    }

    addBookmark(name, url, category, subcategory, favorite) {
        const bookmark = new Bookmark(name, url, category, subcategory, favorite);
        this.bookmarks.push(bookmark);
    }

    removeBookmark(bookmarkIndex) {
        this.bookmarks.splice(bookmarkIndex, 1);
    }

    get allBookmarks() {return this.bookmarks}
}

const bookmarkStore = new BookmarkStore();

bookmarkStore.addBookmark(    
    'Wikipedia', 
    'https://www.wikipedia.org/',
    null,
    null,
    false
);

bookmarkStore.addBookmark(
    'Block Links: The Search for a Perfect Solution', 
    'https://css-tricks.com/block-links-the-search-for-a-perfect-solution/',
    'Web Dev',
    null,
    false
);


export default bookmarkStore;