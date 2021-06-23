import { useState } from "react";

function FilterList(props) {
   const { filterOptions, sortItems } = props;

   const [appliedFilters, setAppliedFilters] = useState([]);

   const handleUserChoice = (e) => {
      let filters = appliedFilters;
      console.log(e);

      if (e.target.checked) {
         console.log("is checked")
         filters.push(e.target.value);
      } else {
         console.log("not checked")
         filters = appliedFilters.filter(category => {
            return category !== e.target.value;
         })
      }

      setAppliedFilters(filters);

      sortItems(filters);
   }

   return (
      <div>
         <form className="filterForm" name="filterForm">
            <fieldset>
               <legend>Filters</legend>
               <ul>
                  {
                     filterOptions.map(category => {
                        return (
                        <li key={category}>
                           <input onChange={handleUserChoice} type="checkbox" name="filterItem" id={category} value={category} />
                           <label htmlFor={category}>{category}</label>
                        </li>
                        )
                     })
                  }
               </ul>
            </fieldset>
         </form>
      </div>


   )
}

export default FilterList;