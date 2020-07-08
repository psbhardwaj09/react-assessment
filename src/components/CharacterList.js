import React from 'react';
import { Character } from './Character';

export class CharacterList extends React.Component {
   render() {
      const { characters } = this.props;
      console.log('CharacterList - State: ', this.props);
      return (
         <div className="page-container">
            <div className="flex-box" id="charList">
               {characters.map((detail,idx) => {
                  return <Character detail={detail}  key={idx}/>;
               })}
            </div>
         </div>
      );
   }
}
export default CharacterList;
