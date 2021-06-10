import logo from './logo.svg';
import './App.css';
import Scheme from './components/Scheme';
import { connect } from 'react-redux';

import colrActions from './actions/colrActions';

const App = props => {
  const { scheme, dispatch } = props;

  return (
    <div className="App">
      <header className="App-header">
        Some Kind of App Or Something
      </header>

      <div className="App-content">

        {props.scheme && <Scheme scheme={scheme} mode="background"/>}

        <button onClick={e => dispatch(colrActions.fetchScheme())} >Get a random scheme</button>

      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    scheme: state.colr.selectedScheme,
  }
}

export default connect(mapStateToProps)(App);
