
$(function(){
	//页面加载完立即执行
	xipai();

})
var cards = [
    "fa-diamond","fa-diamond",
    "fa-paper-plane-o","fa-paper-plane-o",
    "fa-anchor","fa-anchor",
    "fa-bolt","fa-bolt",
    "fa-cube","fa-cube",
    "fa-leaf","fa-leaf",
    "fa-bicycle","fa-bicycle",
    "fa-bomb","fa-bomb"
];
var cardNum=cards.length;	//记录剩多少张
var oldid=-1;	//标记
var n= 0, timer=null;
var num=0;
var kong=[];
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function fanpai(id){
	$("#card"+id).removeAttr("onclick");	//点击第一个时，方块的点击事件移除掉
	num+=1;
	if(num>30&&num<60){
		//$("#diSanGe").css('display', 'none');
		$("#diSanGe").removeClass();           
	}else {										//目标是通过步数来移除class属性
		//$("#diErGe").css('display', 'none');
		$("#diErGe").removeClass();
	};
	clearInterval(timer);
    timer=setInterval(function () {//定时器
      n++;
      var m=parseInt(n/60);
      var s=parseInt(n%60);
      $("#oTxt").val(toDub(m)+":"+toDub(s));
    },1000/60);
      $("#bushu").val(num);
	  $("#card"+id).addClass("show open");
	  //cards.remove($("#card"+id),$("#card"+oldid));
	  /*kong.push($("#card"+id),$("#card"+oldid));*/
	  if(oldid!=-1){
		if(cards[id]==cards[oldid]){
			$("#card"+id).removeAttr("onclick");	//匹配时，第二个方块的点击事件移除掉
			$("#card"+id).addClass("match");//添加类
			$("#card"+oldid).addClass("match");
			cardNum-=2;
			oldid=-1;
			/*kong.push($("#card"+id),$("#card"+oldid));*/
			if(cardNum==0){
				clearInterval(timer);
				
				$('#div1').css("display","block");//css里面加了none属性，当=0时添加block属性让界面显示出来
				$('#labTime').text($("#oTxt").val());//让显示隐藏的界面显示步数和时间
				$('#move').text($("#bushu").val());
				
				$("#star2").addClass($("#diErGe").attr("class"));//给显示页面添加星星
				$("#star3").addClass($("#diSanGe").attr("class"));
			}
			//alert("匹配");
		}
		else{
			setTimeout(function(){
				$("#card"+id).removeClass("show open");
				$("#card"+oldid).removeClass("show open");
				$("#card"+id).attr("onclick","fanpai("+id+")");//不匹配时，添加点击事件
				$("#card"+oldid).attr("onclick","fanpai("+oldid+")");//不匹配时，添加点击事件
				//alert(id);
				//alert(oldid);
				oldid=-1;
			},500);
		}
	}
	else{
		oldid=id;
	}
}

/*if(num>10&&num<20){
		$("#diSanGe")removeClass();
	};
	else {
		$("#diErGe")removeClass();
	};*/



function xipai(){
	/*$("#bushu").val(num);*/
	/*$(" #oTxt ").val(00:00)
	$(" #bushu").val(0)*/
	/*document.getElementById("oTxt").value=;*/
	document.getElementById("bushu").value="0";//点击刷新按钮时间变为00：00；步数变为0；
	//开始新的游戏
	clearInterval(timer);
	oTxt.value="00:00";
    n=0;
    num=0;
	shuffle(cards);
	//先翻过来
	var y=document.getElementsByClassName("card");//吧1card存入一个新的数组里面
	for(var i=0;i<y.length;i++){
		y[i].setAttribute("class","card");
	}
	//分配已经重新排序过的logo
	var arrLogo=document.querySelectorAll(".card i")
	for(var i=0;i<arrLogo.length;i++){
		arrLogo[i].setAttribute("class","fa "+cards[i]);
	};
	
	
	for(var a=0;a<16;a++){//判断同一张牌是否被点击过
		if(typeof($("#card"+a).attr("onclick"))=="undefined"){
			$("#card"+a).attr("onclick","fanpai("+a+")");	
		}
		else{
			continue;
		}
		
	}
	
	//还原星星
	$("#diErGe").addClass("fa fa-star");
	$("#diSanGe").addClass("fa fa-star");

}


function open_win() //开始新的游戏
{
location.reload();
}


function toDub(n){//计时器数字的显示
	return n<10?"0"+n:""+n;
}




