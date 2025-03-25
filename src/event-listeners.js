import { 
    toggleHeartIcon, 
    toggleSubcatVisibility, 
    displayCategoryBtns, 
    toggleModal, 
    displayCards,
    hideDeleteCategoryBtn 
} from "./update-UI";
import bookmarkStore from "./bookmarkStore";
import { Category } from "./Category";

function accordionListener() {
    // Add event to document so new buttons will have event 
    document.addEventListener('click', function(e) {
        const caret = e.target.closest('.caret');
        if(caret) {
            console.log(`caret: ${caret}`);
            e.stopPropagation();

            const categoryBtn = caret.closest('.category-btn');
            const subcatList = categoryBtn.nextElementSibling;

            // If there are no subcategories under the caret, don't add event listener
            if(!subcatList) return;

            // Toggle visibility of the subcategories
            toggleSubcatVisibility(subcatList, caret);
        }
    })
}


function heartIconListener() {
    // Add event to document so new buttons will have event 
    document.addEventListener('click', function(e) {
        if(e.target.closest('.heart-btn')) {
            console.log('heart clicked!');
            e.stopPropagation();
            const heartIcon = e.target.closest('.heart-btn').firstElementChild;
            toggleHeartIcon(heartIcon);

            // Add favorite to bookmark object
            let selectedCard = e.target.closest('.bookmark-card');
            console.log('card:', selectedCard);
            if(selectedCard) {
                const index = parseInt(selectedCard.dataset.index);
                const bookmark = bookmarkStore.allBookmarks[index];

                if(!bookmark.favorite) {
                    bookmark.favorite = true;
                } else {
                    bookmark.favorite = false;
                    

                    // If current display is Favorites, reload display     
                    const categoryHeading = document.getElementById('category-heading');
                    const categoryName = categoryHeading.textContent;
                    if(categoryName === 'Favorites') {
                        const filteredCards = bookmarkStore.allBookmarks.filter(bookmark => 
                            bookmark.favorite === true
                        );
        
                        displayCards(filteredCards);
                    }
                }
                
                selectedCard = null;
            }
            
        }
    })
}


function closeModalListener() {
    // Add event to document so new buttons will have event 
    document.addEventListener('click', function(e) {
        if(e.target.classList.contains('close-btn') || e.target.classList.contains('submit-form-btn')) {
            e.stopPropagation();
            const modal = e.target.closest('.modal-background');
            if(modal) {
                toggleModal(modal);
            }
        }
    })
}


function openModalListener(btnClass, modalId) {
    document.body.addEventListener('click', function(e) {
        const button = e.target.closest(btnClass);
        if(button) {
            e.stopPropagation();
            const modal = document.getElementById(modalId);
            if (modal) {
                toggleModal(modal);
            }
        }
    });
}


function openStaticModalListener(btnId, modalId) {
    const button = document.getElementById(btnId);
    if(button) {
        button.addEventListener('click', function(e) {
            const modal = document.getElementById(modalId);
            if(modal) {
                toggleModal(modal);
            }
        })
    }
}


/* 
    Adapted from Block Links: The Search for a Perfect Solution
    https://css-tricks.com/block-links-the-search-for-a-perfect-solution/#method-4-sprinkle-javascript-on-the-second-method
    Accessed 3/19/2025
*/ 
function cardClickListener() {
    document.addEventListener('click', function(e) {
        // Don't fire if button is clicked
        if (e.target.closest('button')) {
            return;
        }

        const card = e.target.closest('.bookmark-card');
        if(card) {
            const url = card.querySelector('h3 a');
            
            // Check if user has text selected
            const textSelected = window.getSelection().toString();
            if(!textSelected && url) {
                url.click();
            }
        }
    })
}


function addBookmarkListener() {
    const button = document.getElementById('submit-new-bookmark');
    if(button) {
        button.addEventListener('click', function() {
            // Get name
            const nameInput = document.getElementById("new-bookmark-name");
            const name = nameInput.value.trim();
            // Get url
            const urlInput = document.getElementById("new-bookmark-url");
            const url = urlInput.value.trim();
            // Get category
            const categoryInput = document.getElementById("new-bookmark-category-dropdown");
            const category = "None" ? null : categoryInput.value;
            // Get subcategory
            const subcategoryInput = document.getElementById("new-bookmark-subcategory-dropdown")
            const subcategory = "None" ? null : subcategoryInput.value;
            // Favorite is false by default
            const favorite = false;

            bookmarkStore.addBookmark(name, url, category, subcategory, favorite);
            displayCards(bookmarkStore.allBookmarks);

            nameInput.value = "";
            urlInput.value = "";
            categoryInput.value = "";
            subcategoryInput.value = "";
        })
    }
}


