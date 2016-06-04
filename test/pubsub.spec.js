import { subscribe, publish } from '../src/pubsub';
import chai from 'chai';
const expect = chai.expect;
import sinon from 'sinon';


describe('pubsub tests', () => {

    describe('single subscriber', () => {
        describe('can subscribe to an event', () => {

            it('given a subscriber it is called when an event occurs', (done) => {
                let subscriberSpy = sinon.spy();
                subscribe('test1', subscriberSpy);

                publish('test1', 'Message 1');
                expect(subscriberSpy.called).to.be.true;
                expect(subscriberSpy.calledWith('test1', 'Message 1')).to.be.true;

                done();
            });


        });
    });

    describe('multiple subscribers', () => {
        const testEvent = 'multisubscribers';
        let subscriberSpy1;
        let subscriberSpy2;
        
        beforeEach(() => {
            subscriberSpy1 = sinon.spy();
            subscriberSpy2 = sinon.spy();
            
        });
        
        afterEach(() => {
            subscriberSpy1.reset();
            subscriberSpy2.reset();
        });
        
        it('given multiple subscribers they are called when an event occurs', (done) => {
            
            subscribe(testEvent, subscriberSpy1);
            subscribe(testEvent, subscriberSpy2);
            
            const testMessage = 'Message 2';
            

            publish(testEvent, testMessage);

            expect(subscriberSpy1.calledOnce).to.be.true;
            expect(subscriberSpy2.calledOnce).to.be.true;
            expect(subscriberSpy1.calledWith(testEvent, testMessage)).to.be.true;

            done();
        });

        it('given multiple subscribers when one unsubscribes it no longer receives publications', () => {
            const testUnsubscribesEvent = 'testUnsubscribes';
                        
            subscribe(testUnsubscribesEvent, subscriberSpy1);
            subscribe(testUnsubscribesEvent, subscriberSpy2);
            
            // Subscribe returns a function allowing the subscriber to unsubscribe (means
            // it doesn't need to, say, store ids for each subscriber)
            let subscriberSpy3 = sinon.spy();
            let unsubscribe3 = subscribe(testUnsubscribesEvent, subscriberSpy3);
                        
            publish(testUnsubscribesEvent, '');
            
            unsubscribe3();
            
            subscriberSpy1.reset();
            subscriberSpy2.reset();
            subscriberSpy3.reset();
            publish(testUnsubscribesEvent, '');
            
            expect(subscriberSpy1.called).to.be.true;
            expect(subscriberSpy2.called).to.be.true;
            expect(subscriberSpy3.called).to.be.false;
        });
    });
});


