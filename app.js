
const loadCategory = () => {
  const dropdownButton = document.getElementById("dropdownMenuButton2");
  fetch("http://127.0.0.1:8000/bookcategory/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-category");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerText = item.name;
        li.addEventListener('click', () => {
          dropdownButton.textContent = item.name;
          loadBooks(item.id, item.name);
        });
        parent.appendChild(li);
      });
    });
};

let booksData = [];

const loadBooks = (categoryId, categoryName) => {
  let url = "http://127.0.0.1:8000/book/";
  if (categoryId) {
    url += `?category=${categoryId}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      booksData = data;
      displayBooks(booksData, categoryName);
    });
};

const displayBooks = (books, categoryName) => {
  const parent = document.getElementById("books");
  parent.innerHTML = '';

  if (books.length === 0) {
    const message = document.createElement("p");
    message.textContent = `${categoryName} book is not available now.`;
    parent.appendChild(message);
  } else {
    books.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("pro-card");

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
          <a href="book_details.html?id=${book.id}" class="btn btn-primary" target="_blank" >Book Details</a>
        </div>
      </div>
    `;

      parent.appendChild(div);
    });
  }
};

const filterBooksByTitle = (books, title) => {
  return books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
};

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener('click', () => {
  const searchQuery = searchInput.value.trim();
  if (searchQuery) {
    const filteredBooks = filterBooksByTitle(booksData, searchQuery);
    displayBooks(filteredBooks);
  } else {
    loadBooks();
  }
});




loadCategory();
loadBooks();


