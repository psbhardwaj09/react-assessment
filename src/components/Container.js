import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';
import { CharacterList } from './CharacterList';
import { Filters } from './Filters';
import { Search } from './Search';
import { SelectedFilters } from './SelectFilters';

export class Component extends React.Component {
   componentDidMount() {
      this.props.fetchCharacters();
   }

   render() {
      console.log('this.props: ', this.props);
      const { characters } = this.props.data;
      return (
         <div className="container flex-box">
            <Filters state={this.props} />
            <section className="right-section">
               <SelectedFilters state={this.props} />
               <Search state={this.props} />
               <CharacterList characters={characters} />
            </section>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return { data: state.data };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators(actions, dispatch);
}

export const Container = connect(
   mapStateToProps,
   mapDispatchToProps
)(Component);
