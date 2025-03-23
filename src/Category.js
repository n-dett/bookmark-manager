class Category {
    static categoriesArr = [];

    constructor(name) {
        this._name = name;
        this._subcategoriesArr = [];
        Category.categoriesArr.push(this);
    }

    static getAllCategories() {
        return Category.categoriesArr;
    }

    addSubcategory(subcategory) {
        if(!this.subcategoriesArr.includes(subcategory)) {
            this.subcategoriesArr.push(subcategory);
        }
    }

    deleteSubcategory(subcategory) {
        const subcatIndex = this._subcategoriesArr.indexOf(subcategory);
        if(subcatIndex >= 0) {
            this._subcategoriesArr.splice(subcatIndex, 1);
        }
    }

    get name() {return this._name;}
    get subcategoriesArr() {return this._subcategoriesArr;}
}


const schoolCategory = new Category("School");

const designCategory = new Category("Design");
designCategory.addSubcategory("Fonts");
designCategory.addSubcategory("Inspiration");

export { Category }