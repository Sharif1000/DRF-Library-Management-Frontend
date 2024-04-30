
const loadCategory = () => {
  fetch("https://drf-library-management-1.onrender.com/bookcategory/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-category");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
        <li> ${item.name}</li>
          `;
        parent.appendChild(li);
      });
    });
};

const loadBooks = () => {
  fetch("http://drf-library-management-1.onrender.com/book/")
            .then(res=>res.json())
            .then(data=>displayBooks(data))
};

const displayBooks = (books) => {
  books?.forEach((book) => {
    const parent = document.getElementById("books");
    const div = document.createElement("div");
    div.classList.add("pro-card");
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${book.genre}</h6>
        <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
        <p class="card-text">${book.ISBN}</p>
      </div>
      <div class="card-footer">
        <h6>Buy Now</h6>
      </div>
    </div>
  `;

    parent.appendChild(div);
  });
};



loadCategory();
loadBooks();


