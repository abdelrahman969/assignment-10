var bookmarkName = document.getElementById("bookmarkName");
var bookmarUrl = document.getElementById("bookmarURL");
var AllInput = [];

window.onload = function() {
    if (localStorage.getItem("bookmarks")) {
        AllInput = JSON.parse(localStorage.getItem("bookmarks"));
        display();
    }
};

function addFun() {
    
    if (validName() && validUrl()) {
        if (isBookmarkNameDuplicate(bookmarkName.value)) {
            alert("This bookmark name already exists. Please use a different name.");
            return; 
        }

        var bookmark = {
            name: bookmarkName.value,
            Url: bookmarUrl.value,
        };
        AllInput.push(bookmark);
        console.log(AllInput);
        ClearInput();
        display();

       
        localStorage.setItem("bookmarks", JSON.stringify(AllInput));
    } else {
        alert("Please provide a valid bookmark name and URL.");
    }
}


function ClearInput() {
    bookmarkName.value = "";
    bookmarUrl.value = "";
}

function display() {
    var cartona = "";
    for (i = 0; i < AllInput.length; i++) {
        cartona += ` <tr>
            <td>${i + 1}</td>
            <td>${AllInput[i].name}</td>
            <td><button onclick="VisitUrl(${i})" class="btn btn-success">
                <i class="fa-regular fa-eye"></i> Visit
            </button></td>
            <td><button onclick="deletContent(${i})" class="btn btn-danger">
                <i class="fa-solid fa-trash-can"></i> Delete
            </button></td>
        </tr>`;
    }
    document.getElementById("tableContent").innerHTML = cartona;
}

function deletContent(index) {
    AllInput.splice(index, 1);
    display();

    
    localStorage.setItem("bookmarks", JSON.stringify(AllInput));
}

//Function for valid URL 
function validUrl() {
    var regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,6}(\:[0-9]+)?(\/[a-z0-9-._~%]*)*(\?[a-z0-9-._~%&=]*)?(\#[a-z0-9-._~%]*)?$/i;
    return regex.test(bookmarUrl.value);
}

function VisitUrl(web) {
    var url = AllInput[web].Url;  
    location.href = url;  
}



// Function for valid name

function validName() {
    if (bookmarkName.value.trim() === "") {
        alert("Bookmark name cannot be empty.");
        return false;
    }

    if (bookmarkName.value.trim().length < 3) {
        alert("Bookmark name must be at least 3 characters long.");
        return false;
    }

    var regex = /^[a-zA-Z0-9\s]+$/;
    if (!regex.test(bookmarkName.value)) {
        alert("Bookmark name can only contain letters, numbers, and spaces.");
        return false;
    }

    return true;
}
// Function to check if the bookmark name already exists
function BookmarkNameExist(name) {
    for (var i = 0; i < AllInput.length; i++) {
        if (AllInput[i].name.toLowerCase() === name.toLowerCase()) {
            return true; 
        }
    }
    return false; 
}