
var winWidth;
if (window.innerWidth)
winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
winWidth = document.body.clientWidth;

var winHeight;
if (window.innerHeight)
winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
winHeight = document.body.clientHeight;

var imgRoot = '../images/'
function loadAssets() {
    var assets = ['pao.png','redpao.png','play-agin.png','100.jpg','80-100.jpg','60-80.jpg','_60.jpg','bg2.jpg','bg1.jpg','share-btn.png','share1.png','share2.png']
    for (let i = 1; i <= 10; i++) {
        var img = i*10+".png"
        assets.push(img)
    }
    for (let j = 1; j <= 6; j++) {
        var img = j +".png"
        assets.push(img)
    }
    var preload = new createjs.LoadQueue()
    preload.on('progress', handleProgress)
    preload.on('complete', handleComplete)
    preload.setMaxConnections(3)
  
    var $loadPage = $('.load-wrap')
    var $loadnum = $('.load-wrap .num')
  
    function handleProgress(e) {
      var num = parseInt(preload.progress * 100)
      $loadnum.html('' + num + '%')
    }
  
    function handleComplete(e) {
      $loadPage.addClass('hide').remove()
    }
    preload.loadManifest(assets, true, imgRoot)
  }
$(function(){
    loadAssets();
    //屏幕缩放比例
    var ratio = 1;
    var isPc=true;
    var score = 0,time = 15;
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsUc7 = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";


    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        ratio = 1;
        isPc=true; 
        if(winWidth/winHeight>=1){
            $('body').addClass('isPc');
        }else{
            $('body').addClass('isPc2');
        }
    } else {
        var clientWidth = document.body.clientWidth;
        $("#app").css({"font":""})
        ratio = winWidth / 1080;
        isPc=false;
    }
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        }, 
        onSlideChangeEnd: function(swiper){ 
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        },
        onlyExternal:true
    })  
    $(".btns li:nth-child(1)").click(function(){
        mySwiper.slideNext();
    })
    $(".btns li:nth-child(2)").click(function(){
        $(".rules").toggle();
    })
    $(".rules").click(function(){
        event.stopPropagation();
        $(this).toggle();
    })

    $(".btns li:nth-child(3)").click(function(){
        $(".mth").toggle();
    })
    $(".mth").click(function(){
        event.stopPropagation();
        $(this).toggle();
    })
    

    //泡泡
    function rand(m,n){return m+parseInt((n-m)*Math.random());}
	var oC=document.getElementById('app');
	var mxwidth=1080*ratio;
	var mxheight=1670*ratio;


	var oB=new CollBox('app');
	oB.ballRun();
	for(var i=0;i<says.length;i++){
		var b=rand(105*ratio,110*ratio);
		var x=rand(b,mxwidth-b);
		var y=rand(b,mxheight-b);
		var ball=new Ball({
			'b':b,
			'x':x,
			'y':y,
			'sx':rand(1,1.2),
			'sy':rand(1,1.2),
			// 'c':'url(images/pao.png)',
            'opa':1,
			'callBack':function(n){
				// this.setB(rand(30,50));
				this.setM();
				// this.setOpa(rand(60,100)/100);
				// if(n%3==0){this.setC('url(img/paopao'+rand(1,6)+'.png)')};//撞三次改变下图片
				// if(n%50==0){
				// 	this.setB(rand(40+parseInt((n>1000?1000:n)/50),60+parseInt((n>1000?1000:n)/50)));
				// }//撞50次改大小
				// this.setHTML(says[i].qus);
			}
		});
		oB.addBall(ball);
    }
    
    $("#app div").each(function(index,obj){
        $(obj).attr({"disable":'true'})
        says.map(function(o,i){
            if(index==i){
                $($("#app div")[index]).html('<p>'+o.qus+'</p>');
                $($("#app div")[index]).attr("judge",o.attr);
            }
        })
    });
    
    $("#app div").click(function(){
        if($(this).attr("disable")=='false'){
            var that = this;
            setTimeout(function(){
                $(that).attr({"disable":'true'})
            },1000)  
            return;
        }else{
            $(this).attr({"disable":'false'})
            if($(this).attr("judge") == 'false'){
                time -=1;
                $(".time").html(time+' 次');
                $(this).children('p').addClass("red");
                var that = $(this)[0]
                setTimeout(function(){
                    $(that).children('p').removeClass("red");
                },1000)
            }else if($(this).attr("judge") == 'true'){
                time -=1;
                $(".time").html(time+' 次');
                score += 10;
                $(".score").html(score+' 分')
                boom(this,$(this).width());
            }
            if(time == 0 || score == 100){
                mySwiper.slideTo(2, 300, false);
                if(score<60){
                    $(".swiper-container .swiper-slide:nth-child(3)").addClass("s-60");
                }else if(score>=60&&score<80){
                    $(".swiper-container .swiper-slide:nth-child(3)").addClass("s60-80");
                }else if(score>=80&&score<100){
                    $(".swiper-container .swiper-slide:nth-child(3)").addClass("s80-100");
                }else if(score == 100){
                    $(".swiper-container .swiper-slide:nth-child(3)").addClass("s100");
                }
                $(".allscore").addClass("png"+score);
            } 
            var that = this;
            setTimeout(function(){
                $(that).attr({"disable":'true'})
            },1000)  
        }
        
    })

    // var time = 0;
    $(".play-again").click(function(){
        time = 0;
        location.reload();
    })
    // setInterval(function(){

    // },1000)
    // setTimeout(function(){
    //     time +=1000;
    //     console.log(time)
    //     if(time == 5000){
    //         location.reload();
    //     }
    // },1000)
    function settimeFn() {
        var showTime = 60 * 5;
        var time = showTime;
        $(document).on('click', function() {
            time = showTime;
        });
        var interCount = setInterval(function() {
            time--;
            if(time == 0) {
                clearInterval(interCount);
                location.reload();
            }
        }, 1000);
    }
    settimeFn();

    $(".share").click(function(){
        $(".shares").show();
        if(isPc==true){
            $(".share-main2").show();
        }else{
            $(".share-main").show();
        }
    })
    $(".shares").click(function(){
        $(this).hide();
        $(".share-main2").hide();
        $(".share-main").hide();
    })
})