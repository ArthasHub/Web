//返回str



function doDataCol() {

	var tem = dataCol();

	if (tem) {
		if (tem.title != "必須" && tem.str2 != "必須" && tem.str3 != "必須" && tem.price != "必須") {
			$("#ipt1").val("必須");
			$("#ipt2").val("");
			$("#ipt3").val("必須");
			$("#ipt4").val("必須");
			$("#ipt5").val("必須");
			$("#ipt6").val("");
			backs.push(tem);
			drawNew(JSON.parse( "["+JSON.stringify(tem)+"]"));
		};
	}
	var ted = new Array();
	for (var i = 0; i < backs.length; i++) {
		ted.push(JSON.parse('{"title":"' + backs[i].title + '","name":"","research":"","str1":"' + backs[i].str1 + '","str2":"' + backs[i].str2 + '","str3":"' + backs[i].str3 + '","price":"' + backs[i].price + '","note":"' + backs[i].note + '","isnew":"true"}'));
	};
	return ted;
}

function dataCol() {
	var bindID = $("#newDraw tr:last").attr("id");
    if (!bindID) {
        bindID = 0;
    };
	var title = $("#ipt1").val();
	var str1 = $("#ipt2").val();
	var str2 = $("#ipt3").val();
	var str3 = $("#ipt4").val();
	var price = $("#ipt5").val();
	var note = $("#ipt6").val();
	var i = 0;
	if (title + str1 + str2 + str3 + price + note != "") {
		for (; i < backs.length; i++) {
			if (title == backs[i].title && str1 == backs[i].str1 && str2 == backs[i].str2 && str3 == backs[i].str3) {
				console.log("input error: data has existed");
				break;
			}
		};
		if (i == backs.length) {
			var str = new String('{"title":"' + title + '","name":"","research":"","str1":"' + str1 + '","str2":"' + str2 + '","str3":"' + str3 + '","price":"' + price + '","note":"' + note + '","isnew":"true","bindID":"'+bindID+'"}');
			return JSON.parse(str);
		};
	};

}

function data() {
	var str = "";
	var newOne = doDataCol();
	var oldOne = JSON.parse(paserJSONtoStr(DataObj));
	JSON.stringify(doDataCol());
	var ret = oldOne.concat(newOne);
	str = JSON.stringify(ret);
	return str;
}