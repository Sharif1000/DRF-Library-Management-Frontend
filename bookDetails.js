const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');
const user_id = localStorage.getItem("user_id");
console.log(user_id);

const loadBookDetails = () => {
  fetch(`http://127.0.0.1:8000/book/${bookId}`)
    .then(res => res.json())
    .then(book => {
      const booksContainer = document.getElementById("books");
      const div = document.createElement("div");
      div.classList.add("book-details");
      div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Category: ${book.genre_name}</h6>
          <h6 class="card-subtitle mb-2 text-muted">Author: ${book.author}</h6>
          <p class="card-text">ISBN: ${book.ISBN}</p>
          <p class="card-text">Publication Date: ${book.publication_date}</p>
          <p class="card-text">Status: ${book.availability_status ? 'Available' : 'Not Available'}</p>
          <p class="card-text">No of Book: ${book.num_of_book}</p>
        </div>
        <div class="card-footer">
        ${book.availability_status ? `<a href="profile.html?id=${book.id}" class="btn btn-success" onclick="borrowBook()">Borrow Book</a>` : ''}
          <a href="wishlist.html?id=${book.id}" class="btn btn-success" target="_blank" >Wishlist</a>
        </div>
      </div>
      `;
      booksContainer.appendChild(div);
    })
};


const borrowBook = () => {
  fetch(`http://127.0.0.1:8000/book/${bookId}/`)
  .then(res => res.json())
  .then(book => {
        if (book.num_of_book > 0) {
            book.num_of_book--;
            if (book.num_of_book == 0){
                book.availability_status = false;
            }

            fetch(`http://127.0.0.1:8000/book/${bookId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    num_of_book: book.num_of_book,
                    availability_status: book.availability_status,
                }),
            })

            .then(res => res.json())
            .then(() => {
              fetch(`http://127.0.0.1:8000/borrower/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: user_id,
                  book: bookId,
                  borrowDate: new Date().toISOString(),
                }),
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
          })
            .catch(error => {
                console.error('There was an error updating the book quantity:', error);
            });
        } else {
            console.error('No copies of the book available');
        }
    })
    .catch(error => {
        console.error('There was an error fetching book details:', error);
    });
};


loadBookDetails();
