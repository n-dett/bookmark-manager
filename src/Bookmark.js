import bookmarkStore from "./bookmarkStore";

class Bookmark {
    constructor(title, url, category, subcategory, favorite) {
        this._title = title;
        this._url = url;
        this._category = category;
        this._subcategory = subcategory;
        // Boolean
        this._favorite = favorite;
    }

    // Getters
    get title() {return this._title}
    get url() {return this._url}
    get category() {return this._category}
    get subcategory() {return this._subcategory}
    get favorite() {return this._favorite}

    // Setters
    set title(newTitle) {this._title = newTitle}
    set url(newUrl) {this._url = newUrl}
    set category(newCategory) {this._category = newCategory}
    set subcategory(newSubcategory) {this._subcategory = newSubcategory}
    set favorite(newFavorite) {this._favorite = newFavorite}
}


const bookmark1 = new Bookmark(
    'Wikipedia', 
    'https://en.wikipedia.org/wiki/Main_Page',
    null,
    null,
    false
)

const bookmark2 = new Bookmark(
    'Block Links: The Search for a Perfect Solution', 
    'https://css-tricks.com/block-links-the-search-for-a-perfect-solution/',
    null,
    null,
    false
)

bookmarkStore.addBookmark(bookmark1);
bookmarkStore.addBookmark(bookmark2);


export { Bookmark }

