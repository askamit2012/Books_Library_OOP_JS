// Book Constructor
function Book(title, author, isbn){
    this.title = title
    this.author = author
    this.isbn = isbn
}

// UI Constructor

function UI(){

}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list')
    // create tr element
    const row = document.createElement('tr')
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='delete'>X</a></td>
    `
    list.appendChild(row)
}

UI.prototype.clearFields = function(){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}

UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))

    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')

    container.insertBefore(div, form)
    // TimeOut after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove()
    },3000)
}

UI.prototype.deleteBook = function(target){
    target.parentElement.parentElement.remove()
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', 
function(e){
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // Instantiate book
    const book = new Book(title, author, isbn)

    // Instantiate ui
    const ui = new UI()

    // Validate book
    if(title === '' || author === '' || isbn === ''){
        // Error Alert
        ui.showAlert('Please Fill in all fields', 'error')
    }else {
            
        // Add book to List
        ui.addBookToList(book)

        // show success
        ui.showAlert('Book Added Successfully', 'success')

        // Clear Fields
        ui.clearFields()
    }


    // Prevent form to default Submit
    e.preventDefault()
})

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click',
    function(e){
        const ui = new UI()
        ui.deleteBook(e.target)
        ui.showAlert('Book Removed...!', 'success')
        e.preventDefault()
    }
)