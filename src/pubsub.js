let subscribers = {};

export const subscribe = (event, subscriber) => {
    if (subscribers.hasOwnProperty(event) === false) {
        subscribers[event] = [];
    }
    let length = subscribers[event].push(subscriber);
    
    return () => {
        let index = length -1;
        console.log(`Unsubscribing at pos ${index}, current length is ${subscribers[event].length}`);
        subscribers[event].splice(index, 1);
        console.log(`Unsubscribed at pos ${index}, current length is ${subscribers[event].length}`);
    }
};


export const publish = (event, message) => {
    if (subscribers.hasOwnProperty(event)) {
        subscribers[event].forEach((sub) => {
            sub(event, message);    
        });
    }    
};

