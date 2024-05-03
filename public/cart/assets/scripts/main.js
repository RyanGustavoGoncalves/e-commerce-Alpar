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

    $scope.updateQuantity = (id) => {
        $http.put(`http://localhost:3000/api/v1/cart/${id}`, {
            quantity: $scope.quantity
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

    $scope.addQuantity = (id, quantity) => {
        console.log("addQuantity ", quantity);
        quantity += 1;
        $scope.updateQuantity(id);
    }

    $scope.removeQuantity = (id, quantity) => {
        console.log("removeQuantity", quantity);
        quantity -= 1;
        $scope.updateQuantity(id);
    }

    $scope.getAllCartItemFromCart();
});
