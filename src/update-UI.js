function toggleSubcatVisibility(subCatList, caret) {
    subCatList.classList.toggle('hidden');
    if(caret.textContent === "▸") {
        caret.innerHTML = "▾";
    } else {
        caret.innerHTML = "▸";
    }
}

function toggleHeartIcon(heartIcon) {
    heartIcon.classList.toggle('heart-inactive');
}

function toggleModal(modal) {
    modal.classList.toggle('hidden');
}


export { toggleSubcatVisibility, toggleHeartIcon, toggleModal }