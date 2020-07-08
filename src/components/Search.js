import React from 'react';

export class Search extends React.Component {
   onSearch() {
      const searchText = this._search.value;
      this.props.state.searchCharacters(searchText);
   }

   onSortChange(){
      const sortOrder = event.target.value;
      this.props.state.updateSort(sortOrder);
   }

   render() {
      return (
         <div className="flex-box space-between pb-3">
            <div className="fliter">
               <label htmlFor="search">Search by Name</label>
               <div className="input-group round-border-left">
                  <input
                     id="search"
                     className="form-control"
                     placeholder="Search"
                     onChange={()=> this.onSearch()}
                     ref={input => this._search = input}
                  />
                  <button className="btn-search" type="submit" onClick={()=> this.onSearch()}>
                     Search
                  </button>
               </div>
            </div>
            <div className="sort-fliter">
               <select id="sort-filter" onChange={() => this.onSortChange()}>
                  <option value="">Sort by ID</option>
                  <option value="-1">Ascending</option>
                  <option value="1">Descending</option>
               </select>
            </div>
         </div>
      );
   }
}

export default Search;
