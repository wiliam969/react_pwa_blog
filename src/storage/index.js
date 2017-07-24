import Dexie from 'dexie';

const db = new Dexie("pwa_react_blog");
db.version(1).stores({
    bloglist: "++id,content,title,readmore"
});

db.bloglist.put({id:22131, content:"who the fuck is gene winter", title:"hey", readmore:"readmore.org"})

export default db


