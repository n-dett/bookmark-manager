class Bookmark {
    constructor(name, url, category, subcategory, favorite) {
        console.log("New bookmark!");
        this._name = name;
        this._url = addProtocol(url);
        this._category = category;
        this._subcategory = subcategory;
        // Boolean
        this._favorite = favorite;
    }

    // Getters
    get name() {return this._name}
    get url() {return this._url}
    get category() {return this._category}
    get subcategory() {return this._subcategory}
    get favorite() {return this._favorite}

    // Setters
    set name(newName) {this._name = newName}
    set url(newUrl) {this._url = addProtocol(newUrl)}
    set category(newCategory) {this._category = newCategory}
    set subcategory(newSubcategory) {this._subcategory = newSubcategory}
    set favorite(newFavorite) {this._favorite = newFavorite}
}


function addProtocol(newUrl) {
    // Add 'https://' if the protocol is missing
    if (!/^https?:\/\//.test(newUrl)) {
        newUrl = 'https://' + newUrl;
    }

    return newUrl;
}


export { Bookmark, addProtocol }

