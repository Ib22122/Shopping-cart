var products = [
    {
        img: "product1.jpg",
        name: "t-shirt adidas",
        price: 80,
        category: "fashion",
    },
    {
        img: "product2.jpg",
        name: "earpods",
        price: 150,
        category: "phone accessories",
    },
    {
        img: "product3.jpg",
        name: "jacket",
        price: 120,
        category: "fashion",
    },
    {
        img: "product4.jpg",
        name: "adidas bottle",
        price: 50,
        category: "Sport",
    },
    {
        img: "product5.jpg",
        name: "glasses",
        price: 80,
        category: "men accessories",
    },
    {
        img: "product6.jpg",
        name: "cap",
        price: 20,
        category: "men accessories",
    },
    {
        img: "product7.jpg",
        name: "bag adidas",
        price: 110,
        category: "bags",
    },
    {
        img: "product8.jpg",
        name: "shoes adidas",
        price: 80,
        category: "sport",
    },
    {
        img: "product9.png",
        name: "bag",
        price: 110,
        category: "fashion",
    },
]
let container = document.getElementById("datacontainer");
let search = document.getElementById("search");
window.onload = function () {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        updateNavigation()
        updateselectedproduct()
        updateCartNumber()  
    }
   
};
displayData(products)

function displayData(data) {
    let a = "selectedbtn"
    let b = "selectedicon"
    
    container.innerHTML = "";
    data.forEach(el => {
        const {
            img, name, price, category
        } = el;
        if (localStorage.getItem('isLoggedIn') === 'true') {
            let user = JSON.parse(localStorage.getItem("user"))
            var cartitem  = user.cart.find((item) => item.name === name)
            var favitem = user.favorite.find((item) => item === name) 
        }  
        let htmlComp = `
        <div class=" card mb-1 ">
        <img src="./img/${img} " class="bg-secondary-subtle img" alt="${name}" width="100%" height="100%">
        <div class="card-body  mx-3 py-2 " name="${name}">
        <h5 class="card-subtitle my-1 ">product :${name}</h5>
        <h5 class="card-subtitle  my-2 ">price : ${price} $</h5>
        <h5 class="card-subtitle my-1">category :${category}</h5>
        <div class="d-flex justify-content-between">
                <button class="btn btn-primary fw-normal my-1 ${cartitem? "cartselected" : ""}" productName = "${name}">add to cart</button>
                 <i class="fa-solid fa-heart fa-xl m-3 ${favitem? "favselected" : ""}" productName = "${name}"></i> 
                </div>
    </div>
</div>`;
        container.innerHTML += htmlComp;
    });
}
search.addEventListener("input", () => {
    var select = document.getElementById("select").value;
    var filteredProducts = products.filter((product) => {
        return product[`${select}`].toLowerCase().startsWith(`${search.value.toLowerCase()}`)
    })
    displayData(filteredProducts);
})
function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    document.getElementById('loginLink').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('registerLink').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('logoutLink').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('cartLink').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('welcome').style.display = isLoggedIn ? 'block' : 'none';
    if (isLoggedIn) {
        document.getElementById('welcome').innerHTML = `welcome : ${JSON.parse(localStorage.getItem("user")).fname}`
    }
}
function logout() {
    // Perform logout logic, then remove the isLoggedIn flag from local storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    updateNavigation();
}

let btns = document.querySelectorAll(".card .btn")
btns.forEach((btn) => {
    btn.addEventListener("click", addtocart)
})

