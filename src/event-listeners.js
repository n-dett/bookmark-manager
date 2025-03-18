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
        heartBtn.addEventListener('click', function() {
            toggleHeartIcon(heartIcon);
        })
    });
}


function closeModalListener() {
    // Add event to document so new buttons will have event 
    document.addEventListener('click', function(e) {
        if(e.target.classList.contains('close-btn') || e.target.classList.contains('submit-form-btn')) {
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
        if (button) {
            const modal = document.getElementById(modalId);
            if (modal) {
                toggleModal(modal);
            }
        }
    });
}


export { 
    accordionListener, 
    heartIconListener, 
    closeModalListener, 
    openModalListener
}