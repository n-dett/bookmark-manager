import { 
    toggleHeartIcon, 
    toggleSubcatVisibility, 
    displayCategoryBtns, 
    toggleModal, 
    displayCards,
    changeCategoryHeading,
    renderUI,
    removeCategoryBtns,
    populateSubcategoryDropdown,
    populateCategoryDropdown
} from "./update-UI";
import bookmarkStore from "./bookmarkStore";
import { Category } from "./Category";
import { addProtocol } from "./bookmark";

function accordionListener() {
    // Add event to document so new buttons will have event 
    document.addEventListener('click', function(e) {
        const caret = e.target.closest('.caret');
        if(caret) {
            console.log(`caret: ${caret}`);
            e.stopPropagation();

            const categoryBtn = caret.closest('.category-btn');
            const subcatList = categoryBtn.nextElementSibling;

            // If there are no subcategories under the caret, don't add event listener
            if(!subcatList) return;

            // Toggle visibility of the subcategories
            toggleSubcatVisibility(subcatList, caret);
        }
    })
}


function heartIconListener() {
    // Add event to document so new buttons will have event 
    document.addEventListener('click', function(e) {
        if(e.target.closest('.heart-btn')) {
            console.log('heart clicked!');
            e.stopPropagation();
            const heartIcon = e.target.closest('.heart-btn').firstElementChild;
            toggleHeartIcon(heartIcon);

            // Add favorite to bookmark object
            let selectedCard = e.target.closest('.bookmark-card');
            console.log('card:', selectedCard);
            if(selectedCard) {
                const index = parseInt(selectedCard.dataset.index);
                const bookmark = bookmarkStore.allBookmarks[index];

                if(!bookmark.favorite) {
                    bookmark.favorite = true;
                } else {
                    bookmark.favorite = false;
                    

                    // If current display is Favorites, reload display     
                    const categoryHeading = document.getElementById('category-heading');
                    const categoryName = categoryHeading.textContent;
                    if(categoryName === 'Favorites') {
                        const filteredCards = filterCards('favorite', true);
                        displayCards(filteredCards);
                    }
                }
                
                selectedCard = null;
            }
            
        }
    })
}


function closeModalListener() {
    // Add event to document so new buttons will have event 
    document.addEventListener('click', function(e) {
        if(e.target.classList.contains('close-btn') || e.target.classList.contains('submit-form-btn')) {
            e.stopPropagation();
            const modal = e.target.closest('.modal-background');
            if(modal) {
                toggleModal(modal);
            }
        }
    })
}


function openModalListener(btnClass, modalId) {
    document.body.addEventListener('click', function(e) {
        const button = e.target.closest(btnClass);
        if(button) {
            e.stopPropagation();
            const modal = document.getElementById(modalId);
            if (modal) {
                toggleModal(modal);
            }
        }
    });
}


function openStaticModalListener(btnId, modalId) {
    const button = document.getElementById(btnId);
    if(button) {
        button.addEventListener('click', function(e) {
            const modal = document.getElementById(modalId);
            if(modal) {
                toggleModal(modal);
            }
        })
    }
}


/* 
    Adapted from Block Links: The Search for a Perfect Solution
    https://css-tricks.com/block-links-the-search-for-a-perfect-solution/#method-4-sprinkle-javascript-on-the-second-method
    Accessed 3/19/2025
*/ 
function cardClickListener() {
    document.addEventListener('click', function(e) {
        // Don't fire if button is clicked
        if (e.target.closest('button')) {
            return;
        }

        const card = e.target.closest('.bookmark-card');
        if(card) {
            const url = card.querySelector('h3 a');
            
            // Check if user has text selected
            const textSelected = window.getSelection().toString();
            if(!textSelected && url) {
                url.click();
            }
        }
    })
}


