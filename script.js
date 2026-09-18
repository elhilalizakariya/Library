const myLibrary = [];


function Book(name, author, pages, genre, year){
    this.name = name;
    this.id = crypto.randomUUID();
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.year = year;
    
}

function addBookToLibrary(name, author, pages, genre, year){
    let book = new Book(name, author, pages, genre, year);
    myLibrary.push(book);
}

function displayBooks(){
    const tbody = document.querySelector("tbody");
    tbody.innerHTML ="";

    for (const book of myLibrary){
        const keys= Object.keys(book);
        const tr = document.createElement("tr");
        for(let i=0; i < keys.length; i++){
            let td = document.createElement("td");
            td.textContent = book[keys[i]];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}
const dialog = document.querySelector("#add-book")
const form = document.querySelector(".bookForm");
form.addEventListener("submit", async(event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const author= formData.get("author");
    const pages = formData.get("pages");
    const genre = formData.get("genre");
    const year = formData.get("year");
    addBookToLibrary(name,author,pages, genre, year);
    displayBooks();
    dialog.close();
});

const cancel = document.querySelector("#cancel-book");
cancel.addEventListener("click",(event)=>{
    dialog.close();
} )




addBookToLibrary("1984", "George Orwell", 500, "fiction" , 1949);
addBookToLibrary("Sapiens", "Harrarri", 500, "Science" , 2011);

console.log(myLibrary);
displayBooks();
