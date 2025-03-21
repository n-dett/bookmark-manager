function toggleSubcatVisibility(subCatList, caret) {
    subCatList.classList.toggle('hidden');
    if(caret.textContent === "▸") {
        caret.innerHTML = "▾";
    } else {
        caret.innerHTML = "▸";
    }
}


function toggleHeartIcon(heartIcon) {
    heartIcon.classList.toggle('heart-active');
}


function toggleModal(modal) {
    modal.classList.toggle('hidden');
}


function displayCards() {
    // All cards container
    const cardsContainer = document.getElementById("bookmarks-container");

    // Clear library
    cardsContainer.innerHTML = '';

    bookmarksArr.forEach((bookmark, index) => {
        // Create card
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("bookmark-card");
        cardContainer.setAttribute("data-index", index);

        // Add card text container
        const textContainer = document.createElement("div");
        textContainer.classList.add("card-text");
        cardContainer.appendChild(textContainer);

        // Add h3 title container
        const titleContainer = document.createElement("h3");
        textContainer.appendChild(titleContainer);

        // Add title that links to url
        const titleLink = document.createElement("a");
        titleLink.textContent = bookmark.title;
        titleLink.setAttribute('href', bookmark.url);
        titleLink.setAttribute('target', '_blank');
        titleContainer.appendChild(titleLink);

        // Add url text
        const urlText = document.createElement("p");
        urlText.textContent = bookmark.url;
        textContainer.append(urlText);

        // Add buttons container
        const btnsContainer = document.createElement("div");
        btnsContainer.classList.add("card-btns");

/////////////////////



        // Remove Button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("card-btns");
        removeBtn.classList.add("remove-btns");
        btnsContainer.appendChild(removeBtn);
        cardContainer.appendChild(btnsContainer);


        cardsContainer.appendChild(cardContainer);
    })
}


export { toggleSubcatVisibility, toggleHeartIcon, toggleModal }