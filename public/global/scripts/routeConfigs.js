

const userLocalStorageToken = localStorage.getItem('token');

fetch(`http://localhost:3000/api/v1/get/byToken`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${userLocalStorageToken}`
    }
})
    .then(response => {
        response.json()
        if (response.status === 401) {
            console.log("Unauthorized");
            window.location.href = "/welcomePage";
        }
    })
    .then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    });