// Helper function to enables passing an object with
// the action.type as the key and the reducer function as the value
export const createReducer = (initialState = {}, actionHandlerKeyFuncs = {}) => {
  return (state = initialState, action) => {
    const actionHandler = actionHandlerKeyFuncs[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  }
};

// Creates a basic action
const createAction = (type, actionProps) => {
  return {
    type,
    ...actionProps
  };
}

export const createAsyncActionCreator = (actionType, asyncRequestFn, requestParams) => {
  return (dispatch) => {
    dispatch(createAction(`${actionType}_START`, {request: requestParams}));
    // NOTE: asyncRequestFn must accept single object parameter
    // in order to resolve param values
    return asyncRequestFn(requestParams)
      .then(response => {
        response.json()
          .then(json => dispatch(createAction(`${actionType}_SUCCESS`, { response: json })))
          .catch(error => dispatch(createAction(`${actionType}_ERROR`, { error })));
      });
      
  };
}

// We're setting these based on the state of the request
const initialAsyncState = { isLoading: false, response: null, request: null };

// Generic way of handling state changes for an async request
export const createAsyncReducer = (actionType, initialState = initialAsyncState, actionHandlerKeyFuncs = {}) => {
  return createReducer(
    initialAsyncState,
    {
      [`${actionType}_START`]: (state, action) => ({
          ...state,
          isLoading: true,
          request: action.request
      }),
      [`${actionType}_SUCCESS`]: (state, action) => ({
        ...state,
        isLoading: false,
        response: action.response
      }),
      [`${actionType}_ERROR`]: (state, action) => ({
          ...state,
          isLoading: false,
          error: action.error
      })
    }
  );
}