
//返回str
backs = JSON.parse('[]');
function doDataCol() {
	
	$("#cre").click(function(event) {
		var tem = dataCol();
		if (tem) {
			$("#ipt1").val("");
			$("#ipt2").val("");
			$("#ipt3").val("");
			$("#ipt4").val("");
			$("#ipt5").val("");
			$("#ipt6").val("");
			backs.push(tem);
		}
		drawNew();
	});
	return backs;
}

function dataCol() {
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
			var str = new String('{"title":"' + title + '","name":"","research":"","str1":"' + str1 + '","str2":"' + str2 + '","str3":"' + str3 + '","price":"' + price + '","note":"' + note + '","isnew":"true"}');
			return JSON.parse(str);
		};
	};

}

function data() {
	var str = "";
	var newOne = doDataCol();
	var oldOne = JSON.parse(paserJSONtoStr(DataObj));

	var ret = oldOne.concat(newOne);
	str = JSON.stringify(ret);
	return str;
}