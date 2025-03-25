import "./styles.css";
import { addAllEventListeners } from "./event-listeners";

import { renderUI } from "./update-UI";

// Add all event listeners

document.addEventListener("DOMContentLoaded", () => {
    renderUI();
    addAllEventListeners();
})