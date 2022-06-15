function insertNodeIntoTree(node, newNode) {
    newNode.title = node.fullMethod;
    
    if (node.calleeMethods != null) {
        newNode.children = new Array(node.calleeMethods.length);
        for (let i = 0; i < node.calleeMethods.length; i++) {
            newNode.children[i] = {}
            insertNodeIntoTree(node.calleeMethods[i].callee, newNode.children[i]);
        }
    }
}


var myjson = `{
    "fullMethod": "org.apache.logging.log4j.core.net.JndiManager:getJndiManager(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.util.Properties)",
    "calleeMethods": [
        {
            "callee": {
                "fullMethod": "org.apache.logging.log4j.core.net.JndiManager:createProperties(java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.lang.String,java.util.Properties)",
                "calleeMethods": [
                    {
                        "callee": {
                            "fullMethod": "java.util.Properties:<init>()"
                        },
                        "lineNum": 131
                    },
                    {
                        "callee": {
                            "fullMethod": "java.util.Properties:setProperty(java.lang.String,java.lang.String)"
                        },
                        "lineNum": 132
                    },
                    {
                        "callee": {
                            "fullMethod": "java.util.Properties:setProperty(java.lang.String,java.lang.String)"
                        },
                        "lineNum": 134
                    },
                    {
                        "callee": {
                            "fullMethod": "org.apache.logging.log4j.Logger:warn(java.lang.String,java.lang.Object)"
                        },
                        "lineNum": 136
                    },
                    {
                        "callee": {
                            "fullMethod": "java.util.Properties:setProperty(java.lang.String,java.lang.String)"
                        },
                        "lineNum": 140
                    },
                    {
                        "callee": {
                            "fullMethod": "java.util.Properties:setProperty(java.lang.String,java.lang.String)"
                        },
                        "lineNum": 143
                    },
                    {
                        "callee": {
                            "fullMethod": "java.util.Properties:setProperty(java.lang.String,java.lang.String)"
                        },
                        "lineNum": 145
                    },
                    {
                        "callee": {
                            "fullMethod": "org.apache.logging.log4j.Logger:warn(java.lang.String,java.lang.Object)"
                        },
                        "lineNum": 147
                    },
                    {
                        "callee": {
                            "fullMethod": "java.util.Properties:putAll(java.util.Map)"
                        },
                        "lineNum": 152
                    }
                ]
            },
            "lineNum": 85
        },
        {
            "callee": {
                "fullMethod": "org.apache.logging.log4j.core.net.JndiManager:createManagerName()",
                "calleeMethods": [
                    {
                        "callee": {
                            "fullMethod": "java.lang.StringBuilder:<init>()"
                        },
                        "lineNum": 103
                    },
                    {
                        "callee": {
                            "fullMethod": "java.lang.Class:getName()"
                        },
                        "lineNum": 103
                    },
                    {
                        "callee": {
                            "fullMethod": "java.lang.StringBuilder:append(java.lang.String)"
                        },
                        "lineNum": 103
                    },
                    {
                        "callee": {
                            "fullMethod": "java.lang.StringBuilder:append(char)"
                        },
                        "lineNum": 103
                    },
                    {
                        "callee": {
                            "fullMethod": "java.lang.Object:hashCode()"
                        },
                        "lineNum": 103
                    },
                    {
                        "callee": {
                            "fullMethod": "java.lang.StringBuilder:append(int)"
                        },
                        "lineNum": 103
                    },
                    {
                        "callee": {
                            "fullMethod": "java.lang.StringBuilder:toString()"
                        },
                        "lineNum": 103
                    }
                ]
            },
            "lineNum": 87
        },
        {
            "callee": {
                "fullMethod": "org.apache.logging.log4j.core.net.JndiManager:getManager(java.lang.String,org.apache.logging.log4j.core.appender.ManagerFactory,java.lang.Object)"
            },
            "lineNum": 87
        }
    ]
}`

newNode={}
insertNodeIntoTree(JSON.parse(myjson), newNode)
console.log(JSON.stringify(newNode, null , ' '))
