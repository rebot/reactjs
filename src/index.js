import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const data = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

const ProductRow = ({ name, price }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );
};

const ProductCategoryRow = ({ category }) => {
  return (
    <tr>
      <td><b>{category}</b></td>
    </tr>
  );
};

const ProductTable = ({ state, data }) => {
  const categories = [...new Set(data.map(e => e.category))];
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => {
          return (
            <>
              <ProductCategoryRow key={category} category={category} />
              {data
                .filter(
                  e =>
                    e.category === category &&
                    e.name.toLowerCase().includes(state.filter) &&
                    (state.inStock === true ? e.stocked === true : true)
                )
                .map((product, index) => {
                  return (
                    <ProductRow
                      key={index}
                      name={product.name}
                      price={product.price}
                    />
                  );
                })}
            </>
          );
        })}
      </tbody>
    </table>
  );
};

const SearchBar = ({ state, onChange }) => {
  const handleChange = e => {
    console.log(state);
    onChange(e);
  };

  return (
    <>
      <input name="filter" value={state.filter} onChange={handleChange} />
      <div>
        <input
          name="inStock"
          type="checkbox"
          checked={state.inStock}
          onChange={handleChange}
        />
        <label>Only show products in stock</label>
      </div>
    </>
  );
};

const FilterableProductTable = ({ data }) => {
  const [state, setState] = useState({
    filter: "",
    inStock: false
  });

  const handleChange = e => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({
      ...state,
      [e.target.name]: typeof value === "string" ? value.toLowerCase() : value
    });
  };

  return (
    <>
      <SearchBar state={state} onChange={handleChange} />
      <ProductTable state={state} data={data} />
    </>
  );
};

ReactDOM.render(
  <FilterableProductTable data={data} />,
  document.getElementById("container")
);
