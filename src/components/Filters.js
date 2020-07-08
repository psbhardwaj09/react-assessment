import React from 'react';
import { FilterGroup } from './FilterGroup';

export class Filters extends React.Component {
   onFilterChange(filter) {
    this.props.state.filterChanged(filter)
   }

   render() {
      const { filterList } = this.props.state.data;
      return (
         <section className="left-section" id="filters">
            <h5>Filters</h5>
            {filterList.map((filter, idx) => {
               return (
                  <FilterGroup
                     filter={filter}
                     key={idx}
                     onFilterChange = { (val) => this.onFilterChange(val) }
                  />
               );
            })}
         </section>
      );
   }
}

export default Filters;
