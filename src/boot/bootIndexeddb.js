import Dexie from 'dexie';

const db = new Dexie("pwa_react_blog")

db.version(1).stores({
    comment: "id,post,parent,author,author_name,author_url,date,date_gmt,content,link,status,type,author_avatar_urls,meta,_links",
    timestamp: "id,latestDate,oldestDate,oldestDateCategory",
    categories: "id,count,description,link,name,slug,taxonomy,parent,meta,_links",
    picture: "id,post"
});

export default db