function addtocart(event) {

    if (JSON.parse(localStorage.getItem("isLoggedIn")) == true) {

        let productName = event.target.getAttribute("productName")
        let user = JSON.parse(localStorage.getItem("user"))
        let item = user.cart.find((item) => item.name === productName)

        if (item === undefined) {
            user.cart.push({ name: productName, quantity: 1 })
            event.target.style.backgroundColor = "red"
            event.target.style.borderColor = "red"
            event.target.innerHTML = "remove from cart"
        } else {
            user.cart.splice(user.cart.indexOf(item), 1)
            event.target.style.backgroundColor = "var(--blue)"
            event.target.style.borderColor = "var(--blue)"
            event.target.innerHTML = "add to cart"
        }

        localStorage.setItem('user', JSON.stringify(user))
        updateselectedproduct()
        // updateincdecbtn()
        updateCartNumber()
        document.getElementById('myDropdown').addEventListener('click', function (event) {
            event.stopPropagation();
        });


    } else {
        window.location.href = "login.html"
    }

}

function updateCartNumber() {
    let user = JSON.parse(localStorage.getItem("user"))
    var icon = document.querySelector(".icon");
    icon.setAttribute("productNumber", user.cart.length );
    
}


let shoppingcartul = document.getElementById("shoppingcartul")

function updateselectedproduct() {
    let user = JSON.parse(localStorage.getItem("user"))

    shoppingcartul.innerHTML = "";
    user.cart.forEach(el => {
        const { name, quantity } = el;
        let htmlComp = `
        
        <li class="m-2">
        <div class="dropdown-item bg-light p-2 rounded d-flex justify-content-between">
            <div>${name}</div>
            <div class="ps-5" data-bs-auto-close="false">
                <span class="px-2 fs-5">${quantity}</span>
                <a ><i data-bs-auto-close="false" class="fa-solid fa-plus fa-xs inc"  id="incbtn"></i></a>
                <a class="p-1"><i class="fa-solid fa-minus fa-xs dec" id="decbtn" ></i></a>
            </div>
        </div>
    </li>
        `;
        shoppingcartul.innerHTML += htmlComp;
    });
    localStorage.setItem("user", JSON.stringify(user))
    updateincdecbtn()

}
function updateincdecbtn() {
    let cart = JSON.parse(localStorage.getItem("user")).cart
    if (cart == "") {
    } else {
        let incbtns = document.querySelectorAll(".fa-plus")
        let decbtns = document.querySelectorAll(".fa-minus")
        incbtns.forEach((incbtn) => {
            incbtn.addEventListener("click", increace)
        })
        decbtns.forEach((decbtn) => {
            decbtn.addEventListener("click", decreace)
        })
    }
}
function increace(event) {
    let productName = event.target.parentNode.parentNode.parentNode.firstElementChild.textContent
    let user = JSON.parse(localStorage.getItem("user"))
    let item = user.cart.find((item) => item.name === productName)
    item.quantity += 1
    localStorage.setItem('user', JSON.stringify(user))
    updateselectedproduct()

}
function decreace(event) {
    let productName = event.target.parentNode.parentNode.parentNode.firstElementChild.textContent
    let user = JSON.parse(localStorage.getItem("user"))
    let item = user.cart.find((item) => item.name === productName)
    if (item.quantity >1) {
        item.quantity -= 1
    } else {
        user.cart.splice(user.cart.indexOf(item), 1)
    }
    localStorage.setItem('user', JSON.stringify(user))
    updateselectedproduct()
    updateCartNumber()
}



let favicons = document.querySelectorAll(".card .fa-heart")
favicons.forEach((favicon) => {
    favicon.addEventListener("click", addToFavorites)
})
function addToFavorites(event) {
    if (JSON.parse(localStorage.getItem("isLoggedIn")) == true) {
        let productName = event.target.getAttribute("productName")
        let user = JSON.parse(localStorage.getItem("user"))
        let item = user.favorite.find((item) => item === productName)
        if (item === undefined) {
            user.favorite.push(productName);
            event.target.style.color = "red"
        } else {
            user.favorite.splice(user.favorite.indexOf(item), 1)
            event.target.style.color = "var(--maincolor)"
        }
        localStorage.setItem('user', JSON.stringify(user))
    } else {
        window.location.href = "login.html"
    }
}



