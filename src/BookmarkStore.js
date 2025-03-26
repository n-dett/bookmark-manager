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
    'Earl Grey Cookies', 
    'https://www.aspicyperspective.com/earl-grey-cookies-tea-cakes/',
    'Recipes',
    'Dessert',
    true
);

bookmarkStore.addBookmark(
    'Block Links: The Search for a Perfect Solution', 
    'https://css-tricks.com/block-links-the-search-for-a-perfect-solution/',
    'JavaScript',
    null,
    true
);

bookmarkStore.addBookmark(
    'Unsplash', 
    'https://unsplash.com/',
    'Design',
    'Stock Photos',
    false
);

bookmarkStore.addBookmark(
    'Gentle Explanation of "this" in JavaScript', 
    'https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/',
    'JavaScript',
    null,
    false
);

bookmarkStore.addBookmark(    
    'Easy Lentil Shepherd’s Pie (vegetarian)', 
    'https://www.spendwithpennies.com/easy-lentil-shepherds-pie-vegetarian/',
    'Recipes',
    'Dinner',
    false
);

bookmarkStore.addBookmark(
    'Google Fonts', 
    'https://fonts.google.com/',
    'Design',
    'Fonts',
    false
);

bookmarkStore.addBookmark(
    'JavaScript error reference', 
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors',
    'JavaScript',
    null,
    false
);

bookmarkStore.addBookmark(    
    'Sesame Garlic Ramen Noodles', 
    'https://themodernproper.com/sesame-garlic-ramen-noodles',
    'Recipes',
    'Dinner',
    false
);

bookmarkStore.addBookmark(
    'Font Squirrel', 
    'https://www.fontsquirrel.com/',
    'Design',
    'Fonts',
    false
);

bookmarkStore.addBookmark(    
    'Garden Vegetable Quinoa Soup', 
    'https://www.budgetbytes.com/garden-vegetable-quinoa-soup/',
    'Recipes',
    'Dinner',
    false
);

bookmarkStore.addBookmark(
    'Pixabay', 
    'https://pixabay.com/',
    'Design',
    'Stock Photos',
    false
);

export default bookmarkStore;