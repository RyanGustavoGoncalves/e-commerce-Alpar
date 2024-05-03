export class CartItemService {
    
    calculateTotal = (cartItems) => {
        return cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
        }, 0);
    }
}