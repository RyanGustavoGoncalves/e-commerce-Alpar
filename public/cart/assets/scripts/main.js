const app = angular.module('cart', []);

app.controller('cartController', function ($scope, $http) {
    $scope.cartItem = [];
    $scope.cart = [];
    $scope.total = 0;

    $scope.closeCart = () => {
        $http.put(`http://localhost:3000/api/v1/cart/finish/${localStorage.getItem('cartID')}`, null, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
            .then((response) => {
                console.log(response);
                alert('Compra realizada com sucesso!');
                window.location.href = '/cart/cartFinish';
            })
            .catch((error) => {
                console.log(error);
            });
    }

    $scope.getCartById = () => {
        $http.get(`http://localhost:3000/api/v1/cart/${localStorage.getItem('cartID')}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
            .then((response) => {
                console.log(response);
                $scope.cart = response.data;
                $scope.updateTotalPriceCart();
            }).catch((error) => {
                console.log(error);
            })
    }

    $scope.updateTotalPriceCart = () => {
        $http.put(`http://localhost:3000/api/v1/cart/${localStorage.getItem('cartID')}`, {
            total: $scope.getTotalPrice(),
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
            $scope.total = response.data.total;
        }).catch((error) => {
            console.log(error);
        })
    }

    $scope.getTotalPrice = () => {
        let totalPrice = 0;
        if ($scope.cart && $scope.cart.CartItem) {
            $scope.cart.CartItem.forEach((cartItem) => {
                totalPrice += cartItem.price * cartItem.quantity;
            });
        }
        return totalPrice;
    }



    $scope.updateQuantity = (id, quantity, price) => {
        $http.put(`http://localhost:3000/api/v1/cartItem/${id}`, {
            quantity
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
            $scope.getCartById();
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.deleteItemFromCart = (id) => {
        $http.delete(`http://localhost:3000/api/v1/cartItem/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
            $scope.getCartById();
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.addQuantity = (id, quantity, priceCardItem, priceProduct) => {
        quantity += 1;
        const price = priceCardItem + priceProduct;
        $scope.updateQuantity(id, quantity, price);
    }

    $scope.removeQuantity = (id, quantity, priceCardItem, priceProduct) => {
        if (quantity === 1) {
            $scope.deleteItemFromCart(id);
            return;
        }
        const price = priceProduct - priceCardItem;
        quantity -= 1;
        $scope.updateQuantity(id, quantity, price);
    }

    $scope.getCartById();
});
