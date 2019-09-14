import React, {Component} from 'react';

class Cart extends Component {
    render() {
        let style = {
            color: "#ffffff",
        }

        const {cartItems, handleRemoveFromCart, handleCheckout} = this.props;

        const totalPrice = cartItems.reduce((total, item) => {
            return total + (item.price)
        }, 0);
        return (
            <div className="cart alert alert-info">
                <h4> Cart </h4>
                {cartItems.length === 0 ?
                    <h5> Empty </h5>
                    :
                    <div>
                        <h5> Items: {cartItems.length} </h5>
                        <ul>
                            <CartItemList items ={cartItems} remove={ handleRemoveFromCart}/>
                        </ul>
                        <h5> <b> Total- ${totalPrice} </b> </h5>
                        <button className="btn btn-secondary" onClick={ (e) => handleCheckout(e) }>
                            <a href = "#" style={{ color: style.color }}> CHECKOUT</a>
                        </button>
                    </div>
                }

            </div>
        )
    }
}

function CartItemList(props) {
    const cartitems = props.items.map(item => {
        //  let itemtotal = item.price * item.count;
        return (
            <li key={item.id}>
                <h4> {item.title} - {item.count}  - ${item.price}  </h4>
                <button className="btn btn-danger" onClick={ (e) => props.remove(e, item) } > Remove </button>
            </li>
        )
    })
    return (
        cartitems
    )
}

export default Cart;