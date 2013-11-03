/*
document.getElementById('{!$Component.fm1.acc}').value;
document.getElementById('{!$Component.fm1.it1}').value;
*/

function LocalStr (acc ,adate){
	var temp = data();
	if (localStorage) {
		if(var localedStr = localStorage.storeInfo){
			accObj = JSON.parse(localedStr);
			var i = 0;
			for (; i < accObj.length; i++) {
				if (accObj[i].acc == acc && accObj[i].adate == adate) {
					//覆盖
					break;
				};
			};
			if (i == accObj.length) {
				//插新
			};
		}
	};
	return str;
}
function Save(str){

}

