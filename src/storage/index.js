import Dexie from 'dexie';

const db = new Dexie("pwa_react_blog");
db.version(1).stores({
    bloglist: "++id,content,title,readmore",
    blog: "id,date,date_gmt,guid,modified,modified_gmt,slug,status,type,link,title,content,excerpt,author,featured_media,comment_status,ping_status,sticky,template,format,meta,categories,tags,_links"
});

db.bloglist.put({id:22131, excerpt: { rendered : "who the fuck is gene winter"}, title: { rendered: "hey" }, readmore:"readmore.org"})

export default db



