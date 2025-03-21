class BookmarkStore {
    constructor() {
        this.bookmarks = [];
    }

    addBookmark(bookmark) {
        bookmarks.push(bookmark);
    }

    removeBookmark(bookmarkIndex) {
        bookmarks.splice(bookmarkIndex, 1);
    }

    get allBookmarks() {return this.bookmarks}
}