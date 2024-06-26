let chai = require('chai');
let chaiHttp = require('chai-http');
const {equal} = require("assert");
let chaiAsPromised = require("chai-as-promised");

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const dotenv = require("dotenv");
dotenv.config();

let connString = process.env.DB_CONN_STRING;

describe('Tests', () => {
    describe('Security tests',() => {
        it('Should escape quotations', () => {
            equal(escapeTest('Test! "'),'Test! &quot;',"Not escaping quotations");
            console.log('[TEST][1/18] Done')
        });
        it('Should escape less than symbol', () => {
            equal(escapeTest('Test! <'),'Test! &lt;',"Not escaping less than symbol");
            console.log('[TEST][2/18] Done')
        });
        it('Should escape greater than symbol', () => {
            equal(escapeTest('Test! >'),'Test! &gt;',"Not escaping greater than symbol");
            console.log('[TEST][3/18] Done')
        });
        it('Should escape apostrophe symbol', () => {
            equal(escapeTest("Test! '"),'Test! &#x27;',"Not escaping apostrophe symbol");
            console.log('[TEST][4/18] Done')
        });
        it('Should escape slash symbol', () => {
            equal(escapeTest("Test! /"),'Test! &#x2F;',"Not escaping slash symbol");
            console.log('[TEST][5/18] Done')
        });
    });
    describe('Database tests',() => {
        describe('Room', () => {
            let testRoomNumber, testRoomId;
            it('Add room', async () => {
                console.log('[TEST][6/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/room_create')(await database, 'Test', 'T1', '1', '1', '1', '1', '1').then(r => {
                    let res = r !== null;
                    log('6',r);
                    equal(res, true, 'Could not add room.');
                });
            });
            it('Retrieve rooms', async () => {
                console.log('[TEST][7/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/rooms_retrieve')(await database).then(r => {
                    let res = r !== null;
                    log('7',r);
                    equal(res, true, 'No rooms in database.');
                });
            });
            it('Retrieve test room', async () => {
                console.log('[TEST][8/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/room_retrieve')(await database, 'T1').then(r => {
                    testRoomNumber = r[0].room_number;
                    testRoomId = r[0]._id+'';
                    let res = r !== null;
                    log('8',r);
                    equal(res, true, 'Room not in database.');
                });
            });
            it('Update room', async () => {
                console.log('[TEST][9/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/room_update')(await database, testRoomId, 'Test2', 'T1', '2', '2', '2', '2', '2').then(r => {
                    let res = r !== null;
                    log('9',r);
                    equal(res, true, 'Could not add room.');
                });
            });
            it('Delete test room', async () => {
                console.log('[TEST][10/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/room_delete')(await database, testRoomNumber).then(r => {
                    let res = r !== null;
                    log('10',r);
                    equal(res, true, 'Could not delete room.');
                });
            });
        });
        describe('Booking', () => {
            let testBookingNumber;
            it('Add booking', async () => {
                console.log('[TEST][11/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/booking_create')(await database, 'TEST', 'TEST', '0000-00-00', '0000-00-00').then(r => {
                    let res = r !== null;
                    log('11',r);
                    equal(res, true, 'Could not add booking.');
                });
            });
            it('Retrieve booking', async () => {
                console.log('[TEST][12/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/booking_retrieve')(await database, 'TEST', 'TEST').then(r => {
                    testBookingNumber = r[0]._id+'';
                    let res = r !== null;
                    log('12',r);
                    equal(res, true, 'No booking in database.');
                });
            });
            it('Update test booking', async () => {
                console.log('[TEST][13/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/booking_update')(await database, testBookingNumber, '1000-00-00', '1000-00-00').then(r => {
                    let res = r !== null;
                    log('13',r);
                    equal(res, true, 'Could not delete room.');
                });
            });
            it('Delete test booking', async () => {
                console.log('[TEST][14/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/booking_delete')(await database, testBookingNumber).then(r => {
                    let res = r !== null;
                    log('14',r);
                    equal(res, true, 'Could not delete room.');
                });
            });
        });
        describe('User', () => {
            let testUserId;
            it('Add user', async () => {
                console.log('[TEST][15/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/user_create')(await database, 'test@test.com', 'test', 'John Doe', 'TOKEN').then(r => {
                    let res = r !== null;
                    log('15',r);
                    equal(res, true, 'Could not add booking.');
                });
            });
            it('Retrieve user', async () => {
                console.log('[TEST][16/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/user_retrieve')(await database, 'test@test.com').then(r => {
                    let res = r !== null;
                    testUserId = r._id+'';
                    log('16',r);
                    equal(res, true, 'Could not add booking.');
                });
            });
            it('Update user', async () => {
                console.log('[TEST][17/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/user_update')(await database, testUserId, 'test@test.edu', 'AnotherTest', 'Jane Doe', 'TOKEN2!').then(r => {
                    let res = r !== null;
                    log('17',r);
                    equal(res, true, 'Could not add booking.');
                });
            });
            it('Delete user', async () => {
                console.log('[TEST][18/18] Running...')
                let database = await require('./startup/testDatabase')(connString);
                await require('./functions/database/user_delete')(await database, testUserId, 'TOKEN2!').then(r => {
                    let res = r !== null;
                    log('18',r);
                    equal(res, true, 'Could not add booking.');
                });
            });
        });
    });
});

function escapeTest(bad) {
    return require('./functions/escape.js')(bad);
}

function log(num, r) {
    console.log('[TEST]['+num+'/18] Result: '+r);
    console.log('[TEST]['+num+'/18] Done');
}