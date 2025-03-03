import "./styles.css";
import { accordionListener, closeModalListener, heartIconListener } from "./event-listeners";

// Add all event listeners
document.addEventListener("DOMContentLoaded", () => {
    accordionListener();
    heartIconListener();
    closeModalListener();
})