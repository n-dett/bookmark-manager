class Category {
    constructor(name) {
        this.name = name;
        this.subcategoriesArr = [];
    }

    addSubcategory(subcategory) {
        if(!this.subcategoriesArr.includes(subcategory)) {
            this.subcategoriesArr.push(subcategory);
        }
    }

    deleteSubcategory(subcategory) {
        const subcatIndex = this.subcategoriesArr.indexOf(subcategory);
        if(subcatIndex >= 0) {
            this.subcategoriesArr.splice(subcatIndex, 1);
        }
    }
}