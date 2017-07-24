import Dexie from 'dexie';

//
// Declare Database
//
var db = new Dexie("pwa_react_blog");
db.version(1).stores({ friends: "++id,name,age" });

db.transaction('rw', db.friends, async() => {

    // Make sure we have something in DB:
    if ((await db.friends.where('name').equals('Josephine').count()) === 0) {
        let id = await db.friends.add({name: "Josephine", age: 21});
        console.log (`Addded friend with id ${id}`);
    }

    // Query:
    let youngFriends = await db.friends.where("age").below(25).toArray();

    // Show result:
    console.log ("My young friends: " + JSON.stringify(youngFriends));

}).catch(e => {
    console.log(e.stack || e);
});

