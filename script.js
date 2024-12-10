const itemInput = document.getElementById("itemInput");
const addItemButton = document.getElementById("addItemButton");
const clearListButton = document.getElementById("clearListButton");
const shoppingList = document.getElementById("shoppingList");
let shoppingItems = JSON.parse(localStorage.getItem("shoppingItems")) || [];
function renderList() {
    shoppingList.innerHTML = ''; 
    shoppingItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.toggle("purchased", item.purchased);

        const itemText = document.createElement("span");
        itemText.textContent = item.name;

        const markPurchasedButton = document.createElement("button");
        markPurchasedButton.textContent = item.purchased ? "Unmark" : "Mark Purchased";
        markPurchasedButton.addEventListener("click", () => togglePurchased(index));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteItem(index));

        li.appendChild(itemText);
        li.appendChild(markPurchasedButton);
        li.appendChild(deleteButton);
        shoppingList.appendChild(li);
    });
}
function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName) {
        shoppingItems.push({ name: itemName, purchased: false });
        itemInput.value = '';
        saveList();
        renderList();
    }
}
function togglePurchased(index) {
    shoppingItems[index].purchased = !shoppingItems[index].purchased;
    saveList();
    renderList();
}
function deleteItem(index) {
    shoppingItems.splice(index, 1);
    saveList();
    renderList();
}

function clearList() {
    shoppingItems = [];
    saveList();
    renderList();
}

function saveList() {
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
}

addItemButton.addEventListener("click", addItem);
clearListButton.addEventListener("click", clearList);

renderList();
