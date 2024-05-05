const app = angular.module('cart', []);

app.controller('cartController', function ($scope, $http) {
    $scope.cart = [];
    $scope.getAllCartItemFromCart = () => {
        $http.get(`http://localhost:3000/api/v1/cart/${localStorage.getItem('cartID')}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
            $scope.cart = response.data.CartItem;
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.updateQuantity = (id, quantity, price) => {
        $http.put(`http://localhost:3000/api/v1/cartItem/${id}`, {
            quantity,
            price
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllCartItemFromCart();
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
            $scope.getAllCartItemFromCart();
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

    $scope.getAllCartItemFromCart();
});
