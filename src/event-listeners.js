import { toggleHeartIcon, toggleSubcatVisibility } from "./update-UI";

function accordionListener() {
    const carets = document.querySelectorAll('.caret');
    carets.forEach(caret => {
        caret.addEventListener("mousedown", function(e) {
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
        let heartIcon= heartBtn.firstElementChild;
        heartBtn.addEventListener("mousedown", function() {
            toggleHeartIcon(heartIcon);
        })
    });
}




export{ accordionListener, heartIconListener }