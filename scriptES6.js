const container = document.querySelector('.container'),
bookForm = document.getElementById('book-form'),
title = document.getElementById('title'),
author = document.getElementById('author'),
isbn = document.getElementById('isbn')
bookList = document.getElementById('book-list')

class Book{
    constructor(title, author, isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class Store{
    static getBooks(){
        let books
        if(localStorage.getItem('books') === null){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static displayBooks(){
        const books = Store.getBooks()

        books.forEach(function(book){
            addBookToList(book)
        })
    }

    static addBook(book){
        const books = Store.getBooks()

        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }

    static deleteBook(isbn){
        const books = Store.getBooks()
        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}


function addBookToList(book){
    const row = document.createElement('tr')
    row.className = 'row'
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button id='deleteBtn'>DEL</button></td>
    `
    bookList.appendChild(row)
}

function clearFields(){
    title.value = ''
    author.value = ''
    isbn.value = ''
}


function showAlert(message, className){
    // alert(message)
    const div = document.createElement('div')
    div.className = `alert ${className}`

    const h4 = document.createElement('h5')
    h4.innerText = message

    div.appendChild(h4)

    container.insertBefore(div, bookForm)

    setTimeout(function(){
        document.querySelector('.alert').remove()
    },2000)
}

function addBook(e){
    const titleVal = title.value
    const authorVal = author.value
    const isbnVal = isbn.value

    if(titleVal === '' || authorVal === '' || isbnVal === ''){
        showAlert('Please Enter all the Fields', 'error')
    }else{
        const book = new Book(titleVal, authorVal, isbnVal)
        // Add Book to List
        addBookToList(book)

        // Add Book to Local Storage
        Store.addBook(book)

        clearFields()
        showAlert('Book Added to the List', 'success')
    }

    e.preventDefault()
}

function handleDelete(target){
    console.log(target)
    if(target.id === 'deleteBtn'){
        target.parentElement.parentElement.remove()
        showAlert('Book removed Successfully...!', 'success')
    } else {
        return 0
    }
}

bookForm.addEventListener('submit',(e) => addBook(e))
bookList.addEventListener('click', (e) => {
    handleDelete(e.target)
    Store.deleteBook(e.target.parentElement.previousElementSibling.textContent)
})
document.addEventListener('DOMContentLoaded', Store.displayBooks)