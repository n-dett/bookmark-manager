import { toggleHeartIcon, toggleSubcatVisibility, closeModal, toggleModal, displayCards } from "./update-UI";
import bookmarkStore from "./bookmarkStore";

function accordionListener() {
    const carets = document.querySelectorAll('.caret');
    carets.forEach(caret => {
        caret.addEventListener('mousedown', function(e) {
            const categoryBtn = caret.closest('.category-btn');
            const subCatList = categoryBtn.nextElementSibling;

            // If there are no subcategories under the caret, don't add event listener
            if(!subCatList) return;

            // Toggle visibility of the subcategories
            toggleSubcatVisibility(subCatList, caret);
        })
    });
}


function heartIconListener() {
    const heartBtns = document.querySelectorAll('.heart-btn');
    heartBtns.forEach(heartBtn => {
        const heartIcon= heartBtn.firstElementChild;
        heartBtn.addEventListener('click', function(e) {
            // e.stopPropagation();
            toggleHeartIcon(heartIcon);
        })
    });
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
            const categoryInput = document.getElementById("new-bookmark-category-dropdown");
            const category = "None" ? null : categoryInput.value;
            // Get subcategory
            const subcategoryInput = document.getElementById("new-bookmark-subcategory-dropdown")
            const subcategory = "None" ? null : subcategoryInput.value;
            // Favorite is false by default
            const favorite = false;

            bookmarkStore.addBookmark(name, url, category, subcategory, favorite);
            displayCards();

            nameInput.value = "";
            urlInput.value = "";
            categoryInput.value = "";
            subcategoryInput.value = "";
        })
    }
}


function deleteBookmarkListener() {
    // Add listener to all card delete buttons via document

    // Track which card was clicked
    const card = e.target.closest('.bookmark-card');

    // Add listener to confirm delete button
    const confirmDeleteButton = document.getElementById("submit-delete-bookmark");
    confirmDeleteButton.addEventListener('click', function(e) {
        
    })
}


export { 
    accordionListener, 
    heartIconListener, 
    closeModalListener, 
    openModalListener,
    openStaticModalListener,
    cardClickListener,
    addBookmarkListener
}