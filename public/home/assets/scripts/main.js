fetch("http://localhost:3000/api/v1/product", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
        name: "product 1",
        price: 100
    })
})
