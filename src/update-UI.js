function toggleSubcatVisibility(subCatList, caret) {
    if(subCatList.style.display === "none") {
        subCatList.style.display = "block";
        caret.innerHTML = "&#9662";
    } else {
        subCatList.style.display = "none";
        caret.innerHTML = "&#9656";
    }
}

export { toggleSubcatVisibility }