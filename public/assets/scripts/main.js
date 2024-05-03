const app = angular.module('homeApp', []);

app.controller('homeController', function ($scope, $http) {
    $scope.role = JSON.parse(localStorage.getItem('user')).role;
    $scope.modal = false;
    $scope.cartItems = 0;
    $scope.quantity = 1;
    $scope.products = [];

    $scope.openModalProducts = () => {
        $scope.modal = true;
    }
    $scope.closeModalProducts = () => {
        $scope.modal = false;
    }

    $scope.logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    $scope.submit = (name, description, price, imgUrl) => {
        $http.post("http://localhost:3000/api/v1/product", {
            name,
            description,
            price,
            imageUrl: imgUrl,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalProducts();
        }).catch((error) => {
            console.log(error);
        });
    };

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
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.addToCart = (id, price) => {
        console.log(userDetails);
        for (let i = 0; i < userDetails.length; i++) {
            const userDetail = userDetails[i];

            const lastCartIndex = userDetail.cart.length - 1;
            const lastCart = userDetail.cart[lastCartIndex];

            const isLastCartClosed = lastCart.closed;
            console.log("isLastCartClosed", isLastCartClosed);
            if (isLastCartClosed) {
                console.log("O último carrinho para o usuário", userDetail.username, "está fechado. Criando um novo carrinho...");
                $scope.createCart();
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
                    console.log(response.data);
                    $scope.countItems();

                })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

    }

    $scope.getAllProducts();
    $scope.countItems = () => {
        userDetailsPromise.then(() => {
            userDetails.forEach(user => {
                $scope.cartItems = 0;
                user.cart.forEach(cart => {
                    $scope.cartItems += cart.CartItem.length;
                });
            });
        });
    }
    $scope.countItems();
});