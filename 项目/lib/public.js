function isPrime(num){
	//var flag = true;//表示 是一个素数
	for(var i = 2; i < num ; i++){
		if(num % i == 0){
			//flag = false;//表示不 是一个素数
			//break;
			return false;//只要执行了这里，说明不是一个素数
		}
	}
	//return flag;
	return true;//不执行上面的return，一定会来这里执行，说明这个数是一个素数 
}
//封装获取min和max之间的随机整数
function getRand(min,max){
	return parseInt(Math.random()*(max-min+1) + min);
}
//获取随机十六进制颜色值
function getColor(){
	var color = "#";
	var str = "0123456789abcdef";
	var rand = 0;
	//在str中随机抽取6个字符，
	for (var i = 0; i < 6; i++) {
		rand = getRand(0,15);
		color += str.charAt(rand);
	}
	//把这6个字符拼接到color
	return color;
}
//通过id名称获取元素对象
function $id(idName){
	return document.getElementById(idName);
}
//封装一个随机获取验证码的方法
function getYZM(num){
	var rand = 0;
	var yzm = "";
	//有num个随机数
	for (var i = 0; i < num; i++) {
		rand = getRand(48,122);//包含其它的特殊字符
		if((rand >= 58 && rand <= 64) || (rand >= 91 && rand <= 96)){
			i--;
		}else{//这里中需要的验证码的字符
			yzm += String.fromCharCode(rand);
		}
	}
	return yzm;
}
//时间本地化。
function dateToString(date){
	
	var str = "";
	var week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	
	var h = date.getHours();
	var f = date.getMinutes();
	var s = date.getSeconds();
	
	var w = date.getDay();
	
	//05号 10:42:30 星期五;
	str += y + "年" + db(m) + "月" + db(d) + "日 ";
	str += h + ":" + f + ":" + s + " ";
	str += week[w];
	
	return str;
}
//小于10的数前面加0
function db(num){
	return num < 10 ? "0" + num : num;
}

//获取两个时间的时间差的秒数
function difTime(startTime,endTime){
	return (endTime.getTime() - startTime.getTime())/1000;
}
//利用通配符兼容ie8获取所有className命名的元素集合
function getEleByClassName(className){
	//通过元素名称获取所有元素集合
	var eles = document.getElementsByTagName("*");
	var arr = [];
	for (var i = 0; i < eles.length; i++) {
		//判断元素是否有以className命名的元素，
		if(eles[i].className === className){
			//把className命名的元素push到一个新数组中
			arr.push(eles[i]);
		}
	}
	//返回这个数组
	return arr;
}
//将新节点添加到目标节点的后面
function insertAfter(newNode,target){
	//获取目标节点的父节点
	var parent = target.parentNode;
	if(parent.lastElementChild === target){
		//如果目标节点是最后一个子节点
		//直接将新节点添加父节点的最后
		parent.appendChild(newNode);
	}else{
		//如果目标节点不是最后一个子节点
		//说明肯定下一个兄弟节点
		//将新节点添加到下一个兄弟节点前面。
		parent.insertBefore(newNode,target.nextElementSibling);
	}
};

//兼容ie8获取鼠标的button属性
function getButton(eve){
	//如何判断是ie8浏览器
	//根据事件对象来判断
	if(eve){
		return eve.button;
	}else{
		//这里是ie8执行
		var button = window.event.button;
		switch(button){
			case 1:
			  return 0;
			case 4:
			  return 1;
			case 2:
			  return 2; 
		}
	}
}
//兼容ie8获取所有子元素节点。
function getAllElementsNodes(obj){
	var elements = obj.childNodes;
	var arr = [];
	for (var i = 0; i < elements.length; i++) {
		if(elements[i].nodeType == 1){
			arr.push(elements[i]);
		};
	}
	return arr;
}
//兼容ie8阻止事件冒泡
function stopProp(e){
	if(e.stopPropagation){//现代
		e.stopPropagation();
	}else{//ie8
		e.cancelBubble = true;
	}
}
//兼容ie8实现事件监听
function addEvent(ele,event,fn){
	if(ele.addEventListener){//现代浏览器
		ele.addEventListener(event,fn);
	}else{
		ele.attachEvent("on"+event,fn);
	}
}