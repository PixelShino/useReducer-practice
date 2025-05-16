import { useReducer } from 'react';
import './index.css';

function App() {
  const initialDate = { date: new Date(), inputValue: '' };
  const [state, dispatch] = useReducer(reducer, initialDate);

  function reducer(state, action) {
    switch (action.type) {
      case 'reset':
        return { ...state, date: new Date() };
      case 'updateInput':
        return { ...state, inputValue: action.payload };
      case 'updateDate': {
        const days = parseInt(state.inputValue, 10);
        if (isNaN(days)) {
          return state;
        }
        const updatedDate = new Date(state.date);
        updatedDate.setDate(updatedDate.getDate() + days);
        return { ...state, date: updatedDate, inputValue: '' };
      }
      default:
        return state;
    }
  }

  return (
    <div className='app-container'>
      <h1 className='date-text'>{state.date.toDateString()}</h1>

      <button className='btn' onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>

      <div className='input-group'>
        <input
          className='input'
          type='number'
          placeholder='Days after today'
          value={state.inputValue}
          onChange={(e) =>
            dispatch({ type: 'updateInput', payload: e.target.value })
          }
          aria-label='Number of days to add'
        />
        <button
          className='btn primary-btn'
          onClick={() => dispatch({ type: 'updateDate' })}
        >
          Show result
        </button>
      </div>
    </div>
  );
}

export default App;
