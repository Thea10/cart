import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductList from './components/ProductList';
import Filter from './components/Filter';
import Cart from './components/Cart';
import {displayList, setSearchField} from './actions';
import './App.css';
import Typed from 'typed.js';


const mapStateToProps = state =>{
    return {
      searchField: state.searchProducts.searchField,
        filteredProducts: state.displayList.filteredProducts,
        isPending: state.displayList.isPending,
        error: state.displayList.error
    }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    ondisplayList: () => dispatch(displayList()),
    onSearch: (e) => dispatch(setSearchField(e.target.value)),
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.filteredProducts,
    //  filteredProducts: [],
      size: '',
      sort: '',
      cartItems: [],
      selectedsize: '',
      strings: ['Shop with us, ^2000 With Ease', 'Start Shopping'],
    }
  }

  componentWillMount() {
     
    /*fetchData("http://localhost:8000/products");
    async function getitems() {
    const resp = await fetch("http://localhost:8000/products")
    const data = await resp.json()
    console.log(data);
    
    }

    getitems(); 
    fetch("db.json")
      .then(res => res.json())
      .then(data => this.setState({
        products: data.products,
        filteredProducts: data.products
      })); */

    if (localStorage.getItem("cartItems")) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    }

    //  console.log(this.state.sort);

  }

  componentDidMount() {

    this.props.ondisplayList();
  
    const { strings } = this.state;
    // You can pass other options here, such as typing speed, back speed, etc.
    const options = {
      strings: strings,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 5000,
       showCursor: false,
       
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed("#type", options);

  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting
    // to prevent memory leaks
   
    this.typed.destroy();
  }

  listProducts = () => {
    let items
    this.setState(state => {
      if (state.sort !== '') {
        items = this.props.filteredProducts.sort((a, b) => (state.sort === 'lowest') ? (a.price > b.price ? 1 : -1) : (a.price < b.price ? 1 : -1));
      } else {
        items = this.props.filteredProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
      }

      if (state.size !== '') {
        items = this.props.filteredProducts.filter((a) => (a.sizes.includes(state.size)) ? true : false);
      }
      return { filteredProducts: items }
    })
  }

  filterPrice = (e) => {
    this.setState({
      sort: e.target.value
    })
    this.listProducts();
  }

  /* filterBySize = () => {
     this.setState(state => {
       let items
       if (state.size !== '') {
         items = state.products.filter((a) => (a.sizes.includes(state.size)) ? true : false);
       } else {
         items = state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
       }
       return { filteredProducts: items }
     });
   } */

  filterSize = (e) => {
    this.setState({
      size: e.target.value
    })
    //    this.filterBySize();
    this.listProducts();
  }



  handleAddToCart = (e, product, si) => {
   // console.log(si);

    //  if (!si) throw Error;

    this.setState(state => {
      let cartItems = state.cartItems;
      let inCart = false;
     // state.selectedsize = si;

      cartItems.forEach(item => {
        if (item.id === product.id) {
          item.selectedsize.push(si);
          inCart = true;
          item.count++;
          item.price = item.count * item.price;
        //  console.log(item);
        }
      });

      if (!inCart) {
        cartItems.push({...product, count: 1, selectedsize: [si]});
      }

      localStorage.setItem( "cartItems", JSON.stringify(cartItems));
      return cartItems;
    });

  }


handleRemoveFromCart = (e, item) => {
  //console.log(e, item);
  this.setState(state => {
    const cartItems = state.cartItems.filter(itm => itm.id !== item.id);
    localStorage.setItem("cartItems", cartItems);
    return { cartItems };
  })

}

handleCheckout = (e) => {
  console.log(e);
}



render() {
  window.addEventListener('scroll', (e) => {
    var nav = document.getElementById('nav');
    var navbtn = nav.querySelectorAll('button');
    //to change the background on scroll
    if (window.scrollY > 50) {
      nav.classList.add('header-scrolled')
      nav.classList.add('navbar-dark');
    } else if (nav.classList.contains('header-scrolled') && nav.classList.contains('navbar-dark')) {
      nav.classList.remove("header-scrolled");
      nav.classList.remove("navbar-dark");
    } else {
      nav.classList.remove("header-scrolled");
      nav.classList.remove("navbar-dark")
    }

    navbtn.forEach(btn => {
      if (nav.classList.contains('header-scrolled')) {
        btn.classList.add('btn-scrolled')
      } else {
        btn.classList.remove('btn-scrolled')
      }
    });

  })
 // console.log(this.props);
  const output = this.props.filteredProducts.filter(product =>{
            return product.title.toLowerCase().includes(this.props.searchField.toLowerCase());
        });

  return (
    <div>
      <header id="nav" className="navbar navbar-fixed-top  navbar-expand-md  navbar-light no-margin" >
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar"> <span className="navbar-toggler-icon"> </span> </button>
        <h1  style={{ marginLeft: 2 + "%" }}> My Shopping Cart </h1>

        <span
          style={{ whiteSpace: 'pre', marginLeft: 2 + "%" }}
          ref={(el) => { this.el = el; } }
          id="type"
          />

        <div className="collapse navbar-collapse" id="navbar">

          <button className="btn btn-primary"> (LogIn/LogOut) </button>
          <button className="btn btn-primary"> About Us </button>
        </div>
        <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={this.props.onSearch} />

      </header>
      <Filter size={this.state.size} sort={this.state.sort} filterSize={this.filterSize} filterPrice ={this.filterPrice} count ={this.props.filteredProducts.length}/>
      <hr />
      <div className="container">
        <div className="row list">
          <ul className="col-md-8">
            <ProductList products={output} handleAddToCart ={this.handleAddToCart} SelectSize={this.SelectSize} size={this.state.selectedsize}  />
          </ul>
          <div className="col-md-4">
            <Cart cartItems={this.state.cartItems} handleCheckout={this.handleCheckout} handleRemoveFromCart = {this.handleRemoveFromCart}/>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
