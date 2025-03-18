import "./styles.css";
import { 
    accordionListener, 
    closeModalListener, 
    heartIconListener,
    openModalListener
} from "./event-listeners";

// Add all event listeners
document.addEventListener("DOMContentLoaded", () => {
    accordionListener();
    heartIconListener();
    closeModalListener();
    openModalListener('#add-bookmark', 'add-bookmark-modal-bgd');
    openModalListener('.delete-btn', 'delete-bookmark-modal-bgd');
    openModalListener('.edit-btn', 'edit-bookmark-modal-bgd');
    openModalListener('#delete-category-btn', 'delete-category-modal-bgd');
})