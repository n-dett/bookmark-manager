import { toggleSubcatVisibility } from "./update-UI";

function toggleAccordionListener() {
    const carets = document.querySelectorAll('.caret');
    carets.forEach(caret => {
        caret.addEventListener("click", function (e) {
            const categoryBtn = caret.closest('.category-btn');
            const subCatList = categoryBtn.nextElementSibling;

            // If there are no subcategories under the caret, don't add event listener
            if(!subCatList) return;

            // Toggle visibility of the subcategories
            toggleSubcatVisibility(subCatList, caret);
        })
    });
}




export{ toggleAccordionListener }