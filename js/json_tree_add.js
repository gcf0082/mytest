function insertNodeIntoTree(node) {
    node.abc = '111';
    if (node.children != null) {
        for (let i = 0; i < node.children.length; i++) {
            insertNodeIntoTree(node.children[i]);
        }
    }

}


var myjson = {
    "id": "123",
    "children":[
        {
            "id":"456"
        },
        {
            "id":"567",
            "children":[
                {
                    "id":"888"
                },
                {
                    "id":"999"
                }
            ]
        }
    ]
}

insertNodeIntoTree(myjson)
console.log(JSON.stringify(myjson))
