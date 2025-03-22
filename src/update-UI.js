function toggleSubcatVisibility(subCatList, caret) {
    subCatList.classList.toggle('hidden');
    if(caret.textContent === '▸') {
        caret.innerHTML = '▾';
    } else {
        caret.innerHTML = '▸';
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
    const cardsContainer = document.getElementById('bookmarks-container');

    // Clear cards
    cardsContainer.innerHTML = '';

    bookmarksArr.forEach((bookmark, index) => {
        // Create card
        const bmCardContainer = document.createElement('div');
        bmCardContainer.classList.add('bookmark-card');
        bmCardContainer.setAttribute('data-index', index);

        appendCardText(bookmark, bmCardContainer);
        appendCardButtons(bmCardContainer, cardsContainer);





    })
}


function appendCardText(bookmark, bmCardContainer) {
    // Add card text container
    const textContainer = document.createElement('div');
    textContainer.classList.add('card-text');
    bmCardContainer.appendChild(textContainer);

    // Add h3 title container
    const titleContainer = document.createElement('h3');
    textContainer.appendChild(titleContainer);

    // Add title that links to url
    const titleLink = document.createElement('a');
    titleLink.textContent = bookmark.title;
    titleLink.setAttribute('href', bookmark.url);
    titleLink.setAttribute('target', '_blank');
    titleContainer.appendChild(titleLink);

    // Add url text
    const urlText = document.createElement('p');
    urlText.textContent = bookmark.url;
    textContainer.append(urlText);
}


function appendCardButtons(bmCardContainer, cardsContainer) {
            // Add buttons container
            const btnsContainer = document.createElement('div');
            btnsContainer.classList.add('card-btns');
    
            // Heart button
            const heartBtn = document.createElement('button');
            heartBtn.classList.add('heart-btn');
            // Heart svg
            const svgNamespace = 'http://www.w3.org/2000/svg';
            const heartSvg = document.createAttributeNS(svgNamespace, 'svg');
            heartSvg.setAttribute('viewbox', '0 0 24 24');
            heartSvg.setAttribute('xmlns', svgNamespace);
            const heartPath = document.createElementNS(svgNamespace, "path");
            heartPath.setAttribute('d', 'M20.808 11.079C19.829 16.132 12 20.5 12 20.5s-7.829-4.368-8.808-9.421C2.227 6.1 5.066 3.5 8 3.5a4.444 4.444 0 0 1 4 2 4.444 4.444 0 0 1 4-2c2.934 0 5.773 2.6 4.808 7.579z');
            // Append heart button
            heartSvg.appendChild(heartPath);
            heartBtn.appendChild(heartSvg);
            btnsContainer.appendChild(heartBtn);
    
            // Edit button
            const editBtn = document.createElement('button');
            heartBtn.classList.add('edit-btn');
            // Edit svg
            const editSvg = document.createAttributeNS(svgNamespace, 'svg');
            editSvg.setAttribute('viewbox', '0 0 24 24');
            editSvg.setAttribute('xmlns', svgNamespace);
            const editPath = document.createElementNS(svgNamespace, "path");
            editPath.setAttribute('d', 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 14-3 1 1-3 7-7 2 2z');
            // Append edit button
            editSvg.appendChild(editPath);
            editBtn.appendChild(editSvg);
            btnsContainer.appendChild(editBtn);
    
            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            // Delete svg
            const deleteSvg = document.createAttributeNS(svgNamespace, 'svg');
            deleteSvg.setAttribute('viewbox', '0 0 24 24');
            deleteSvg.setAttribute('xmlns', svgNamespace);
            const deletePath = document.createElementNS(svgNamespace, "path");
            deletePath.setAttribute('d', 'M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.707,12.293a1,1,0,1,1-1.414,1.414L12,13.414,9.707,15.707a1,1,0,0,1-1.414-1.414L10.586,12,8.293,9.707A1,1,0,0,1,9.707,8.293L12,10.586l2.293-2.293a1,1,0,0,1,1.414,1.414L13.414,12Z');
            // Append delete button
            editSvg.appendChild(deletePath);
            editBtn.appendChild(deleteSvg);
            btnsContainer.appendChild(deleteBtn);
    
            btnsContainer.appendChild(removeBtn);
            bmCardContainer.appendChild(btnsContainer);
            cardsContainer.appendChild(bmCardContainer);
}


export { toggleSubcatVisibility, toggleHeartIcon, toggleModal }