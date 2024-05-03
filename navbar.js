function checkAuth() {
    var token = localStorage.getItem('token');
    if (token) {
        return true;
    } else {
        return false;
    }
}

window.onload = function() {
    if (checkAuth()) {
        var menuContainer = document.getElementById('menu-container');
        menuContainer.innerHTML += `
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    Profile
                </button>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                    <li><a class="dropdown-item active" href="profile.html">Profile</a></li>
                    <li><a class="dropdown-item" href="wishlist.html">Wishlist</a></li>
                    <li onclick="handlelogOut()"><a class="dropdown-item">Logout</a></li>
                </ul>
            </div>
        `;
    } else {
        var menuContainer = document.getElementById('menu-container');
        menuContainer.innerHTML += `
            <li class="menu"><a target="_blank" href="login.html">Login</a></li>
        `;
    }
}
