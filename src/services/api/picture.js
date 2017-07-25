export default class PictureApi {

    defaultPicture =  {
        "id": 7,
        "date": "2017-04-25T09:32:41",
        "date_gmt": "2017-04-25T09:32:41",
        "guid": {
            "rendered": "http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11.jpg"
        },
        "modified": "2017-04-25T09:32:41",
        "modified_gmt": "2017-04-25T09:32:41",
        "slug": "grey-background-for-site11",
        "status": "inherit",
        "type": "attachment",
        "link": "http://localhost/wp_rest_api/2017/04/24/hello-world/grey-background-for-site11/",
        "title": {
            "rendered": "grey-background-for-site11"
        },
        "author": 1,
        "comment_status": "open",
        "ping_status": "closed",
        "template": "",
        "meta": [],
        "description": {
            "rendered": "<p class=\"attachment\"><a href='http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11.jpg'><img width=\"300\" height=\"212\" src=\"http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11-300x212.jpg\" class=\"attachment-medium size-medium\" alt=\"\" srcset=\"http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11-300x212.jpg 300w, http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11-768x543.jpg 768w, http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11-1024x724.jpg 1024w\" sizes=\"100vw\" /></a></p>\n"
        },
        "caption": {
            "rendered": ""
        },
        "alt_text": "",
        "media_type": "image",
        "mime_type": "image/jpeg",
        "media_details": {
            "width": 1648,
            "height": 1165,
            "file": "2017/04/grey-background-for-site11.jpg",
            "sizes": {
                "thumbnail": {
                    "file": "grey-background-for-site11-150x150.jpg",
                    "width": 150,
                    "height": 150,
                    "mime_type": "image/jpeg",
                    "source_url": "http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11-150x150.jpg"
                },
                "medium": {
                    "file": "grey-background-for-site11-300x212.jpg",
                    "width": 300,
                    "height": 212,
                    "mime_type": "image/jpeg",
                    "source_url": "http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11-300x212.jpg"
                },
                "medium_large": {
                    "file": "grey-background-for-site11-768x543.jpg",
                    "width": 768,
                    "height": 543,
                    "mime_type": "image/jpeg",
                    "source_url": "http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11-768x543.jpg"
                },
                "large": {
                    "file": "grey-background-for-site11-1024x724.jpg",
                    "width": 1024,
                    "height": 724,
                    "mime_type": "image/jpeg",
                    "source_url": "http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11-1024x724.jpg"
                },
                "twentyseventeen-thumbnail-avatar": {
                    "file": "grey-background-for-site11-100x100.jpg",
                    "width": 100,
                    "height": 100,
                    "mime_type": "image/jpeg",
                    "source_url": "http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11-100x100.jpg"
                },
                "full": {
                    "file": "grey-background-for-site11.jpg",
                    "width": 1648,
                    "height": 1165,
                    "mime_type": "image/jpeg",
                    "source_url": "http://localhost/wp_rest_api/wp-content/uploads/2017/04/grey-background-for-site11.jpg"
                }
            },
        },
    }


    static getPicture(blogid) {
        return fetch(process.env.REACT_APP_API_URI + 'media?parent=' + blogid,{method:'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                if(responseJson.length != 0)
                    return responseJson[0]
                else
                    return this.defaultPicture
            }).catch(error => {
                return error
            })
    }
}