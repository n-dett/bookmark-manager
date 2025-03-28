import "./styles.css";
import { addAllEventListeners } from "./event-listeners";

import { renderUI } from "./update-UI";


document.addEventListener("DOMContentLoaded", () => {
    renderUI();
    addAllEventListeners();
})