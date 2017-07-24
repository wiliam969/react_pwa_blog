import Dexie from 'dexie';

const db = new Dexie("pwa_react_blog");
db.version(1).stores({
    bloglist: "++id,content,title,readmore"
});

db.bloglist.put({id:22131, excerpt: { rendered : "who the fuck is gene winter"}, title: { rendered: "hey" }, readmore:"readmore.org"})

export default db



