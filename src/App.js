import logo from './logo.svg';
import './App.css';
import Palette from './components/Palette';
import { connect } from 'react-redux';

import colrActions from './actions/colrActions';

const App = props => {
  const { palette, dispatch } = props;

  return (
    <div className="App">
      <header className="App-header">
        Some Kind of App Or Something
      </header>

      <div className="App-content">

        {props.palette && <Palette palette={palette}/>}

        <button onClick={e => dispatch(colrActions.fetchPalette())} >Get a random palette</button>

      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    palette: state.colr.selectedScheme,
  }
}

export default connect(mapStateToProps)(App);
