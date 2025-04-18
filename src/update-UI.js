import bookmarkStore from "./bookmarkStore";
import { Bookmark } from "./bookmark";
import { Category } from "./Category";


function toggleSubcatVisibility(subCatList, caret) {
    subCatList.classList.toggle('hidden');
    if(caret.textContent === '▸') {
        caret.innerHTML = '▾';
    } else {
        caret.innerHTML = '▸';
    }
}


function toggleHeartIcon(heartIcon) {
    // heartIcon.classList.toggle('heart-active');
    heartIcon.classList.toggle("heart-active");

    // Temporarily disable hover by adding a "no-hover" class
    heartIcon.classList.add("no-hover");

    // Re-enable hover after a short delay
    setTimeout(() => {
      heartIcon.classList.remove("no-hover");
    }, 1000); // Just enough time to avoid flicker
}


function toggleModal(modal) {
    if(!modal) return;
    modal.classList.toggle('hidden');
}


function displayCards(bookmarksArr) {
    console.log(bookmarkStore.allBookmarks);

    // All cards container
    const cardsContainer = document.getElementById('bookmarks-container');

    // Clear cards
    cardsContainer.innerHTML = '';

    bookmarksArr.forEach((bookmark) => {
        const bookmarkIndex = bookmarkStore.allBookmarks.findIndex(bm => bm === bookmark);

        // Create card
        const bmCardContainer = document.createElement('div');
        bmCardContainer.classList.add('bookmark-card');
        bmCardContainer.setAttribute('data-index', `${bookmarkIndex}`);

        appendCardText(bookmark, bmCardContainer);
        appendCardButtons(bookmark, bmCardContainer);

        cardsContainer.appendChild(bmCardContainer);

    })
}


function appendCardText(bookmark, bmCardContainer) {
    // Add card text container
    const textContainer = document.createElement('div');
    textContainer.classList.add('card-text');
    bmCardContainer.appendChild(textContainer);

    // Add h3 title container
    const titleContainer = document.createElement('h3');
    textContainer.appendChild(titleContainer);

    // Add title that links to url
    const titleLink = document.createElement('a');
    titleLink.textContent = bookmark.name;
    titleLink.setAttribute('href', bookmark.url);
    titleLink.setAttribute('target', '_blank');
    titleContainer.appendChild(titleLink);

    // Add url text
    const urlText = document.createElement('p');
    urlText.classList.add('url-text');
    urlText.textContent = bookmark.url;
    textContainer.append(urlText);
}