function addBookmarkListener() {
    // Populate Category and Subcategory dropdowns
    const categoryDropdown = document.getElementById("new-bookmark-category-dropdown");
    const subcategoryDropdown = document.getElementById("new-bookmark-subcategory-dropdown")
    const heading = document.getElementById('category-heading');
    const addBookmarkBtn = document.getElementById('add-bookmark-btn');

    addBookmarkBtn.addEventListener('click', function() {
        const headingText = heading.textContent;

        if(headingText === 'All' || headingText === 'Favorites') {
            // Category
            categoryDropdown.selectedIndex = 0;
            // Subcategory
            populateSubcategoryDropdown('new-bookmark-subcategory-dropdown', 'new-bookmark-category-dropdown');
        } else if (isCategory(headingText)) {
            // Category
            const parentIndex = Array.from(categoryDropdown.options).findIndex(category => category.value === headingText);
            categoryDropdown.selectedIndex = parentIndex;

            // Subcategory
            populateSubcategoryDropdown('new-bookmark-subcategory-dropdown', 'new-bookmark-category-dropdown');
            subcategoryDropdown.selectedIndex = 0;
            console.log('optionValue:', subcategoryDropdown.value);
            

        } else {
            // Category
            const parentCategory = findParentCategory(headingText);
            const parentCategoryName = parentCategory.name;
            const parentIndex = Array.from(categoryDropdown.options).findIndex(category => category.text === parentCategoryName);
            categoryDropdown.selectedIndex = parentIndex;

            // Subcategory
            populateSubcategoryDropdown('new-bookmark-subcategory-dropdown', 'new-bookmark-category-dropdown')
        }
    })


    // Get values of new bookmark
    const button = document.getElementById('submit-new-bookmark');
    if(button) {
        button.addEventListener('click', function() {
            // Get name
            const nameInput = document.getElementById("new-bookmark-name");
            const name = nameInput.value.trim();
            // Get url
            const urlInput = document.getElementById("new-bookmark-url");
            const url = urlInput.value.trim();
            // Get category
            const category = categoryDropdown.value === "None" ? null : categoryDropdown.value;
            // Get subcategory
            const subcategory = subcategoryDropdown.value === "None" ? null : subcategoryDropdown.value;
            // Favorite is false by default
            const favorite = false;

            bookmarkStore.addBookmark(name, url, category, subcategory, favorite);

            // Filter cards by category
            let filteredCards;
            if(!category) {
                filteredCards = bookmarkStore.allBookmarks;
                changeCategoryHeading('All');

            } else if(!subcategory) {
                changeCategoryHeading(category);
                filteredCards = filterCards('category', category);
            } else {
                changeCategoryHeading(subcategory);
                filteredCards = filterCards('subcategory', subcategory);
            }

            displayCards(filteredCards);

            nameInput.value = "";
            urlInput.value = "";
            categoryDropdown.value = "";
            subcategoryDropdown.value = "";
        })
    }
}


function deleteBookmarkListener() {
    // Add listener to all card delete buttons
    // Track which card was clicked
    let selectedCard = null;
    document.body.addEventListener('click', function(e) {
        const cardDeleteButton = e.target.closest('.delete-btn');
        if(cardDeleteButton) {
            selectedCard = e.target.closest('.bookmark-card');
        }

        // Add bookmark name to modal message
        if (selectedCard) {
            // Get the bookmark name element
            const selectedCardName = document.getElementById('delete-bookmark-name');
            const cardH3 = selectedCard.querySelector('h3');
        
            // Check if h3 element exists before updating the text content
            if (cardH3 && selectedCardName) {
                selectedCardName.textContent = cardH3.textContent;
            }
        }
    });

    
    // Add listener to confirm delete button
    const confirmDeleteButton = document.getElementById("submit-delete-bookmark");
    confirmDeleteButton.addEventListener('click', function(e) {
        if(selectedCard) {
            // Delete the card
            const index = parseInt(selectedCard.dataset.index);
            bookmarkStore.removeBookmark(index);
            // displayCards(bookmarkStore.allBookmarks);
            // changeCategoryHeading('All');

            const currentHeading = document.getElementById('category-heading');
            const headingText = currentHeading.textContent;
            console.log('heading text', headingText);
            let filteredCards;

            if(headingText === 'All') {
                displayCards(bookmarkStore.allBookmarks);
            } else if(isCategory(headingText)) {
                filteredCards = filterCards('category', headingText);
                displayCards(filteredCards);
            } else {
                filteredCards = filterCards('subcategory', headingText);
                displayCards(filteredCards);
            }

            selectedCard = null;
        }
    })
}


function addCategoryListener() {
    const button = document.getElementById('submit-new-category');
    const categoryDropdown = document.getElementById('new-category-name');
    button.addEventListener('click', function(e) {
        const categoryName = categoryDropdown.value;
        new Category(categoryName);
        displayCategoryBtns();
        populateCategoryDropdown('new-bookmark-category-dropdown');
        populateCategoryDropdown('edit-bookmark-category-dropdown');
    })
}


