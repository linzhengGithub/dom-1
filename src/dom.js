window.dom = {
    create(string){
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }, //等于dom.create = function() {};用于创建节点
    after(node,node2){
        node.parentNode.insertBefore(node2,node.nextSibling);
    }, //用于新增弟弟
    before(node,node2){
        node.parentNode.insertBefore(node2,node);
    }, //用于新增哥哥
    append(parent,node){
        parent.appendChild(node)
    }, //用于新增儿子
    wrap(node,parent){
        dom.before(node,parent)
        dom.append(parent,node)
    }, //用于新增爸爸
    remove(node){
        node.parentNode.removeChild(node)
        return node
    }, //用于删除节点
    empty(node){
        const {childNodes} = node   //等于const childNodes = node.childNodes
        const array = []
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    }, //用于删除后代
    attr(node,name,value){  //重载
        if(arguments.length === 3){
            node.setAttribute(name,value)
        }else if(arguments.length ===2){
            return node.getAttribute(name)
        }
    }, //用于读写属性
    text(node,string){  //适配
        if(arguments.length ===2 ){
            if('innerText' in node){
                node.innerHTML = string //IE
            }else{
                node.textContent = string   //firefox  /  Chrome
            }
        }else if(arguments.length === 1){
            if('innerText' in node){
                return node.innerText
            }else{
                return node.textContent
            }
        }
        
    }, //用于读写文本内容
    html(node,string){
        if(arguments.length === 2){
            node.innerHTML = string            
        }else if(arguments.length === 1 ){
            return node.innerHTML
        }
    }, //用于读写HTML内容
    style(node,name,value){
        if(arguments.length === 3){
            //dom.style(div,'color','red')
            node.style[name] = value
        }else if(arguments.length === 2){
            if(typeof name === 'string'){
                //dom.style(div, 'color')
                return node.style[name]
            }else if(name instanceof Object){
                // dom.style(div,{color:'red'})
                const object = name
                for(let key in object){
                    //key: border / color
                    //node.style.border = ...
                    //node/style.color = ...
                    node.style[key] = object[key]
                }
            }
        }
    }, //用于修改style
    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){
            return node.classList.contains(className)
        }
    }, //用于添加class
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    }, //用于添加事件监听
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    }, //用于删除事件监听
    find(selector,scope){
        return (scope || document).querySelectorAll(selector)
    }, //用于获取标签或标签们
    parent(node){
        return node.parentNode
    }, //用于获取父元素
    children(node){
        return node.children
    },  //用于获取子元素
    siblings(node){
        return Array.from(node.parentNode.children).filter(n=>n!==node)
    },  //用于获取兄弟姐妹
    next(node){
        let z = node.nextSibling
        while(z.nodeType === 3){
            z = z.nextSibling
        }
        return z
    },  //用于获取弟弟
    previous(node){
        let z = node.previousSibling
        while(z.nodeType === 3){
            z = z.previousSibling
        }
        return z
    },  //用于获取哥哥
    each(nodeList,fn){
        for(let i = 0;i<nodeList.length;i++){
            fn.call(null ,nodeList[i])
        }
    },  //用于遍历所有节点
    index(node){
        const list = dom.children(node.parentNode)
        let i 
        for(i = 0;i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }, //用于获取排行老几
};

