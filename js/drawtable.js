$(document).ready(function() {

	/*alert('[{"title":"BS","str1":"ミニバン","str2":"er","str3":"195/65R15"},{"title":"BS","str1":"ミニバン","str2":"er","str3":"205/60R16"}]')；
	 */
	var str = new String('[{"title":"YO","str1":"定番1","str2":"yt","str3":"195/65R15"},{"title":"YO","str1":"定番2","str2":"rte","str3":"175/65R14"},{"title":"YO","str1":"ミニバン","str2":"ert","str3":"195/65R15"},{"title":"BS","str1":"定番1","str2":"qw","str3":"195/65R15"},{"title":"BS","str1":"定番1","str2":"qw","str3":"175/65R14"},{"title":"BS","str1":"定番1","str2":"qw","str3":"155/65R14"},{"title":"BS","str1":"定番1","str2":"qw","str3":"155/65R13"},{"title":"BS","str1":"定番2","str2":"we","str3":"195/65R15"},{"title":"BS","str1":"定番2","str2":"we","str3":"175/65R14"},{"title":"BS","str1":"定番2","str2":"we","str3":"155/65R14"},{"title":"BS","str1":"定番2","str2":"we","str3":"155/65R13"},{"title":"BS","str1":"ミニバン","str2":"er","str3":"195/65R15"},{"title":"BS","str1":"ミニバン","str2":"er","str3":"205/60R16"}]');
	var fo = paserJSONtoDF(str);
	drawTable(fo, "df");


});

//!~ object parserJSON(string)
/*JSON 数组 
[
  {
    "title": "BS",
    "str1": "定番1",
    "str2": "qw",
    "str3": "195/65R15",
    "str4":"价钱",
    "str5":"备注"
  }，。。。。
 ]
*/

// 处理JSON字符串变量，拆成如下JSON格式
/*
[
	{
	"title":"BS",
	"df":"定番1",
	"name":"qw"
	"detail":[
		{
			"type":"175/65R",
			"price":"",
			"comment":""
		}，{
			
		}。。。。。
	]
	}
]
*/

function paserJSONtoDF(str) {
	var pjStr = JSON.parse(str);
	var JSONStr = JSON.parse('[]');
	for (var tem in pjStr) {
		var i = JSONStr.length - 1;
		for (; i >= 0; i--) {
			if (JSONStr[i].title == pjStr[tem].title && JSONStr[i].df == pjStr[tem].str1 && JSONStr[i].name == pjStr[tem].str2) {
				var sts = new String('{"type":"' + pjStr[tem].str3 + '","price":"","comment":""}');
				var JSONTem = JSON.parse(sts);
				JSONStr[i].detail.push(JSONTem);
				break;
			}
		};

		if (i < 0) {
			var strTem = JSON.parse('{"title":"' + pjStr[tem].title + '","df":"' + pjStr[tem].str1 + '","name":"' + pjStr[tem].str2 + '","detail":[{"type":"' + pjStr[tem].str3 + '","price":"","comment":""}]}')
			JSONStr.push(strTem);
		};
	};
	return JSONStr;

}

/*
	表头用 .dataTable th 表示
	身体部分用 .dataTable tr表示
	*/

function drawTable(JSONStr, what) {
	if (what) {
		var draw = $("#draw");
		var table = $('<table class="dataTable" border="2px" ></table>');
		var head = $('<div></div>')
		var item = $('<div class="item"></div>');
		if (what == "title") {

			var th = $('<thead></thead>');
			$(th).append($('<tr><td></td><td>ブランド名</td><td>タイヤサイズ</td><td>販売価格（4本税込）</td><td>備考</td></tr>'));
			$(table).append(th);
			var tb = $('<tbody></tbody>');
			$(table).append(tb);

			var titleA = new Array();
			for (var i = 0; i < JSONStr.length; i++) {
				var j = 0;
				for (; j < titleA.length; j++) {
					if (titleA[j] == JSONStr[i].title) {
						break;
					};
				};



				if (j == titleA.length) {

					if (titleA.length == 0) {
						$(table).remove();
					} else {
						
						console.log("插入一个新的title && table");
						var Item = $("<div class='Item'><span><h2>"+JSONStr[i-1].title+"</h2></span></div>");
						$(draw).append(Item);
						$(draw).append(table);

						table = $('<table class="dataTable" border="2px" ></table>');
						th = $('<thead></thead>');
						$(th).append($('<tr><td></td><td>ブランド名</td><td>タイヤサイズ</td><td>販売価格（4本税込）</td><td>備考</td></tr>'));
						$(table).append(th);
						tb = $('<tbody></tbody>');
						$(table).append(tb);
					}
					titleA.push(JSONStr[i].title);
					//未完成
				}

				console.log("插入条新的定番");

				var subs = new String('<tr><td>' + JSONStr[i].df + '</td><td>' + JSONStr[i].name + '</td>');

				for (var k = 0; k < JSONStr[i].detail.length; k++) {
					console.log("插入1条新的记录");
					var temDe = JSONStr[i].detail[k];
					subs += new String('<td>' + temDe.type + '</td><td class="editable">' + temDe.price + '</td><td class="editable">' + temDe.comment + '</td></tr><tr><td></td><td></td>');
				};


				subs = subs.substring(0, subs.lastIndexOf("<tr>"));
				console.log(subs);

				$(tb).append(subs);

			};

			var Item = $("<div class='Item'><span><h2>"+JSONStr[JSONStr.length-1].title+"</h2></span></div>");
			$(draw).append(Item);

			$(draw).append(table);

		} else if (what == "df") {


		} else if (what == "name") {

		} else if (what == "detail") {

		} else {

		};
	}

}