function deleteCategoryListener() {
    const deleteCategoryBtn = document.getElementById('delete-category-btn');
    let categoryName;
    deleteCategoryBtn.addEventListener('click', function (e) {
        categoryName = document.getElementById('category-heading').textContent;
        const modalText = document.getElementById('delete-category-name');
        if(modalText && categoryName) {
            modalText.textContent = categoryName;
        }
        console.log('is category?', isCategory(categoryName));
        if(!isCategory(categoryName)) {
            const modalCategoryText = document.getElementById('modal-message-category');
            modalCategoryText.textContent = 'subcategory';
        }
    })


    const confirmDeleteButton = document.getElementById('submit-delete-category');
    confirmDeleteButton.addEventListener('click', function(e) {

        // Check if heading was a category or subcategory
        if(isCategory(categoryName)) {
            // Remove category from array
            Category.removeCategory(categoryName);

            // Remove category from nav
            const catgoryBtns = document.querySelectorAll('.category-btn');
            removeCategoryBtns(catgoryBtns, categoryName);

            // Delete all bookmarks from this category
            for (let i = bookmarkStore.allBookmarks.length - 1; i >= 0; i--) {
                if (bookmarkStore.allBookmarks[i].category === categoryName) {
                    bookmarkStore.removeBookmark(i);
                }
            }
        } else {
            // Heading is a subcategory
            const parentCategory = findParentCategory(categoryName);

            // Remove subcategory from category
            parentCategory.deleteSubcategory(categoryName);

            // Remove subcategory from nav
            const subcategoryBtns = document.querySelectorAll('subcategory-btn');
            removeCategoryBtns(subcategoryBtns, categoryName);

            // Delete all bookmarks from the subcategory
            const allBookmarks = bookmarkStore.allBookmarks;
            for(let i = 0; i < allBookmarks.length; i++) {
                if (allBookmarks[i].subcategory === categoryName) {
                    bookmarkStore.removeBookmark(i);
                }
            }
        }

        // Reload UI
        renderUI();
        changeCategoryHeading('All');
    })

}


function displayCategoryListener() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.category-btn') && !e.target.classList.contains('caret')) {
            e.stopPropagation();
            const category = e.target;
            let categoryName = category.textContent;
            // Remove caret
            if(categoryName[categoryName.length - 1] === '▸') {
                categoryName = categoryName.slice(0, -1);
            }

            changeCategoryHeading(categoryName);

            // Filter cards by category
            let filteredCards;
            if(categoryName === 'All') {
                displayCards(bookmarkStore.allBookmarks);

            } else if(categoryName === 'Favorites') {
                filteredCards = filterCards('favorite', true);
                displayCards(filteredCards);
                
            } else {
                filteredCards = filterCards('category', categoryName);
                displayCards(filteredCards);
            }
        }
    })
}


function displaySubcategoryListener() {
    document.addEventListener('click', function(e) {
        if(e.target.closest('.subcategory-btn')) {
            const subcategory = e.target;
            let subcategoryName = subcategory.textContent;

            changeCategoryHeading(subcategoryName);

            const filteredCards = filterCards('subcategory', subcategoryName);
            displayCards(filteredCards);
        }
    })
}


function isCategory(text) {
    const categories = Category.getAllCategories();
    return categories.some(category => category.name === text);
}


function findParentCategory(subcategoryName) {
    const categories = Category.getAllCategories();
    let parentCategory;
    for(let category of categories) {
        if(category.subcategoriesArr.includes(subcategoryName)) {
            parentCategory = category;
        }
    }

    return parentCategory;
}


function populateSubcategoryDropdownListener(categoryDropdownID, subcategoryDropdownID) {
    const categoryDropdown = document.getElementById(categoryDropdownID);

    categoryDropdown.addEventListener('change', function() {
        populateSubcategoryDropdown(subcategoryDropdownID, categoryDropdownID);
    })
}


function addSubcategoryListener() {
    // On Add Category button
    const addSubcategoryBtn = document.getElementById('add-subcategory-btn');

    addSubcategoryBtn.addEventListener('click', function() {
        populateCategoryDropdown('add-subcategory-category-dropdown');
    })

    // On Add Category submit button
    const addSubcategorySubmitBtn = document.getElementById('submit-new-subcategory');
    const subcategoryDropdown = document.getElementById('new-subcategory-name');
    const categoryDropdown = document.getElementById('add-subcategory-category-dropdown');

    addSubcategorySubmitBtn.addEventListener('click', function() {
        if(categoryDropdown.value === "None") {
            alert('You must add a category before adding a subcategory')
        } else {
            const parentCategory = Category.getAllCategories().find(category => category.name === categoryDropdown.value);
            parentCategory.addSubcategory(subcategoryDropdown.value);
            console.log(subcategoryDropdown.value);
            displayCategoryBtns();
        }
    })
}


