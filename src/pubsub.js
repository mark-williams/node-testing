let subscribers = {};

export const subscribe = (event, subscriber) => {
    if (subscribers.hasOwnProperty(event) === false) {
        subscribers[event] = [];
    }
    subscribers[event].push(subscriber);
    
    return () => {
        subscribers[event] = subscribers[event].filter(s => s !== subscriber);        
    }
};


export const publish = (event, message) => {
    if (subscribers.hasOwnProperty(event)) {
        subscribers[event].forEach((sub) => {
            sub(event, message);    
        });
    }    
};

