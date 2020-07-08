import {
   LOAD_CHARACTERS_DATA,
   LOAD_CHARACTERS_SUCCESS,
   LOAD_CHARACTERS_FAILURE,
   FILTER_CHANGED,
   UPDATE_SORT,
   SEARCH_CHARACTERS,
} from '../actions/actionCreators';

import { FILTERS } from '../data/filters';

const initialState = {
   allCharacters: [],
   characters: [],
   loading: false,
   error: null,
   filterList: FILTERS,
   activeFilters: {},
   sortOrder: -1,
};

export default function characterReducer(state = initialState, action) {
   switch (action.type) {
      case LOAD_CHARACTERS_DATA:
         return {
            ...state,
            loading: true,
            error: null,
         };

      case LOAD_CHARACTERS_SUCCESS:
         const { characters } = action.payload;
         return {
            ...state,
            allCharacters: characters,
            characters,
            loading: false,
         };

      case LOAD_CHARACTERS_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload.error,
            characters: [],
         };

      case FILTER_CHANGED: {
         let activeFilters = { ...state.activeFilters };
         let characters = [...state.allCharacters];
         if (action.payload) {
            const filter = action.payload.filter;
            let filterGroup = activeFilters[filter.group];
            if (!filterGroup && filter.value) {
               activeFilters[filter.group] = [filter.name];
            } else {
               if (!filter.value) {
                  const index = filterGroup.findIndex(
                     (item) => item == filter.name
                  );
                  filterGroup.splice(index, 1);
               } else {
                  filterGroup.push(filter.name);
               }
            }
            characters = getFilteredData(activeFilters, characters);
         }
         return {
            ...state,
            activeFilters,
            characters,
         };
      }
      case UPDATE_SORT: {
         const sortOrder = action.payload;
         let characters = [...state.characters];
         characters.sort((item1, item2) => {
            if (item1.id > item2.id) return -1 * sortOrder;
            if (item1.id < item2.id) return 1 * sortOrder;
            if (item1.id = item2.id) return 0;
         });
         return {
            ...state,
            characters,
         };
      }

      case SEARCH_CHARACTERS: {
         const searchToken = action.payload.toLowerCase();
         let characters = [];

         if (searchToken) {
            characters = [...state.characters];
            characters = characters.filter((item) =>
               item.name.toLowerCase().includes(searchToken)
            );
         } else {
            characters = [...state.allCharacters];
         }
         return {
            ...state,
            characters,
         };
      }

      default:
         return state;
   }
}
function filterGender(filters, dataToFilter) {
   if (filters.length == 0) return dataToFilter;
   return dataToFilter.filter((item) =>
      filters.includes(item.gender.toLowerCase())
   );
}

function filterOrigins(filters, dataToFilter) {
   if (filters.length == 0) return dataToFilter;
   return dataToFilter.filter((item) =>
      filters.includes(item.origin.name.toLowerCase())
   );
}

function filterSpecies(filters, dataToFilter) {
   if (filters.length == 0) return dataToFilter;
   return dataToFilter.filter((item) => {
      const species = item.species.toLowerCase();
      return (
         filters.includes(species) ||
         (filters.includes('other species') &&
            species != 'human' &&
            species != 'mytholog')
      );
   });
}

function filterDataByCategory(filter, activeFilters, filterData) {
   switch (filter.toLowerCase()) {
      case 'gender':
         filterData = filterGender(activeFilters[filter], filterData);
         break;
      case 'origin':
         filterData = filterOrigins(activeFilters[filter], filterData);
         break;
      case 'species':
         filterData = filterSpecies(activeFilters[filter], filterData);
         break;
   }
   return filterData;
}

function getFilteredData(activeFilters, filteredData) {
   for (const filter in activeFilters) {
      filteredData = filterDataByCategory(filter, activeFilters, filteredData);
   }
   return filteredData;
}
