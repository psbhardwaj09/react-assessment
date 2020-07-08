export const LOAD_CHARACTERS_DATA = '[Characters] Load Characters data';
export const LOAD_CHARACTERS_SUCCESS = '[Characters] Load Characters Success';
export const LOAD_CHARACTERS_FAILURE = '[Characters] Load Characters Failure';
export const FILTER_CHARACTERS = '[Characters] Filter Characters ';
export const FILTER_CHANGED = '[Characters] On New Filter Selection';
export const UPDATE_SORT = '[Characters] Sort Characters ';
export const SEARCH_CHARACTERS= '[Character] Search Characters';

export const loadCharacters = () => ({
   type: LOAD_CHARACTERS_DATA,
});

export const loadCharactersSuccess = (characters) => ({
   type: LOAD_CHARACTERS_SUCCESS,
   payload: { characters },
});

export const loadCharactersFailure = (error) => ({
   type: LOAD_CHARACTERS_FAILURE,
   payload: { error },
});

export const filterCharacters = (activeFilters) => ({
   type: FILTER_CHARACTERS,
   payload: { activeFilters },
});

export const filterChanged = (filter) => ({
   type: FILTER_CHANGED,
   payload: { filter },
});

export const updateSort = (sortOrder) => ({
   type: UPDATE_SORT,
   payload: sortOrder
});

export const searchCharacters = (searchToken) => ({
   type: SEARCH_CHARACTERS,
   payload: searchToken
});

export function fetchCharacters() {
   console.log('Fetch List...')
   const URL = 'https://rickandmortyapi.com/api/character/';
   return (dispatch) => {
      dispatch(loadCharacters());
      return fetch(URL)
         .then(handleErrors)
         .then((res) => res.json())
         .then(json => {
            return json.results.map(item => {
               const currentYear = new Date().getFullYear();
               const itemCreatedYear = new Date(item.created).getFullYear();
               item.created = currentYear - itemCreatedYear +' years';
               return item;
            })
         })
         .then((characters) => {
            dispatch(loadCharactersSuccess(characters));
            return characters;
         })
         .catch((error) => dispatch(loadCharactersFailure(error)));
   };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
   if (!response.ok) {
      throw Error(response.statusText);
   }
   return response;
}
