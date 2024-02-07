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
let cartcontainer = document.getElementById("cartcontainer");
let swiperwrapper = document.getElementById("swiper-wrapper");
displayCartData()
displayFavData()
function displayCartData() {
    let user = JSON.parse(localStorage.getItem("user"))
    cartcontainer.innerHTML = "";
    user.cart.forEach(el => {
        let item = products.find((item) => item.name === el.name)

        const {
            img, name, price, category
        } = item;
        let htmlComp = `
        <div  class="card bg-secondary-subtle border-0 mb-3" style="max-width: 540px;">
<div class="row g-0">
    <div class="col-md-6 d-flex justify-content-center align-items-center ">
        <img src="./img/${img} " class="w-50 h-75" alt="${name} " style="background-color :var(--secondarycolor)">
    </div>
    <div class="col-md-6">
        <div class="card-body " style="width: max-content;">
            <h5 class="card-title lh-base">product :${name}</h5>
            <h5 class="card-title lh-base">price : ${price} $</h5>
            <h5 class="card-title lh-base">category :${category}</h5>
            <div class="d-flex justify-content-between">
                <div>
                    <span class="fs-5">${el.quantity}</span>
                    <a><i data-bs-auto-close="false" class="fa-solid fa-plus fa-xs inc" id="incbtn" productName= "${name}"></i></a>      
                    <a><i class="fa-solid fa-minus fa-xs dec" id="decbtn"  productName= "${name}"></i></a>
                </div>
                <button class="btn btn-danger mx-1" productName= "${name}">Remove</button>
            </div>
        </div>
    </div>
</div>
</div>


        `;
        cartcontainer.innerHTML += htmlComp;
    });
    updateincdecbtn()
    updatetotalprice()
    let removebtns = document.querySelectorAll(".card .btn")
    removebtns.forEach((removebtn) => {
        removebtn.addEventListener("click", removefromcart)
    })

}
function displayFavData() {
    let user = JSON.parse(localStorage.getItem("user"))

    swiperwrapper.innerHTML = "";
    user.favorite.forEach(el => {
        let item = products.find((item) => item.name === el)

        const {
            img, name, category
        } = item;
        let htmlComp = `<div class="swiper-slide ">
        <div class=" card mb-1 ">
            <img src="./img/${img} " class="bg-secondary-subtle favimg" alt="t-shirt adidas"
                width="100%" height="100%">
            <div class="card-body d-flex justify-content-between   py-2 " name="t-shirt adidas">
                <div>
                <h5 class="card-subtitle my-1 lh-lg">product :${name}</h5>
                <h5 class="card-subtitle my-1 lh-lg">category :${category}</h5>
                </div>                          
                    <div class="icon">
                        <i class="fa-solid fa-heart fa-xl  m-3" productName= "${name}"></i>
                    </div>
            </div>
        </div>
    </div> `;
        swiperwrapper.innerHTML += htmlComp;

        let cards = document.querySelectorAll(".favoritecontainer .card")
        let swiperslides = document.querySelectorAll(".favoritecontainer .swiper-slide")
        cards.forEach((card) => {
            card.style.animation = 'favanimationcard 1s';
        })
        swiperslides.forEach((swiperslide) => {
            swiperslide.style.animation = 'favanimationslide 1s';
        })

    })


    let favicons = document.querySelectorAll(".card .fa-heart")
    favicons.forEach((favicon) => {
        favicon.addEventListener("click", addToFavorites)
    })

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            767: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            }
        }
    });

}


function removefromcart(event) {
    let productName = event.target.getAttribute("productName")
    let user = JSON.parse(localStorage.getItem("user"))
    let item = user.cart.find((item) => item.name === productName)
    user.cart.splice(user.cart.indexOf(item), 1)
    localStorage.setItem('user', JSON.stringify(user))
    displayCartData()
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
    let productName = event.target.getAttribute("productName")
    let user = JSON.parse(localStorage.getItem("user"))
    let item = user.cart.find((item) => item.name === productName)
    item.quantity += 1
    localStorage.setItem('user', JSON.stringify(user))
    displayCartData()
}
function decreace(event) {
    let productName = event.target.getAttribute("productName")
    let user = JSON.parse(localStorage.getItem("user"))
    let item = user.cart.find((item) => item.name === productName)
    if (item.quantity > 1) {
        item.quantity -= 1
    } else {
        user.cart.splice(user.cart.indexOf(item), 1)
    }
    localStorage.setItem('user', JSON.stringify(user))
    displayCartData()
}

function updatetotalprice() {
    let user = JSON.parse(localStorage.getItem("user"))
    let totalprice = 0
    user.cart.forEach((item) => {
        let product = products.find((product) => product.name === item.name)
        totalprice += item.quantity * product.price
    })
    document.getElementById("totalprice").innerHTML = `${totalprice}`
}



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
    displayFavData()
}









