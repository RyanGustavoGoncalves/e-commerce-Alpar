

const userLocalStorageToken = JSON.parse(localStorage.getItem('token'));

fetch(`http://localhost:3000/api/v1/get/token`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${userLocalStorageToken}`
    }
})
    .then(response => {
        response.json()
        if (response.status === 401) {
            console.log("Unauthorized");
            window.location.href = "/auth/login";
        }
    })
    .then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    });