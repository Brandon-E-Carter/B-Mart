import './App.css';
import { useEffect, useState } from 'react';
// import firebase from './firebase.js';
// import FakeStoreApi from './FakeStoreApi.js';
import StoreItem from './StoreItem';

function App() {
  // let itemCategories = [];
  // const [itemCategory, setItemCategory] = useState(null);

  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then(responce => responce.json())
      .then(jsonData => {
        sortItems(jsonData);
      });
  }, [])

  console.log(storeItems);

  function sortItems(products) {
    // itemCategories = [new Set(products.category)];
    console.log(products);

    setStoreItems(products)
  }

  function addToCart(item) {
    console.log(`${item.title} added To Cart`);
  }



  return (
    <div className="App">
      <h1>My E-commerce Website</h1>

      {
        storeItems.map(item => {
          return <StoreItem
            displayItem={item}
            key={item.id}
            purchaseButton={() => addToCart(item)}
          />
        })
      }
    </div>
  );
}

export default App;
