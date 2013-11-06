//validate.js validate all the param
function isNum(str){
	var reg = /^[\d]{0,5}$/g  ;
	return reg.test(str);
}
function noteIsLE(str){
	var reg = /^.{0,50}$/g;
	return reg.test(str);
}
//没有中括号
//return New leggle JSON
function ValidateLS(LSStr,NewStr){
	var LSObj = JSON.parse(LSStr);
	var NewObj = JSON.parse(NewStr);
	var i = 0;
	for (; i < LSObj.length; i++) {
		if (LSObj[i].account == NewObj.account && LSObj[i].adate == NewObj.adate) {
			LSObj.splice(i,1,NewObj);
			break;
		};
	};
	if (i == LSObj.length) {
		LSObj.concat(NewObj);
	};
	return JSON.stringify(LSObj);
}