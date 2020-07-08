import React from 'react';
import { FilterGroup } from './FilterGroup';

export class SelectedFilters extends React.Component {
   removeFIlter(filter) {
      filter.value = false;
      this.props.state.filterChanged(filter);
   }

   getFilters(){
      const { activeFilters } = this.props.state.data;
      console.log('activeFilters:', activeFilters);
      let filters = [];
      for (const group in activeFilters) {
         filters = [...filters, ...activeFilters[group].map( name => ({group, name, value: true}))];
      }
      return filters;
   }

   render() {
      const filters = this.getFilters();
      return (
         <div id="selectedFilters">
            <h5>Selected Filters</h5>
            {filters.map((filter, idx) => {
               return <div className="selected-filter text-capitalize" key={idx}>
                  {filter.name}
                  <span className="close" onClick={() => this.removeFIlter(filter)}>X</span>
               </div>
            })}
         </div>
      );
   }
}

export default SelectedFilters;
