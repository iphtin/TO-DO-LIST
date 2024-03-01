const newtask = document.querySelector(".newtask");
const btn = document.getElementById("btn");
const input = document.querySelector(".input");
const textarea = document.querySelector("textarea");
const grid = document.querySelector('.grid');

// Function to edit an item by key
function editItemByKey(key) {
    const storedItem = localStorage.getItem(key);
    try {
      // Parse the stored item as JSON
      const parsedItem = JSON.parse(storedItem);
  
      // Prompt the user for new values
      const newTitle = prompt('Enter new title:', parsedItem.title);
      const newDesc = prompt('Enter new description:', parsedItem.desc);
  
      // Update the item in localStorage
      localStorage.setItem(key, JSON.stringify({ title: newTitle, desc: newDesc }));
  
      // Update the item in the array
      const editedItemIndex = itemsArray.findIndex(item => item.key === key);
      if (editedItemIndex !== -1) {
        itemsArray[editedItemIndex] = { key, title: newTitle, desc: newDesc };
      }
  
      // Update the item in the DOM
      const itemToUpdate = document.querySelector(`[data-id="${key}"]`);
      if (itemToUpdate) {
        itemToUpdate.querySelector('h2').textContent = newTitle;
        itemToUpdate.querySelector('p').textContent = newDesc;
      }
      location.reload();
    } catch (error) {
      console.error(`Error editing item with key ${key}:`, error);
      // Handle errors as needed
    }
}

// Function to delete an item by key
function deleteItemByKey(key) {
    // Remove the item from localStorage
    localStorage.removeItem(key);
  
    // Remove the item from the array
    itemsArray = itemsArray.filter(item => item.key !== key);
  
    // Remove the item from the DOM
    const itemToRemove = document.querySelector(`[data-id="${key}"]`);
    if (itemToRemove) {
      itemToRemove.remove();
    }
    location.reload();
  }

if(localStorage.clickcount) {
    const localStorageKeys = Object.keys(localStorage);
    const numericalKeys = localStorageKeys.filter(key => !isNaN(Number(key)));

    // Use Array.map() to process each item
    const itemsArray = numericalKeys.map(key => {
      const storedItem = localStorage.getItem(key);
      try {
        // Parse the stored item as JSON
        const parsedItem = JSON.parse(storedItem);
        return { key, ...parsedItem };
      } catch (error) {
        console.error(`Error parsing item with key ${key}:`, error);
        return null; // Handle parsing errors as needed
      }
    });
    
    // Now, you have an array of objects representing your localStorage items with numerical keys
    console.log(itemsArray);

    itemsArray.forEach(item => {
        let newItem = document.createElement('div');
        let title = document.createElement('h2');
        let desc = document.createElement('p');
        let deleteButton = document.createElement('button');
        let editButton = document.createElement('button');
      
        title.textContent = item.title;
        desc.textContent = item.desc;
        deleteButton.textContent = 'Delete';
        editButton.textContent = 'Edit';

        newItem.appendChild(title);
        newItem.appendChild(desc);
        newItem.appendChild(deleteButton);
        newItem.appendChild(editButton);
      
        editButton.className = "editBtn";
        newItem.className = "item";
        newItem.setAttribute('data-id', item.key);

        // Add click event listener to delete button
       deleteButton.addEventListener('click', () => {
         deleteItemByKey(item.key);
       });

        // Add click event listener to edit button
      editButton.addEventListener('click', () => {
        editItemByKey(item.key);
       });

      
        // grid container
        grid.appendChild(newItem);
      });
    
}else {
    let noNote = document.createElement('h2');
    noNote.textContent = "No Note Yet If You want to Node Click on addtask!"
    noNote.className = "noNote";
    
    grid.appendChild(noNote);
}

btn.addEventListener('click', () => {
    let item = document.createElement('div');
    let title = document.createElement('h2');
    let desc = document.createElement('p');
 

    title.textContent = input.value;

    desc.textContent = textarea.value;

    item.appendChild(title);
    item.appendChild(desc);

    item.className = "item";

    grid.append(item);
     
    if (localStorage.clickcount) {
        // Increment the click count
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
      
        // Store the object with the incremented count as the key
        localStorage.setItem(localStorage.clickcount, JSON.stringify({ title: input.value, desc: textarea.value }));
      } else {
        // Set the initial click count to 1
        localStorage.clickcount = 0;
      
        // Store the object with the count as the key
        localStorage.setItem(localStorage.clickcount, JSON.stringify({ title: input.value, desc: textarea.value }));
      }
      

         input.value = "";
         textarea.value = "";

        location.reload();
})

function handleShow() {
    newtask.style.visibility = "visible"
}

function handleClose() {
    newtask.style.visibility = "hidden"
}