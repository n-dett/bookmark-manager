import { toggleHeartIcon, toggleSubcatVisibility, closeModal, toggleModal, displayCards } from "./update-UI";
import bookmarkStore from "./bookmarkStore";

function accordionListener() {
    // Add event to document so new buttons will have event 
    document.addEventListener('click', function(e) {
        const caret = e.target.closest('.caret');
        if(caret) {
            console.log(`caret: ${caret}`);
            e.stopPropagation();

            const categoryBtn = caret.closest('.category-btn');
            console.log(`categoryBtn: ${categoryBtn}`);


            const subcatList = categoryBtn.nextElementSibling;

            console.log(`subCatList: ${subcatList}`);


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
    // Add listener to all card delete buttons
    // Track which card was clicked
    let selectedCard = null;
    document.body.addEventListener('click', function(e) {
        const cardDeleteButton = e.target.closest('.delete-btn');
        if(cardDeleteButton) {
            selectedCard = e.target.closest('.bookmark-card');
        }
    });

    

    // Add listener to confirm delete button
    const confirmDeleteButton = document.getElementById("submit-delete-bookmark");
    confirmDeleteButton.addEventListener('click', function(e) {
        if(selectedCard) {
            // Delete the card
            const index = parseInt(selectedCard.dataset.index);
            console.log(`selected card index: ${selectedCard.dataset.index}`);
            console.log(`removing index: ${index}`);
            bookmarkStore.removeBookmark(index);
            displayCards();
            selectedCard = null;
        }
    })
}


export { 
    accordionListener, 
    heartIconListener, 
    closeModalListener, 
    openModalListener,
    openStaticModalListener,
    cardClickListener,
    addBookmarkListener,
    deleteBookmarkListener
}