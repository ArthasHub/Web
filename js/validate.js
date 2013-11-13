//validate.js validate all the param

function isNum(str) {
	var reg =  /^[\d]{0,8}$/g;
	return reg.test(str);
}

function isNumSt(str) {
	var reg =  /^[\d]/g;
	return reg.test(str);
}
function noteIsLE(str) {
	var reg = /^.{0,50}$/g;
	return reg.test(str);
}

function isLt50(str){
	return str.length<=50;
}

//没有中括号
//return New leggle JSON

function ValidateLS(LSStr, NewStr) {
	var LSObj = JSON.parse(LSStr);
	var NewObj = JSON.parse(NewStr);
	var i = 0;
	for (; i < LSObj.length; i++) {
		if (LSObj[i].account == NewObj.account && LSObj[i].adate == NewObj.adate) {
			LSObj.splice(i, 1, NewObj);
			break;
		};
	};
	if (i == LSObj.length) {
		LSObj.push(NewObj);
	};
	return JSON.stringify(LSObj);
}
var locked = false;
var dataWell = false;
