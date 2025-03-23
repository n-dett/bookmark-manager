import "./styles.css";
import { 
    accordionListener, 
    cardClickListener, 
    closeModalListener, 
    heartIconListener,
    openModalListener,
    openStaticModalListener,
    addBookmarkListener,
    deleteBookmarkListener,
    addCategoryListener
} from "./event-listeners";

import { renderUI } from "./update-UI";

// import { Category } from "./Category";

// Add all event listeners

document.addEventListener("DOMContentLoaded", () => {
    // Display dynamic elements
    renderUI();
    
    // Card element listeners
    heartIconListener();
    cardClickListener();

    // Nav listeners
    accordionListener();

    // Modal listeners
    closeModalListener();
    openModalListener('.delete-btn', 'delete-bookmark-modal-bgd');
    openModalListener('.edit-btn', 'edit-bookmark-modal-bgd');
    openStaticModalListener('delete-category-btn', 'delete-category-modal-bgd');
    openStaticModalListener('add-category-btn', 'add-category-modal-bgd');
    openStaticModalListener('add-subcategory-btn', 'add-subcategory-modal-bgd');
    openStaticModalListener('add-bookmark-btn', 'add-bookmark-modal-bgd');

    // CRUD listeners
    addBookmarkListener();
    deleteBookmarkListener();
    addCategoryListener();
})