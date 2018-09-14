export function projectData() {
    const data = {
        "type": "projects",
        "api_data": {
            "date": "",
            "slug": "",
            "title": "",
            "content": "",
            "featured_media": "",
            "meta_data": ""
        }
    }

    return data
}

export function postsData() {
    const data = {
        "type": "posts",
        "api_data": {
            "date": "",
            "slug": "",
            "title": "",
            "content": "",
            "excerpt": "",
            "featured_media": "",
        }
    }
    return data
}

export function getCurrentItemType(type) {
    console.log(type)
    let ItemTypeData
    switch(type) {
        case projectData().type:
            ItemTypeData = projectData()
            break;
        case postsData().type:
            ItemTypeData = postsData()
            break;
        default:
            break;
    }

    return ItemTypeData
}