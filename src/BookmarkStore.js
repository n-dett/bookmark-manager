class BookmarkStore {
    constructor() {
        this.bookmarks = [];
    }

    addBookmark(bookmark) {
        this.bookmarks.push(bookmark);
    }

    removeBookmark(bookmarkIndex) {
        this.bookmarks.splice(bookmarkIndex, 1);
    }

    get allBookmarks() {return this.bookmarks}
}

const bookmarkStore = new BookmarkStore();


export default bookmarkStore;