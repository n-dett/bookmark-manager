import { toggleHeartIcon, toggleSubcatVisibility, closeModal, toggleModal } from "./update-UI";

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
            e.stopPropagation();
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


function openModalListener(btnClassOrID, modalId) {
    document.addEventListener('click', function(e) {
        const button = e.target.closest(btnClassOrID);
        if(button) {
            e.stopPropagation();
            const modal = document.getElementById(modalId);
            if (modal) {
                toggleModal(modal);
            }
        }
    });
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


export { 
    accordionListener, 
    heartIconListener, 
    closeModalListener, 
    openModalListener,
    cardClickListener
}