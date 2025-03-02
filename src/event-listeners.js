function toggleAccordion() {
    const carets = document.querySelectorAll('.caret');
    carets.forEach(caret => {
        caret.addEventListener("click", function (e) {
            const categoryBtn = caret.closest('.category-btn');
            const subCatList = categoryBtn.nextElementSibling;

            // If there are no subcategories under the caret, don't add event listener
            if(!subCatList) return;

            // Toggle visibility of the subcategories
            if(subCatList.style.display === "none") {
                subCatList.style.display = "block";
                caret.innerHTML = "&#9662";
            } else {
                subCatList.style.display = "none";
                caret.innerHTML = "&#9656";
            }
        })
    });
}


export{ toggleAccordion }