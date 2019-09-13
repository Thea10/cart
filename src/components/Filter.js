import React, {Component} from 'react';

class Filter extends Component {
    render(){
           let {count, sort, size, filterPrice, filterSize} = this.props;
    return (
        <div className="row navbar-fixed-top filter">
            <div className="col-md-4">
                {count} products found
            </div>
            <div className="col-md-4">
                <label>
                    Filter By Price
                    <select className="form-control" value={sort} onChange={filterPrice} >
                        <option value=""> Select </option>
                        <option value="lowest"> lowest to highest </option>
                        <option value="highest"> highest to lowest </option>
                    </select>

                </label>

            </div>
            <div  className="col-md-4">
                <label>
                    Filter By Size
                    <select className="form-control" value={size} onChange={filterSize} >
                        <option value=""> Select </option>
                        <option value="S"> S</option>
                        <option value="M">M </option>
                        <option value="L"> L</option>
                        <option value="XL">XL </option>
                        <option value="XXL">XXL </option>
                    </select>

                </label>

            </div>
        </div>
    )}
}

export default Filter;