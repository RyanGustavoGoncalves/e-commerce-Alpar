const app = angular.module('homeApp', []);

app.controller('homeController', function ($scope, $http) {
    $scope.role = JSON.parse(localStorage.getItem('user')).role;
    $scope.cartItems = 0;
    $scope.quantity = 1;
    $scope.products = [];
    $scope.cartId;
    $scope.modalRender = 0;
    $scope.productIdUpdate = 0;
    $scope.searchTerm = '';

    $scope.logout = () => {
        localStorage.clear();
        window.location.href = "/"; 
    }

    $scope.getAllProducts = () => {
        $http.get("http://localhost:3000/api/v1/product", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            $scope.products = response.data;
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.createCart = () => {
        $http.post("http://localhost:3000/api/v1/cart", {
            userId: JSON.parse(localStorage.getItem('user')).id,
            total: 0,
            closed: false,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            localStorage.setItem("cartID", response.data.id);
            alert("Carrinho criado com sucesso");
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.addToCart = (id, price) => {
        console.log(userDetails);
        for (let i = 0; i < userDetails.length; i++) {
            const userDetail = userDetails[i];
            if (userDetail.cart === undefined || userDetail.cart.length === 0) {
                console.log("O usuário", userDetail.username, "não tem carrinhos. Criando um novo carrinho...");
                localStorage.removeItem("cartID");
                $scope.createCart();
                return;
            }

            const lastCartIndex = userDetail.cart.length - 1;
            const lastCart = userDetail.cart[lastCartIndex];

            const isLastCartClosed = lastCart.closed;
            if (isLastCartClosed) {
                console.log("O último carrinho para o usuário", userDetail.username, "está fechado. Criando um novo carrinho...");
                localStorage.removeItem("cartID");
                $scope.createCart();
                return;
            } else {
                console.log("O último carrinho para o usuário", userDetail.username, "está aberto. Mantendo o mesmo carrinho...");
                $http.post("http://localhost:3000/api/v1/cartItem", {
                    productId: id,
                    cartId: userDetail.cart[lastCartIndex].id,
                    quantity: 1,
                    price: price,
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((response) => {
                    console.log(response);
                    alert("Item adicionado ao carrinho");
                    $scope.countItems();
                })
                    .catch((error) => {
                        if (error.status === 400) {
                            alert("Item já está no carrinho");
                        }
                        console.log(error);
                    });
            }
        }
    }

    $scope.getAllProducts();
    $scope.countItems = () => {
        userDetailsPromise.then(() => {
            const lastUser = userDetails[userDetails.length - 1];
            if (lastUser && lastUser.cart && lastUser.cart.length > 0) {
                localStorage.setItem("cartID", lastUser.cart[lastUser.cart.length - 1].id);
                const lastCart = lastUser.cart[lastUser.cart.length - 1];
                $scope.cartItems = lastCart.CartItem.length;
            } else {
                $scope.cartItems = 0;
            }
        });
    }

    $scope.countItems();
    $scope.searchProducts = () => {
        if (!$scope.searchTerm.trim()) {
            $scope.getAllProducts();
        } else {
            $scope.products = $scope.products.filter(product => {
                return product.name.toLowerCase().includes($scope.searchTerm.toLowerCase());
            });
        }
    };

    
});