function editBookmarkListener() {
    const nameInput = document.getElementById('edit-bookmark-name');
    const urlInput = document.getElementById('edit-bookmark-url');
    const categoryDropdown = document.getElementById('edit-bookmark-category-dropdown');
    const subcategoryDropdown = document.getElementById('edit-bookmark-subcategory-dropdown');
    let bookmark = null;

    // Add listener to all card delete buttons
    // Track which card was clicked
    let selectedCard = null;
    document.body.addEventListener('click', function(e) {
        const cardEditButton = e.target.closest('.edit-btn');
        if(cardEditButton) {
            selectedCard = e.target.closest('.bookmark-card');

            // Get current bookmark
            const index = parseInt(selectedCard.dataset.index);
            bookmark = bookmarkStore.allBookmarks[index];

            // Fill the inputs with current values

            nameInput.value = bookmark.name;
            urlInput.value = bookmark.url;

            if(bookmark.category) {
                categoryDropdown.value = bookmark.category;
            } else {
                categoryDropdown.value = 'None';
            }

            populateSubcategoryDropdown('edit-bookmark-subcategory-dropdown', 'edit-bookmark-category-dropdown')

            if(bookmark.subcategory) {
                const index = Array.from(subcategoryDropdown.options).findIndex(subcat => subcat.text === bookmark.subcategory);
                subcategoryDropdown.selectedIndex = index;
            } else {
                subcategoryDropdown.selectedIndex = 0;
            }
        }
    })

    
    const editBookmarkSubmitBtn = document.getElementById('submit-edit-bookmark');

    editBookmarkSubmitBtn.addEventListener('click', function() {
        if(selectedCard) {
            const name = nameInput.value;
            let url = urlInput.value;
            url = addProtocol(url);
            const category = categoryDropdown.value;
            const subcategory = subcategoryDropdown.value;

            bookmark.name = name;
            bookmark.url = url;

            if(category !== "None") {
                bookmark.category = category;
            } else {
                bookmark.category = null;
            }

            if(subcategory !== "None") {
                bookmark.subcategory = subcategory;
            } else {
                bookmark.subcategory = null;
            }
            

            const currentHeading = document.getElementById('category-heading');
            const headingText = currentHeading.textContent;
            console.log('heading text', headingText);
            let filteredCards;

            if(headingText === 'All') {
                displayCards(bookmarkStore.allBookmarks);
            } else if(isCategory(headingText)) {
                filteredCards = filterCards('category', headingText);
                displayCards(filteredCards);
            } else {
                filteredCards = filterCards('subcategory', headingText);
                displayCards(filteredCards);
            }

            selectedCard = null;
        }
    })
}


function filterCards(property, value) {
    const filteredCards = bookmarkStore.allBookmarks.filter(bookmark => 
        bookmark[property] === value
    );

    return filteredCards;
}




function addAllEventListeners() {
    // Card element listeners
    heartIconListener();
    cardClickListener();

    // Nav listeners
    accordionListener();

    // Open and close modal listeners
    closeModalListener();
    openModalListener('.delete-btn', 'delete-bookmark-modal-bgd');
    openModalListener('.edit-btn', 'edit-bookmark-modal-bgd');
    openStaticModalListener('delete-category-btn', 'delete-category-modal-bgd');
    openStaticModalListener('add-category-btn', 'add-category-modal-bgd');
    openStaticModalListener('add-subcategory-btn', 'add-subcategory-modal-bgd');
    openStaticModalListener('add-bookmark-btn', 'add-bookmark-modal-bgd');

    // CRUD listeners
    addBookmarkListener();
    deleteBookmarkListener();
    addCategoryListener();
    displayCategoryListener();
    displaySubcategoryListener();
    deleteCategoryListener();
    editBookmarkListener();

    // Dropdown listeners
    populateSubcategoryDropdownListener('new-bookmark-category-dropdown', 'new-bookmark-subcategory-dropdown');
    populateSubcategoryDropdownListener('edit-bookmark-category-dropdown', 'edit-bookmark-subcategory-dropdown');
    addSubcategoryListener();
}


export { addAllEventListeners }