import "./styles.css";
import { 
    accordionListener, 
    cardClickListener, 
    closeModalListener, 
    heartIconListener,
    openModalListener
} from "./event-listeners";

import { displayCards } from "./update-UI";

// Add all event listeners

document.addEventListener("DOMContentLoaded", () => {
    displayCards();
    accordionListener();
    cardClickListener();
    heartIconListener();
    closeModalListener();
    openModalListener('#add-bookmark-btn', 'add-bookmark-modal-bgd');
    openModalListener('.delete-btn', 'delete-bookmark-modal-bgd');
    openModalListener('.edit-btn', 'edit-bookmark-modal-bgd');
    openModalListener('#delete-category-btn', 'delete-category-modal-bgd');
    openModalListener('#add-category-btn', 'add-category-modal-bgd');
    openModalListener('#add-subcategory-btn', 'add-subcategory-modal-bgd');
})