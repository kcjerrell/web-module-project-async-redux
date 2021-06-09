import logo from './logo.svg';
import './App.css';
import Palette from './components/Palette';
import { connect } from 'react-redux';

import designerActions from './actions/designerActions';
import collovActions from './actions/collovActions';

import apiAccess from './apiAccess';
apiAccess.create({
  name: 'collov',
  url: 'http://www.colourlovers.com/api/',
  ignore: ['/palette/random'],
  queryAll: {format: 'json'}
});

const App = props => {
  const { palette, dispatch } = props;

  return (
    <div className="App">
      <header className="App-header">
        Some Kind of App Or Something
      </header>

      <div className="App-content">

        {props.palette && <Palette />}

        <button onClick={e => dispatch(collovActions.getRandomPalette())} >Get a random palette</button>

      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    palette: state.collov.selectedItem,
  }
}

export default connect(mapStateToProps)(App);
