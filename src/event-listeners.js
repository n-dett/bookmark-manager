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

// function closeModalListener() {
//     const closeBtns = document.querySelectorAll('.close-btn');
//     closeBtns.forEach(btn => {
//         const modal = btn.closest('.modal-background');
//         btn.addEventListener("click", function(e) {
//             e.preventDefault();
//             toggleModal(modal);
//         })
//     })
// }


function closeModalListener() {
    // Add event to document so new buttons will have event 
    document.addEventListener('click', function(e) {
        if(e.target.classList.contains('close-btn')) {
            const modal = e.target.closest('.modal-background');
            if(modal) {
                toggleModal(modal);
            }
        }
    })
}


function openAddBookmarkListener() {
    const addBookmarkBtn = document.getElementById('add-bookmark');
    const modal = document.getElementById('add-bookmark-modal-bgd');
    addBookmarkBtn.addEventListener('click', function() {
        toggleModal(modal);
    })
} 




export{ accordionListener, heartIconListener, closeModalListener, openAddBookmarkListener }