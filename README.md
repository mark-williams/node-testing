# node-testing
Investigate unit testing in a node environment with mocha, chai and sinon.

Initially some tests for a simple PubSub module. Uses sinon to create stubs that to test that these are called when subscribing to events.

####PubSub - refactored subscribe method
To avoid the need to track subscribers for the purpose of unsubscribing, the subscribe function returns a function that cancel the just executed subscription.

This was using Array.splice:

~~~~
export const subscribe = (event, subscriber) => {
  if (subscribers.hasOwnProperty(event) === false) {		      
    if (subscribers.hasOwnProperty(event) === false) {
      subscribers[event] = [];		          
    }		      
  }
  
  let length = subscribers[event].push(subscriber);
  subscribers[event].push(subscriber);
        		      
  return () => {		      
    return () => {
      let index = length -1;
      subscribers[event] = subscribers[event].filter(s => s !== subscriber);        
      subscribers[event].splice(index, 1);		
    }
  }
};
~~~~

however this has now been refactored to just use Array.filter:
~~~~
export const subscribe = (event, subscriber) => {
    if (subscribers.hasOwnProperty(event) === false) {
        subscribers[event] = [];
    }
    subscribers[event].push(subscriber);
    
    return () => {
        subscribers[event] = subscribers[event].filter(s => s !== subscriber);        
    }
};
~~~~