function deleteBookmarkListener() {
    // Add listener to all card delete buttons
    // Track which card was clicked
    let selectedCard = null;
    document.body.addEventListener('click', function(e) {
        const cardDeleteButton = e.target.closest('.delete-btn');
        if(cardDeleteButton) {
            selectedCard = e.target.closest('.bookmark-card');
        }

        // Add bookmark name to modal message
        if (selectedCard) {
            // Get the bookmark name element
            const selectedCardName = document.getElementById('delete-bookmark-name');
            const cardH3 = selectedCard.querySelector('h3');
        
            // Check if h3 element exists before updating the text content
            if (cardH3 && selectedCardName) {
                selectedCardName.textContent = cardH3.textContent;
            }
        }
    });

    
    // Add listener to confirm delete button
    const confirmDeleteButton = document.getElementById("submit-delete-bookmark");
    confirmDeleteButton.addEventListener('click', function(e) {
        if(selectedCard) {
            // Delete the card
            const index = parseInt(selectedCard.dataset.index);
            console.log(`selected card index: ${selectedCard.dataset.index}`);
            console.log(`removing index: ${index}`);
            bookmarkStore.removeBookmark(index);
            displayCards(bookmarkStore.allBookmarks);
            selectedCard = null;
        }
    })
}


function addCategoryListener() {
    const button = document.getElementById('submit-new-category');
    const categoryInput = document.getElementById('new-category-name');
    button.addEventListener('click', function(e) {
        const categoryName = categoryInput.value;
        new Category(categoryName);
        displayCategoryBtns(Category.categoriesArr);
    })
}


// function DeleteCategoryListener() {
//     const button = document.getElementById('submit-delete-category');
//     const categoryName = document.getElementById('category-heading').textContent;

//     button.addEventListener('click', function(e) {
//         // Remove category from array
//         Category.removeCategory(categoryName);

//         // Change category title

//         // Display All cards
//     })

// }


function displayCategoryListener() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.category-btn') && !e.target.classList.contains('caret')) {
            e.stopPropagation();
            const category = e.target;
            let categoryName = category.textContent;
            // Remove caret
            if(categoryName[categoryName.length - 1] === '▸') {
                categoryName = categoryName.slice(0, -1);
            }

            // Change category heading
            const categoryHeading = document.getElementById('category-heading');
            categoryHeading.textContent = categoryName;

            
            // Filter cards by category
            if(categoryName === 'All') {
                displayCards(bookmarkStore.allBookmarks);
                hideDeleteCategoryBtn(true);

            } else if(categoryName === 'Favorites') {
                const filteredCards = bookmarkStore.allBookmarks.filter(bookmark => 
                    bookmark.favorite === true
                );

                displayCards(filteredCards);
                hideDeleteCategoryBtn(true);
                
            } else {
                const filteredCards = bookmarkStore.allBookmarks.filter(bookmark => 
                    bookmark.category === categoryName
                );

                displayCards(filteredCards);
                hideDeleteCategoryBtn(false);
            }
        }
    })
}


function displaySubcategoryListener() {
    document.addEventListener('click', function(e) {
        if(e.target.closest('.subcategory-btn')) {
            const subcategory = e.target;
            let subcategoryName = subcategory.textContent;

            // Change category heading
            const categoryHeading = document.getElementById('category-heading');
            categoryHeading.textContent = subcategoryName;

            const filteredCards = bookmarkStore.allBookmarks.filter(bookmark => 
                bookmark.subcategory === subcategoryName
            );

            displayCards(filteredCards);
            hideDeleteCategoryBtn(false);
        }
    })
}
    // , .subcategory-btn') && !e.target.classList.contains('hidden')





export { 
    accordionListener, 
    heartIconListener, 
    closeModalListener, 
    openModalListener,
    openStaticModalListener,
    cardClickListener,
    addBookmarkListener,
    deleteBookmarkListener,
    addCategoryListener,
    displayCategoryListener,
    displaySubcategoryListener
}