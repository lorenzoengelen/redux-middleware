export default function({ dispatch }) {
  return next => action => {

  	// if action does not have payload
  	// or, the payload does not have a .then property
  	// send it on
    if (!action.payload || !action.payload.then) {
    	return next(action);
    }

    // make sure the action's promise resolves
    action.payload
    	.then(response => {
    		// create a new action with the old type, but
    		// replace the promise with response data
    		const newAction = {...action, payload: response};

    		dispatch(newAction);
    	});
  };
};