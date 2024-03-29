# Redux Toolkit

## Installation

    npx create-react-app my-app --template redux
or  

    npm install @reduxjs/toolkit react-redux

In `src/app/state/store.js', create the redux store;

    import { configureStore } from '@reduxjs/toolkit';
    import counterReducer from '../slices/counterSlice';

    export const store = configureStore({
      reducer: {
        counter: counterReducer,
      },
    });

In `src/index.js`, provide the store to all components;

    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import { Provider } from 'react-redux';
    import { store } from './app/store';
    import App from './App';

    const root = createRoot(document.getElementById('root'));

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );

In `src/app/state/slices/counterSlice.js`, create the reducer functions;

    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import { fetchCount } from "./counterAPI";

    const initialState = {
      value: 0,
      status: "idle",
    };

    export const counterSlice = createSlice({
      name: "counter",
      initialState,
      // The `reducers` field lets us define reducers and generate associated actions
      reducers: {
        increment: (state) => {
          // Redux Toolkit allows us to write "mutating" logic in reducers. It
          // doesn't actually mutate the state because it uses the Immer library,
          // which detects changes to a "draft state" and produces a brand new
          // immutable state based off those changes
          state.value += 1;
        },
        decrement: (state) => {
          state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action) => {
          state.value += action.payload;
        },
      },
      // The `extraReducers` field lets the slice handle actions defined elsewhere,
      // including actions generated by createAsyncThunk or in other slices.
      extraReducers: (builder) => {
        builder
          .addCase(incrementAsync.pending, (state) => {
            state.status = "loading";
          })
          .addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.value += action.payload;
          });
      },
    });

    // Action creators are generated for each case reducer function
    export const { increment, decrement, incrementByAmount } = counterSlice.actions;

    // The function below is called a selector and allows us to select a value from
    // the state. Selectors can also be defined inline where they're used instead of
    // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
    export const selectCount = (state) => state.counter.value;

    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    export const incrementAsync = createAsyncThunk("counter/fetchCount", async (amount) => {
      const response = await fetchCount(amount);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    });

    // We can also write thunks by hand, which may contain both sync and async logic.
    // Here's an example of conditionally dispatching actions based on current state.
    export const incrementIfOdd = (amount) => (dispatch, getState) => {
      const currentValue = selectCount(getState());
      if (currentValue % 2 === 1) {
        dispatch(incrementByAmount(amount));
      }
    };

    export default counterSlice.reducer;


Use the state and reducer functions to change state. In `src/app/components/counter.js`;
Read data from the store with useSelector, and dispatch actions using useDispatch

    import React, { useState } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import {
      decrement,
      increment,
      incrementByAmount,
      incrementAsync,
      incrementIfOdd,
      selectCount,
    } from './counterSlice';
    import styles from './Counter.module.css';

    export function Counter() {
      const count = useSelector(selectCount);
      const dispatch = useDispatch();
      const [incrementAmount, setIncrementAmount] = useState('2');

      const incrementValue = Number(incrementAmount) || 0;

      return (
        <div>
          <div className={styles.row}>
            <button
              className={styles.button}
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              -
            </button>
            <span className={styles.value}>{count}</span>
            <button
              className={styles.button}
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              +
            </button>
          </div>
          <div className={styles.row}>
            <input
              className={styles.textbox}
              aria-label="Set increment amount"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <button
              className={styles.button}
              onClick={() => dispatch(incrementByAmount(incrementValue))}
            >
              Add Amount
            </button>
            <button
              className={styles.asyncButton}
              onClick={() => dispatch(incrementAsync(incrementValue))}
            >
              Add Async
            </button>
            <button
              className={styles.button}
              onClick={() => dispatch(incrementIfOdd(incrementValue))}
            >
              Add If Odd
            </button>
          </div>
        </div>
      );
    }
