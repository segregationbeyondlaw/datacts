// Javascript for interactive table
var tagsSelected = [];

function filterTable() {
    // The user searches or clicks a tag to filter the data table to relevant rows.
    var input, filter, table, tr, rowElements, td, i, j, k, textValue, tag, filterFoundInRow, matchesAllTags;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    
    // Loop through table rows and hide those that don't match the search input
    for (i = 1; i < tr.length; i++) {
        filterFoundInRow = false;
        matchesAllTags = true;
        rowElements = tr[i].getElementsByTagName("td");
        for (j = 1; j < rowElements.length; j++) {
            td = rowElements[j];
            if (td) {
                textValue = td.textContent || td.innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    filterFoundInRow = true;
                }
            }
        }
        if (tagsSelected.length > 0) {
            td = rowElements[0];
            if (td) {
                textValue = td.textContent || td.innerText;
                for (k = 0; k < tagsSelected.length; k++) {
                    tag = tagsSelected[k].toUpperCase();
                    if (textValue.toUpperCase().indexOf(tag) == -1) {
                        matchesAllTags = false;
                    }
                }
            }
        }
        
        if (filterFoundInRow && matchesAllTags) {
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
    }
}

function insertTags(obj) {
    var tag, tagButton, container;
    tag = obj.textContent || obj.innerText;
    if (tag) {
        // Add tag to list
        if (!tagsSelected.includes(tag)) { tagsSelected.push(tag); }
        // Put a button displaying the tag name on screen
        tagButton = document.createElement("a");
        tagButton.innerHTML = tag + " ×";
        tagButton.className = "tagbutton";
        tagButton.onmouseup = function() { removeTags(tagButton) };
        tagButton.onclick = function() { filterTable(); }
        container = document.getElementById("tagCollection");
        container.appendChild(tagButton);
    }
}

function removeTags(obj) {
    var tag;
    tag = obj.textContent || obj.innerText ;
    tag = tag.replace(" ×", "");
    if (tag) {
        // Remove tag from list
        if (tagsSelected.includes(tag)) { index = tagsSelected.indexOf(tag); tagsSelected.splice(index, 1); }
        // Remove button displaying tag name
        obj.style.display = "none";
    }
}

function openDropdown(obj) {
    // A dropdown menu opens from a button when clicked.
    closeAllDropdowns();
    obj.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
    
}

function closeAllDropdowns() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains("show")) {
                dropdowns[i].classList.remove("show");
            }
        }
}

window.onclick = function(event) {
    // Close the dropdown menu if the user clicks outside of it
    if (!event.target.matches(".dropbutton")) {
        closeAllDropdowns();
    }
}
