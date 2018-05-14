import Dexie from 'dexie';

const db = new Dexie("pwa_react_blog")

db.version(1).stores({
    timestamp: "id,latestDate,oldestDate,oldestDateCategory",
    categories: "id,count,description,link,name,slug,taxonomy,parent,meta,_links",
    picture: "id,post"
});

export default db



