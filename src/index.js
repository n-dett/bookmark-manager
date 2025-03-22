import "./styles.css";
import { 
    accordionListener, 
    cardClickListener, 
    closeModalListener, 
    heartIconListener,
    openModalListener,
    openStaticModalListener
} from "./event-listeners";

import { displayCards } from "./update-UI";

// Add all event listeners

document.addEventListener("DOMContentLoaded", () => {
    displayCards();
    heartIconListener();
    accordionListener();
    cardClickListener();
    closeModalListener();
    openModalListener('.delete-btn', 'delete-bookmark-modal-bgd');
    openModalListener('.edit-btn', 'edit-bookmark-modal-bgd');
    openStaticModalListener('delete-category-btn', 'delete-category-modal-bgd');
    openStaticModalListener('add-category-btn', 'add-category-modal-bgd');
    openStaticModalListener('add-subcategory-btn', 'add-subcategory-modal-bgd');
    openStaticModalListener('add-bookmark-btn', 'add-bookmark-modal-bgd');
})