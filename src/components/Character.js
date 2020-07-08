import React from 'react';

export class Character extends React.Component {
  render() {
    const { detail } = this.props;
     return (
     <div className="item_container">
     <div className="card list-item">
       <div className="item-header">
         <img className="card-img-top" src={detail.image} alt="{detail.name}"/>
         <div className="item-details">
           <h5 className="item-title">{detail.name}</h5>
           <p className="item-id"> id: {detail.id} - created {detail.created} ago </p>
         </div>
       </div>
       <div className="item-data">
         <ul>
           <li><span>STATUS</span><span className="info">{detail.status}</span></li>
           <li><span>SPECIES</span><span className="info">{detail.species}</span></li>
           <li><span>GENDER</span><span className="info">{detail.gender}</span></li>
           <li><span>ORIGIN</span><span className="info">{detail.origin.name}</span></li>
           <li><span>LAST LOCATION</span><span className="info">{detail.location.name}</span></li>
         </ul>
       </div>
     </div>
   </div>)
  }
}
export default Character;
