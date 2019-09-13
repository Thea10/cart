import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductList from './components/ProductList';
import Filter from './components/Filter';
import Cart from './components/Cart';
import {displayList, setSearchField, setSizeFilter} from './actions';
import './App.css';
import Typed from 'typed.js';


const mapStateToProps = state => {
  return {
    searchField: state.searchProducts.searchField,
    filteredProducts: state.displayList.filteredProducts,
    isPending: state.displayList.isPending,
    error: state.displayList.error,
    filterSizeField: state.filterSize.filterField,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ondisplayList: () => dispatch(displayList()),
    onSearch: (e) => dispatch(setSearchField(e.target.value)),
    filterSize: (e) => dispatch(setSizeFilter(e.target.value)),
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.filteredProducts,
      //  filteredProducts: [],
      // size: '',
      sort: '',
      cartItems: [],
      strings: ['Shop with us, ^2000 With Ease', 'Start Shopping'],
    }
  }

  componentWillMount() {
    if (localStorage.getItem("cartItems")) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    }

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
    //#type refers to the <span> in the render() method, where we want to display the text
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

      return { filteredProducts: items }
    })
  }

  filterPrice = (e) => {
    this.setState({
      sort: e.target.value
    })
    this.listProducts();
  }

  handleAddToCart = (e, product, si) => {
    this.setState(state => {
      let cartItems = state.cartItems;
      let inCart = false;

      cartItems.forEach(item => {
        if (item.id === product.id) {
          item.selectedsize.push(si);
          inCart = true;
          item.count++;
          item.price = item.count * item.price;
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
  this.setState(state => {
    const cartItems = state.cartItems.filter(itm => itm.id !== item.id);
    localStorage.setItem("cartItems", cartItems);
    return { cartItems };
  })
}

handleCheckout = (e) => {
  console.log(e);
}

events = () => {
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
}

render() {
  this.events();

  let {filteredProducts, filterSizeField, searchField, onSearch, filterSize  } = this.props;
  // console.log(this.props);
  const output = filteredProducts.filter(product => {
    if (filterSizeField && searchField) {
      return product.sizes.includes(filterSizeField) && product.title.toLowerCase().includes(searchField.toLowerCase())
    } else if (!filterSizeField && !searchField) {
      return product.title.toLowerCase().includes(searchField.toLowerCase())
    } else if (!filterSizeField && searchField) {
      return product.title.toLowerCase().includes(searchField.toLowerCase())
    } else if (!searchField && filterSizeField) {
      return product.sizes.includes(filterSizeField)
    }
  });

  return (
    <div>
      <header id="nav" className="navbar navbar-fixed-top  navbar-expand-md  navbar-light no-margin" >
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar"> <span className="navbar-toggler-icon"> </span> </button>
        <h1  style={{ marginLeft: 2 + "%" }}> My Shopping Cart </h1>
        <span style={{ whiteSpace: 'pre', marginLeft: 2 + "%" }} id="type" />
        <div className="collapse navbar-collapse" id="navbar">
          <button className="btn btn-primary"> (LogIn/LogOut) </button>
          <button className="btn btn-primary"> About Us </button>
        </div>
        <input className="form-control mr-sm-2" type="search" placeholder="Search" onChange={onSearch} />
      </header>
      <Filter size={filterSizeField} sort={this.state.sort} filterSize={filterSize} filterPrice ={this.filterPrice} count ={filteredProducts.length}/>
      <hr />
      <div className="container">
        <div className="row list">
          <ul className="col-md-8">
            <ProductList products={output} handleAddToCart ={this.handleAddToCart} SelectSize={this.SelectSize}  />
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
