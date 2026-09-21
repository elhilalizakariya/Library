const myLibrary = [];


function Book(name, author, pages, genre, year, read){
    this.name = name;
    this.id = crypto.randomUUID();
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.year = year;
    this.read = read;

        

    
}

Book.prototype.changeReadStatus = function(){
    this.read = !this.read;
}

function addBookToLibrary(name, author, pages, genre, year,read ){
    let book = new Book(name, author, pages, genre, year, read);
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
            if(keys[i] === "read"){
                td.textContent= book.read? "Yes" : "No";
            }else{
                td.textContent = book[keys[i]];
            }
            tr.appendChild(td);
        }
        const remove = document.createElement("button");
        const index = myLibrary.indexOf(book);
        remove.addEventListener("click", (event)=>{
            myLibrary.splice(index,1);
            displayBooks();
        })
        remove.classList.add("remove-button");
        remove.innerHTML="X"
        let tdRemove = document.createElement("td");
        tdRemove.appendChild(remove);
        tr.appendChild(tdRemove);
        tbody.appendChild(tr);


        const toggleRead = document.createElement("button");

        toggleRead.addEventListener("click", (event)=>{
            book.changeReadStatus();
            displayBooks();
        })
        toggleRead.classList.add("toggle-read-button");
        toggleRead.innerHTML="change"
        let tdtoggle = document.createElement("td");
        tdtoggle.appendChild(toggleRead);
        tr.appendChild(tdtoggle);
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
    const read = form.elements.read.checked;

    addBookToLibrary(name,author,pages, genre, year, read);
    displayBooks();
    form.reset();
    dialog.close();
});

const cancel = document.querySelector("#cancel-book");
cancel.addEventListener("click",(event)=>{
    form.reset();
    dialog.close();
} )




addBookToLibrary("1984", "George Orwell", 368 , "Fiction" , 1949, true);
addBookToLibrary("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 512, "Science" , 2011, false);

console.log(myLibrary);
displayBooks();
