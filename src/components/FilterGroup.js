import React from 'react';

export class FilterGroup extends React.Component {
   clickHandler(group, name) {
      const value = event.target.checked;
      const filter = { group, name, value };
      this.props.onFilterChange(filter);
   }

   updateCheckboxSelection() {
      const { activeFilters } = this.props.state.data;
      let filters = [];
      for (const group in activeFilters) {
         filters = [
            ...filters,
            ...activeFilters[group].map((name) => ({
               group,
               name,
               value: true,
            })),
         ];
      }
      return filters;
   }

   render() {
      const { header, items } = this.props.filter;
      return (
         <div
            className="filter-container">
            <header className="text-strong">{header}</header>
            {items.map((category, idx) => {
               return (
                  <div
                     className="form-check"
                     key={idx}
                     onChange={() => this.clickHandler(header, category)}
                  >
                     <input
                        type="checkbox"
                        className="form-check-input"
                        name={category}
                        id={category}
                     />
                     <label
                        htmlFor={category}
                        className="form-check-label text-capitalize"
                     >
                        {category}
                     </label>
                  </div>
               );
            })}
         </div>
      );
   }
}
