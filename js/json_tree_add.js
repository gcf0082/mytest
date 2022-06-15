function insertNodeIntoTree(node, newNode) {
    console.log('xx 1');
    newNode.newid = node.id;
    
    if (node.children != null) {
        newNode.children = new Array(node.children.length);
        console.log(newNode);
        for (let i = 0; i < node.children.length; i++) {
            newNode.children[i] = {}
            insertNodeIntoTree(node.children[i], newNode.children[i]);
        }
    }

}


var myjson = `{
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
}`

newNode={}
insertNodeIntoTree(JSON.parse(myjson), newNode)
console.log(JSON.stringify(newNode, null , ' '))
