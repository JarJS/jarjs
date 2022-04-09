/**
 * MIT License
 */

var context = {
    modules: [],
    routes: [],
    Get: get,
    CreateModule: createModule,
    CreateRoute: ceateRoute
}

function createModule(moduleName,callback){
    context.modules.push({moduleName,callback});
}

function getModule(moduleName){
    var module_;
    context.modules.forEach(module=>{
        if(module.moduleName == moduleName) module_ = module;
    });
    console.log(module_);
    if(!module_) throw new Error("Module not found");
    return module_;
}

function ceateRoute(routeName,path){
    context.routes.push({routeName,path});
}

function getRoute(routeName){
    var route_;
    context.routes.forEach(route=>{
        if(route.routeName == routeName) route_ = route;
    });
    if(!route_) throw new Error("Route not found");
    return route_;
}

// Gets

function get(moduleName){
    const isPath = (moduleName.indexOf("/") == 0 || moduleName.indexOf(".") == 0);
    console.log(isPath);
    var gettedModule;
    if(isPath){
        const node = document.createElement("script");
        node.src = moduleName;
        node.type = "text/javascript";
        document.head.appendChild(node);
        node.addEventListener("error",()=>{
            node.remove();
        })
        node.addEventListener("loadeddata",()=>{
            gettedModule = getModule(moduleName);
        });
    }else{
        const route = getRoute(moduleName);
        const node = document.createElement("script");
        node.src = route.path;
        node.type = "text/javascript";
        document.head.appendChild(node);
        node.addEventListener("error",()=>{
            node.remove();
        })
        node.addEventListener("loadeddata",()=>{
            gettedModule = getModule(moduleName);
        });
    }
    console.log(gettedModule);
    return gettedModule.callback;
}

globalThis = {
    /**
     * Gets a especific module
     * 
     * @param {string} moduleName
     * @returns {any}
     */
    Get: context.Get,

    /**
     * Creates an global module
     * 
     * @param {string} moduleName
     * @param {any} callback
     * @returns {void}
     */
    Module: context.CreateModule,

    /**
     * Creates an route to sort modules
     * 
     * @param {string} routeName
     * @param {string} path
     * @returns {void}
     */
    Route: context.CreateRoute
}