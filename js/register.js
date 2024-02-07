var userdata = {}
var registersubmit = document.getElementById("registersubmit")
registersubmit.addEventListener("click", getFormData)

function getFormData() {
    var form = document.getElementById("form");
    var formData = new FormData(form);
    for (let [key, value] of formData.entries()) {
        userdata[key] = value
    }
    userdata["cart"] = [];
    userdata["favorite"] = [];

    // validation

    // if (result === undefined) {

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(userdata);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href ="login.html";
        // window.alert("register successfully")
    // } else {
        // localStorage.setItem('isLoggedIn', 'true');
        // localStorage.setItem('userdata', result);

        // window.location.href = "index.html";
        // updateNavigation()
    // }
}
// localStorage.setItem('isLoggedIn', JSON.stringify("{a:1,b:2}"));

