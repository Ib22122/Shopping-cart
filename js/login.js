
var logindata = {}
var loginsubmit =  document.getElementById("loginsubmit")
loginsubmit.addEventListener("click", getFormData )


function  getFormData() {
    var form = document.getElementById("form");
    var formData = new FormData(form);
    
    for (let [key , value] of formData.entries()) {
        logindata[key] = value
     } 
    let users = JSON.parse(localStorage.getItem('users') )|| []
    let result = users.find(user => user.email === logindata.email &&  user.password === logindata.password);
    if (result === undefined) {
        console.log("user not found");
    } else {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(result));
        window.location.href ="index.html";
        
    }
}


 

