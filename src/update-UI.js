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
        cardContainer.setAttribute("data-id", index);

        // Add title
        const bookTitle = document.createElement("h3");
        bookTitle.innerText = book.title;
        cardContainer.appendChild(bookTitle);

        // Add hr
        const rule = document.createElement("hr");
        cardContainer.appendChild(rule);

        // Add author
        const authorContainer = document.createElement("div");
        authorContainer.classList.add("author-container");

        const byline = document.createElement("p");
        byline.innerText = `by ${book.author}`;
        authorContainer.appendChild(byline);
        cardContainer.appendChild(authorContainer);

        // Add pages and finished
        const pagesAndFinishedContainer = document.createElement("div");
        pagesAndFinishedContainer.classList.add("pages-finished-container");
        const pagesContainer = document.createElement("div");
        pagesContainer.classList.add("pages-container");

        const pageNum = document.createElement("p");
        pageNum.innerText = `${book.pages} Pages`;
        pagesContainer.appendChild(pageNum);
        pagesAndFinishedContainer.appendChild(pagesContainer);

        const bullet = document.createElement("p");
        bullet.innerText = "•";
        pagesAndFinishedContainer.appendChild(bullet);

        const bookFinished = document.createElement("p");
        bookFinished.classList.add("book-finished");
        bookFinished.innerText = book.finished;
        pagesAndFinishedContainer.appendChild(bookFinished);
        cardContainer.appendChild(pagesAndFinishedContainer);

        // Buttons
        const btnsContainer = document.createElement("div");
        btnsContainer.classList.add("card-btns-container");

        // Status Button
        const statusBtn = document.createElement("button");
        statusBtn.innerText = "Change Status";
        statusBtn.classList.add("card-btns");
        statusBtn.classList.add("status-btn");
        btnsContainer.appendChild(statusBtn);

        // Remove Button
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.classList.add("card-btns");
        removeBtn.classList.add("remove-btns");
        btnsContainer.appendChild(removeBtn);
        cardContainer.appendChild(btnsContainer);


        cardsContainer.appendChild(cardContainer);
    })
}


export { toggleSubcatVisibility, toggleHeartIcon, toggleModal }