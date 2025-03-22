class Category {
    constructor(name) {
        this.name = name;
        this.subcategories = [];
    }

    addSubcategory(subcategory) {
        if(!this.subcategories.includes(subcategory)) {
            this.subcategories.push(subcategory);
        }
    }

    deleteSubcategory(subcategory) {
        const subcatIndex = this.subcategories.indexOf(subcategory);
        if(subcatIndex >= 0) {
            this.subcategories.splice(subcatIndex, 1);
        }
    }
}