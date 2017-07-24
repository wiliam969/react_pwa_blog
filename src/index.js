import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Dexie from 'dexie';

var db = new Dexie("pwa_react_blog");
db.version(1).stores({
    bloglist: "id,content,title,readmore"
});

db.bloglist.put({id:22131, content:"who the fuck is gene winter", title:"hey", readmore:"readmore.org"})
console.log(db)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
