import "./styles.css";
import { accordionListener, heartIconListener } from "./event-listeners";

// Add all event listeners
document.addEventListener("DOMContentLoaded", () => {
    accordionListener();
    heartIconListener();
})