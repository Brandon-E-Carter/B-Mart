import './App.css';
import { useEffect, useState } from 'react';
import firebase from './firebase.js';
import StoreItem from './StoreItem';
import FilterList from './Filter/FilterList';

function App() {
   const [filteredItems, setfilteredItems] = useState([""]);
   const [allStoreItems, setAllStoreItems] = useState([]);

   const filterOptions = [...new Set(allStoreItems.map(item => {
      return item.category;
   }))];

   useEffect(() => {
      fetch(`https://fakestoreapi.com/products`)
         .then(responce => responce.json())
         .then(jsonData => {
            setAllStoreItems(jsonData);
            setfilteredItems(jsonData);
         });
   }, [])

   function sortItems(filters) {
      if (!filters.length) {
         setfilteredItems(allStoreItems);
         return
      }
      
      let newFilteredItems = [];

      filters.forEach(filter => {
         newFilteredItems.push(...allStoreItems.filter(item => {
            return item.category === filter;
         }))
      });
      
      setfilteredItems(newFilteredItems);
   }

   function addToCart(item) {
      console.log(`${item.title} added To Cart`);
   }

   return (
      <div className="App">
         <h1>My E-commerce Website</h1>

         <div>
            <p>Cart</p>
         </div>

         <div className="flex-container">
            <FilterList
               filterOptions={filterOptions}
               sortItems={sortItems}
            />

            <StoreItem
               filteredItems={filteredItems}
               purchaseButton={addToCart}
            />

         </div>
      </div>
   );
}

export default App;