function appendCardButtons(bookmark, bmCardContainer) {
    // Add buttons container
    const btnsContainer = document.createElement('div');
    btnsContainer.classList.add('card-btns');

    // Heart button
    const heartBtn = document.createElement('button');
    heartBtn.classList.add('heart-btn');
    
    // Heart svg
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const heartSvg = document.createElementNS(svgNamespace, 'svg');
    if(bookmark.favorite) {
        heartSvg.classList.add('heart-active');
    }
    heartSvg.setAttribute('viewbox', '0 0 24 24');
    heartSvg.setAttribute('xmlns', svgNamespace);
    const heartPath = document.createElementNS(svgNamespace, "path");
    heartPath.setAttribute('d', 'M20.808 11.079C19.829 16.132 12 20.5 12 20.5s-7.829-4.368-8.808-9.421C2.227 6.1 5.066 3.5 8 3.5a4.444 4.444 0 0 1 4 2 4.444 4.444 0 0 1 4-2c2.934 0 5.773 2.6 4.808 7.579z');
    // Append heart button
    heartSvg.appendChild(heartPath);
    heartBtn.appendChild(heartSvg);
    btnsContainer.appendChild(heartBtn);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    // Edit svg
    const editSvg = document.createElementNS(svgNamespace, 'svg');
    editSvg.setAttribute('viewbox', '0 0 24 24');
    editSvg.setAttribute('xmlns', svgNamespace);
    const editPath = document.createElementNS(svgNamespace, "path");
    editPath.setAttribute('d', 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 14-3 1 1-3 7-7 2 2z');
    // Append edit button
    editSvg.appendChild(editPath);
    editBtn.appendChild(editSvg);
    btnsContainer.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    // Delete svg
    const deleteSvg = document.createElementNS(svgNamespace, 'svg');
    deleteSvg.setAttribute('viewbox', '0 0 24 24');
    deleteSvg.setAttribute('xmlns', svgNamespace);
    const deletePath = document.createElementNS(svgNamespace, "path");
    deletePath.setAttribute('d', 'M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.707,12.293a1,1,0,1,1-1.414,1.414L12,13.414,9.707,15.707a1,1,0,0,1-1.414-1.414L10.586,12,8.293,9.707A1,1,0,0,1,9.707,8.293L12,10.586l2.293-2.293a1,1,0,0,1,1.414,1.414L13.414,12Z');
    // Append delete button
    deleteSvg.appendChild(deletePath);
    deleteBtn.appendChild(deleteSvg);
    btnsContainer.appendChild(deleteBtn);

    bmCardContainer.appendChild(btnsContainer);
}


function displayCategoryBtns() {
    const categoriesArr = Category.getAllCategories();
    // Clear current dynamic category buttons
    const dynamicBtns = document.querySelectorAll('.category-btn:not(.static)');
    if(dynamicBtns) {
        dynamicBtns.forEach(btn => btn.remove());
    }
    
    // Clear subcategory buttons
    const subcategoryBtns = document.querySelectorAll('.subcategory-btn');
    if(subcategoryBtns) {
        subcategoryBtns.forEach(btn => btn.remove());
    }

    // Clear containers
    const categoryContainers = document.querySelectorAll('.category-btns-container');
    categoryContainers.forEach(container => container.remove());


    // Append categories
    const categoryNav = document.getElementById('category-nav')

    categoriesArr.forEach(category => {
        if (!category || !category.name) return;
        // Create category buttons container
        const categoryBtnsContainer = document.createElement('div');
        categoryBtnsContainer.classList.add('category-btns-container');
        categoryNav.appendChild(categoryBtnsContainer);

        // Create category button
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add('category-btn');

        const categoryText = document.createElement('span');
        categoryText.classList.add('category-name');
        categoryText.textContent = category.name;

        categoryBtn.appendChild(categoryText);
        categoryBtnsContainer.appendChild(categoryBtn);

        // If the category has subcategories
        if(category.subcategoriesArr.length) {
            // Add caret
            const caret = document.createElement('span');
            caret.classList.add('caret');
            caret.innerHTML= '&#9656';
            categoryBtn.appendChild(caret);

            // Create subcategories list
            const subcategoryList = document.createElement('ul');
            subcategoryList.classList.add('subcategory-list');
            subcategoryList.classList.add('hidden');

            category.subcategoriesArr.forEach(subcategory => {
                const subcategoryBtn = document.createElement('button');
                subcategoryBtn.classList.add('subcategory-btn');
                // subcategory is a string
                subcategoryBtn.textContent = subcategory;
                subcategoryList.appendChild(subcategoryBtn);
            })

            categoryBtnsContainer.appendChild(subcategoryList);
        }
    });
    console.log(document.querySelectorAll('.category-btns-container'));
}


function populateCategoryDropdown(dropdownID) {
    const dropdown = document.getElementById(dropdownID);

    // Clear options
    while(dropdown.firstChild) {
        dropdown.removeChild(dropdown.firstChild);
    }

    // Populate with current categories
    if(dropdownID != 'add-subcategory-category-dropdown'){
        const optionNone = document.createElement('option');
        optionNone.textContent = 'None';
        dropdown.appendChild(optionNone);
    }

    Category.getAllCategories().forEach(category => {
        const newOption = document.createElement('option');
        newOption.textContent = category.name;
        dropdown.appendChild(newOption);
    })
}

function hideAddSubcategoryBtn(bool) {
    const subcatBtn = document.getElementById('add-subcategory-btn');
    if(bool) {
        if(!subcatBtn.classList.contains('hidden')) {
            subcatBtn.classList.add('hidden');
        } 
    } else {
        if(subcatBtn.classList.contains('hidden')) {
            subcatBtn.classList.remove('hidden');
        } 
    }
}


function populateSubcategoryDropdown(subcategoryDropdownID, categoryDropdownID) {
    const subcategoryDropdown = document.getElementById(subcategoryDropdownID);
    const categoryDropdown = document.getElementById(categoryDropdownID);

    // Clear subcategory options
    while(subcategoryDropdown.firstChild) {
        subcategoryDropdown.removeChild(subcategoryDropdown.firstChild);
    }

    // Populate with current categories
    const optionNone = document.createElement('option');
    optionNone.textContent = 'None';
    optionNone.value = 'None';
    subcategoryDropdown.appendChild(optionNone);

    const parentCategory = categoryDropdown.value;
    const categories = Category.getAllCategories();
    const parentCategoryObj = categories.find(category => category.name === parentCategory);


    if(parentCategoryObj) {
        parentCategoryObj.subcategoriesArr.forEach(subcategory => {
            const newOption = document.createElement('option');
            newOption.textContent = subcategory;
            newOption.value = subcategory;
            subcategoryDropdown.appendChild(newOption);
        })
    }
}



function hideDeleteCategoryBtn(bool) {
    const deleteCategoryBtn = document.getElementById('delete-category-btn');

    if(bool === true) {
        deleteCategoryBtn.classList.add('hidden');
    } else {
        if(deleteCategoryBtn.classList.contains('hidden')) {
            deleteCategoryBtn.classList.remove('hidden');
        }
    }
}


function changeCategoryHeading(categoryName) {
    const categoryHeading = document.getElementById('category-heading');
    categoryHeading.textContent = categoryName;

    if(categoryName === 'All' || categoryName === 'Favorites'){
        hideDeleteCategoryBtn(true);
    } else {
        hideDeleteCategoryBtn(false);
    }


}


function removeCategoryBtns(categoryBtns, categoryName) {
    const categoryBtnsArr = Array.from(categoryBtns);
    for(let btn of categoryBtnsArr) {
        if(btn.textContent === categoryName) {
            btn.remove();
        }
    }
}


function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('hidden');
    sidebar.classList.toggle('sidebar-mobile-visible');
}



function renderUI() {
    displayCards(bookmarkStore.allBookmarks);
    displayCategoryBtns();
    hideDeleteCategoryBtn(true);
    populateCategoryDropdown('new-bookmark-category-dropdown');
    populateCategoryDropdown('edit-bookmark-category-dropdown');
}


export { 
    toggleSubcatVisibility, 
    toggleHeartIcon, 
    toggleModal, 
    displayCards, 
    displayCategoryBtns,
    renderUI,
    changeCategoryHeading,
    removeCategoryBtns,
    populateSubcategoryDropdown,
    populateCategoryDropdown,
    hideAddSubcategoryBtn,
    toggleMobileSidebar
}