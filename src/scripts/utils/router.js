function Router() {
    this.routes = {}
    this.currentHash = ''
}
var noop = function () {}

// 路由的注册
Router.prototype.route = function (hash, cb){
    this.currentHash = hash;
    this.routes[this.currentHash] = cb || noop;
}
//路由刷新
Router.prototype.refresh = function () {
    let hash = location.hash || '#homepage'
    this.currentHash = hash
    this.routes[this.currentHash]()
    this.switchTab()
}
//tab switch
Router.prototype.switchTab = function(){
    let hashs = ["#homepage",'#position','#publish','#order','#mine']
    let index = hashs.indexOf(this.currentHash)
    if(this.currentHash!='#order'){
        $('header').hide()
    }else if(this.currentHash=='#order'){
        console.log(1)
        $('header').show()
    }
    $('nav ul li').eq(index).addClass('active').siblings().removeClass('active')
}
// 路由切换监听
Router.prototype.init = function(){
    window.addEventListener('load',this.refresh.bind(this))
    window.addEventListener('hashchange' ,this.refresh.bind(this))
}

export default Router