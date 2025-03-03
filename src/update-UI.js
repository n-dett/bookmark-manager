function toggleSubcatVisibility(subCatList, caret) {
    subCatList.classList.toggle('hidden');
    if(caret.textContent === "▸") {
        caret.innerHTML = "▾";
    } else {
        caret.innerHTML = "▸";
    }
}







export { toggleSubcatVisibility }