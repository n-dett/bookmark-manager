import { Bookmark } from "./bookmark";

class BookmarkStore {
    constructor() {
        this.bookmarks = [];
    }

    addBookmark(title, url, category, subcategory, favorite) {
        const bookmark = new Bookmark(title, url, category, subcategory, favorite);
        this.bookmarks.push(bookmark);
    }

    removeBookmark(bookmarkIndex) {
        this.bookmarks.splice(bookmarkIndex, 1);
    }

    get allBookmarks() {return this.bookmarks}
}

const bookmarkStore = new BookmarkStore();


export default bookmarkStore;