import React, {Component} from 'react';

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: '',
        }
    }
    SelectSize = (e) => {
        // console.log(e.target.value);
        let selected = e.target.value;
        //  console.log(selected);

        this.setState({
            size: selected,
        })
    }

    render() {
        const items = this.props.products.map(product => {
            let img = "img/" + product.sku + ".jpg";
            return (
                <li key={product.id} className="col-md-8">
                    <img src={img} height="100" width="100" alt={product.title} />
                    <h4 style={{ height: 15 + "%" }} > {product.title}</h4> <h5><b> ${product.price}</b> </h5>
                    <div style={{ margin: 5 + "%", height: 10 + "%" }}>
                        <SizeList availSizes={product.sizes} clicked={this.SelectSize} />
                    </div>
                    <button className="btn btn-primary" title="Add item to cart" onClick={ (e) => this.props.handleAddToCart(e, product, this.state.size) }>
                        ADD TO CART
                    </button>
                    <h6 style = {{ display: "none" }}> Added to cart</h6>
                </li>
            )
        })
        return (items)
    }
}

function SizeList(props) {
    let choose = props.availSizes.map((size, i) => {
        return <button className="btn btn-light" key={i} value={size} onClick={props.clicked}> {size} </button>
    });
    return (choose)
}

//<select className="form-control" value={this.props.size} onChange={this.props.SelectSize} >
//           <option value=""> Select </option>


export default ProductList;