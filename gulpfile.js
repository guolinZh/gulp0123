const gulp=require("gulp")
const connect=require("gulp-connect");
const proxy=require("http-proxy-middleware");
var uglify = require("gulp-uglify");
var pump = require("pump");

const babel=require("gulp-babel");

const cleanCSS=require("gulp-clean-css");

//路径列表
const srclist={
	"scripts" :{
		"src" : "./src/srcipts/*.js",
		"dest" :"./dist/scripts"
	},
	"css":{
		"src":"./src/styles/*.css",
		"dest":"./dist/styles/"
	}
}

//css压缩

gulp.task("minify-css",()=>{
	return gulp.src(srclist.css.src)
	.pipe(cleanCSS({compatibility:"ie8"}))
	.pipe(gulp.dest("dist"));
});

//代码压缩
gulp.task("compress", function (cb) {
  pump([
        gulp.src(srclist.scripts.src),
		//压缩之前进行es6的编译
		babel({
			presets:["@babel/env"]
		}),
        uglify(),
        gulp.dest("srclist.scripts.dest")
    ],
    cb
  );
});
	
	//打包 
	gulp.task("bulid",["compress"])



//方便维护的代理表格
const proxyList=[
	proxy("/proxydouban",{
		//由服务器发起请求的目标
		target:"https://api.douban.com",
		//是否重定向源，默认一定为true
		changeOrigin:true,
		//表示路径中的某些标记要清楚掉
		pathRewrite:{
			"/proxydouban" :""
		}
		
	})
]

	gulp.task("connect",()=>{
		connect.server({
			port:8080,
			root:"./dist",
			livereload:true,
			//start
			middleware:function(connect,opt){
				return proxyList;
			}
			//-----------end
		});
	})
	
	gulp.task("html",()=>{
	return gulp.src("./src/html/*.html")
		.pipe(gulp.dest("./dist"))     //转存文件
	    .pipe(connect.reload())     //连接服务器并刷新页面
	})
	
	//开发时使用的
	gulp.task("js",()=>{
		return gulp.src(srclist.scripts.src)
		.pipe(gulp.dest(srclist.scripts.dest))
		.pipe(connect.reload())
	})
	
	gulp.task("watch",()=>{
		gulp.watch("./src/html/*.html",["html"]);    //监听，然后只要页面发生改变，gulp.watch就会监测到，并刷新页面
		gulp.watch("./src/scripts/*.js",["js"]);
	})
	
	//环境开启（调试环境）只转存不编译
	gulp.task("default",["watch","connect"]);