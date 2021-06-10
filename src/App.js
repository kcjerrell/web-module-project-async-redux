import logo from './logo.svg';
import './App.css';
import Scheme from './components/Scheme';
import { connect } from 'react-redux';

import colrActions from './actions/colrActions';
import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';

const LoadingIndicator = styled.div`
  font-size: 2em;
  margin: 2em;
  padding: 2em;
`;

const SchemeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const App = props => {
  const { scheme, dispatch } = props;

  const testthing = (d) => console.log(d);

  useEffect(() => {
    axios.get('http://www.colourlovers.com/api/palettes/random?format=json&jsonCallback=testthing')
      .then(r => console.log(r));
  });

  return (
    <div className="App">
      <header className="App-header">
        Some Kind of App Or Something
      </header>

      <div className="App-content">

        <button onClick={e => dispatch(colrActions.fetchScheme())} >Get a random scheme</button>
        <button onClick={e => dispatch(colrActions.listSchemes())} >List some schemes</button>

        {props.mode === "single" && props.scheme && <Scheme scheme={scheme} mode="background" />}

        {props.mode === "list" && props.schemeList &&
          <SchemeListContainer>
            {props.schemeList.map((scheme, i) => <Scheme scheme={scheme} mode="item" key={i} />)}
          </SchemeListContainer>
        }

        {props.isFetching && <LoadingIndicator>Loading....</LoadingIndicator>}

      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    scheme: state.colr.selectedScheme,
    schemeList: state.colr.schemeList,
    isFetching: state.colr.isFetching,
    mode: state.colr.schemeViewMode
  }
}

export default connect(mapStateToProps)(App);
