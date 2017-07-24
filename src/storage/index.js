import Dexie from 'dexie';

const db = new Dexie("pwa_react_blog");
db.version(1).stores({
    blog: "id,date,date_gmt,guid,modified,modified_gmt,slug,status,type,link,title,content,excerpt,author,featured_media,comment_status,ping_status,sticky,template,format,meta,categories,tags,_links"
});

export default db



