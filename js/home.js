/**
showHead 表示是否显示头部
**/
//子系统导航

//Integrated management
let intm = {
        id: '',
        name: '管廊管理',
        sysName: '管廊管理系统',
        path: './pages/pipeGallery/pipeGallery.html',
        showHead: true
    }
    //pipe gallery management
let psm = {
        id: 'PIPE',
        name: '巡检管理',
        sysName: '巡检管理系统',
        path: './pages/inspectionSystem/inspectionSystem.html'
    }
    //Construction management
let conm = {
        id: 'PIPE',
        name: '施工管理',
        sysName: '施工管理系统',
        path: './pages/constructionManagement/constructionManagement.html',
        showHead: true
            // query: '?opt=safe'
    }
    //Inspection management
    // let insm = {
    //         id: 'Work',
    //         name: '巡检管理',
    //         sysName: '巡检管理系统',
    //         path: ''
    //     }
    //underground pipe network
let undpn = {
        id: 'DXPIPE',
        name: '地下管网',
        sysName: '地下管网系统',
        path: './pages/undergroundPipe/undergroundPipe.html',
        showHead: true

    }
    //SCADA
let scada = {
        id: 'GAS',
        name: 'SCADA',
        sysName: 'SCADA',
        path: './pages/scada/scada.html',
        showHead: true
    }
    //Emergency management
let emem = {
    id: 'EMG',
    name: '应急管理',
    sysName: '应急管理系统',
    path: './pages/emergencyManagement/emergencyManagement.html',
    showHead: true
}

//日常管理导航

//User management
let usem = {
        id: 'PMS',
        name: '用户管理',
        sysName: '用户管理系统',
        path: ''
    }
    //message center
let mesc = {
        id: 'MSC',
        name: '消息中心',
        sysName: '消息中心系统',
        path: ''
    }
    //File management
let film = {
        id: 'OSS',
        name: '文件管理',
        sysName: '文件管理系统',
        path: 'http://www.rst.com:3000'
    }
    //Screen display
let sd = {
    id: 'PortalTwo',
    name: '展示大屏',
    sysName: '大屏展示系统',
    path: '',
    target: '_blank'
}
let log = {
    id: 'J_Log',
    name: '日志分析',
    sysName: '日志分析系统',
    path: ''
}
new Vue({
    el: '.app-container',
    data: {
        //当前用户信息
        user: {
            name: '未知用户',
        },
        //当前页面导航信息
        curNav: null,
        //子系统导航
        // 删除insm,
        navs: [intm, psm, conm, undpn, scada, emem],
        //日常管理导航
        dailyNavs: [usem, mesc, film, sd]
    },
    methods: {
        //跳转页面
        jump: function(nav) {
            //未输入参数跳转默认页面
            if (!nav) {
                let current = sessionStorage.getItem("currentIndex")
                if (current) {
                    let cur = JSON.parse(current)
                    this.curNav = this.navs.concat(this.dailyNavs).find(n => n.id == cur.id && n.name == cur.name) //如果会话中存在当前页面，进入到指定页面
                } else
                    this.curNav = this.navs[0] //不存在进入默认页面
            } else if (this.curNav != nav) {
                this.curNav = nav
                sessionStorage.setItem("currentIndex", JSON.stringify(nav))
            } else {

            }
        },
        //加载当前用户信息并初始化导航
        loadUserInfo: function() {
            let self = this
            $.ajax({
                type: "post",
                async: false,
                url: "/Home/HomePermission",
                error: function(xhr) {

                },
                success: function(data) {
                    var obj = $.parseJSON(data);
                    self.user.name = obj.UserName //初始化用户名称
                    self.initNavs(self.navs.concat(self.dailyNavs), obj.DomainInfoDTOList) //初始化导航信息
                }
            });
        },
        //初始化导航信息
        initNavs: function(navs, domains) {
            navs.forEach(nav => {
                if (!nav.id) return;
                let domain = domains.find(d => d.IsAvailable && d.Model && d.Model.Id.toLowerCase() === nav.id.toLowerCase())
                    //找到满足条件的对象
                if (domain) {
                    nav.path = domain.Model.BackUrl //设置其路由
                }
            })
        },
        //退出系统
        exitSystem: function() {
            this.$confirm('确认退出系统吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "Post", //提交方式
                    url: "/Home/Logout", //路径
                    success: function(result) { //返回数据根据结果进行相应的处理
                        window.location = window.location.origin;
                    }
                });
            }).catch(() => {

            });
        },
        //全屏显示
        fullScreen: function() {
            //var el = document.documentElement;
            //var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
            //if (typeof rfs != "undefined" && rfs) {
            //    rfs.call(el);
            //};
            //return;
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
                el.mozRequestFullScreen || el.msRequestFullScreen;
            if (rfs) { //typeof rfs != "undefined" && rfs
                rfs.call(el);
            } else if (typeof window.ActiveXObject != "undefined") {
                //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript != null) {
                    wscript.SendKeys("{F11}");
                }
            }
        },
        //退出全屏
        exitFullScreen: function() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            if (typeof cfs != "undefined" && cfs) {
                cfs.call(el);
            }
        }
    },
    mounted: function() {
        //跳转到默认页面
        this.jump()
        this.loadUserInfo() //加载用户信息
    }
})