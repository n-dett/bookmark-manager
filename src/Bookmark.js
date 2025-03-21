class Bookmark {
    constructor(title, url, category, subcategory, favorite) {
        this._title = title;
        this._url = url;
        this._category = category;
        this._subcategory = subcategory;
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