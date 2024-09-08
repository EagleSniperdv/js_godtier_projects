const sortableLists = document.querySelectorAll(".sortable-list");
const items = document.querySelectorAll(".item");

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        setTimeout(() => item.classList.add("dragging"), 0);
    });

    item.addEventListener("dragend", () => item.classList.remove("dragging"));
});

// Function to handle sorting
const initSortableList = (e, sortableList) => {
    e.preventDefault(); // Ensure default behavior is prevented

    // Get all sibling items except the one being dragged
    const siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

    // Find the next sibling based on the drag position
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    console.log(nextSibling);

    const draggingItem = document.querySelector(".dragging");
    if (nextSibling == null) {
        sortableList.appendChild(draggingItem); // Append if no next sibling is found
    } else {
        sortableList.insertBefore(draggingItem, nextSibling); // Insert before the next sibling
    }
};

// Add event listeners for dragover on each sortable list
sortableLists.forEach(sortableList => {
    sortableList.addEventListener("dragover", (e) => initSortableList(e, sortableList));
});
