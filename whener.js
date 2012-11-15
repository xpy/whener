var _whener = function(){

	var whens = [];
	var T = this;
	var wLength = 0;

	T.intrvl = null;

	T.addWhen = function(condition,callback){

		var oneWhen = {'condition':condition,'callback':callback};
		whens.push(oneWhen);
		wLength = whens.length;
		if(wLength === 1){startInterval();}
	};

	var startInterval = function(){
		T.intrvl = setInterval(checkWhens,1000);
	};

	var stopInterval = function(){
		window.clearInterval(T.intrvl);
	};

	var checkWhen = function(when){
		if(when.condition.call()){
			when.callback.call();
			return false;
		}
		return true;
	};


	var checkWhens = function (){
		console.log('checking');
		whens = whens.filter(checkWhen);
		wLength = whens.length;
		if(wLength === 0){stopInterval();}
	}
};

var whener = new _whener();
var when = function(condition, callback){
	whener.addWhen(condition,callback)
};

var ct1 = 10;
function test1(){
	return !(ct1--);
}
var ct2= 20;
function test2(){
	return !(ct2--);
}

function end1(){ console.log('END1');}
function end2(){ console.log('END2');}

when(test1,end1);
when(test2,end2);