// DataJSON = new String('[{"title":"BS","name":"","research":"","str1":"定番1","str2":"qw","str3":"195/65R15","price":"","note":""},{"title":"BS","name":"","research":"","str1":"定番1","str2":"qw","str3":"175/65R14","price":"","note":""},{"title":"BS","name":"","research":"","str1":"定番1","str2":"qw","str3":"155/65R14","price":"","note":""},{"title":"BS","name":"","research":"","str1":"定番1","str2":"qw","str3":"155/65R13","price":"","note":""},{"title":"BS","name":"","research":"","str1":"定番2","str2":"we","str3":"195/65R15","price":"","note":""},{"title":"BS","name":"","research":"","str1":"定番2","str2":"we","str3":"175/65R14","price":"","note":""},{"title":"BS","name":"","research":"","str1":"定番2","str2":"we","str3":"155/65R14","price":"","note":""},{"title":"BS","name":"","research":"","str1":"定番2","str2":"we","str3":"155/65R13","price":"","note":""},{"title":"BS","name":"","research":"","str1":"ミニバン","str2":"er","str3":"205/60R16","price":"","note":""},{"title":"BS","name":"","research":"","str1":"ミニバン","str2":"er","str3":"195/65R15","price":"","note":""},{"title":"YO","name":"","research":"","str1":"定番1","str2":"yt","str3":"195/65R15","price":"","note":""},{"title":"YO","name":"","research":"","str1":"定番2","str2":"rte","str3":"175/65R14","price":"","note":""},{"title":"YO","name":"","research":"","str1":"ミニバン","str2":"ert","str3":"195/65R15","price":"","note":""},{"title":"DU","name":"","research":"","str1":"定番1","str2":"eert","str3":"195/65R15","price":"","note":""},{"title":"DU","name":"","research":"","str1":"定番1","str2":"eert","str3":"155/65R13","price":"","note":""},{"title":"DU","name":"","research":"","str1":"定番2","str2":"ffty","str3":"195/65R15","price":"","note":""},{"title":"DU","name":"","research":"","str1":"定番2","str2":"ffty","str3":"155/65R14","price":"","note":""},{"title":"DU","name":"","research":"","str1":"ミニバン","str2":"huy","str3":"195/65R15","price":"","note":""}]');
g_Width = "120px";


function sortPrice(a, b) {

	if (a.str3 < b.str3) {
		return 1
	} else {
		if (a.str3 == b.str3) {
			return 0;
		} else {
			return -1;
		}
	}
	return (a.str3 > b.str3) ? 1 : 0;
}


function paserJSONtoDF(str) {
	var JSONStr = JSON.parse('[]');
	if (str != "]") {
		bindID = 0;
		var pjStr = JSON.parse(str);
		// pjStr.sort(sortPrice);

		for (var tem in pjStr) {
			var i = JSONStr.length - 1;
			for (; i >= 0; i--) {
				if (JSONStr[i].title == pjStr[tem].title && JSONStr[i].df == pjStr[tem].str1 && JSONStr[i].name == pjStr[tem].str2) {
					var sts = new String('{"type":"' + pjStr[tem].str3 + '","id":"' + pjStr[tem].name + '","price":"' + pjStr[tem].price + '","comment":"' + pjStr[tem].note + '","isnew":"' + pjStr[tem].isnew + '","bindID":"' + bindID + '"}');
					bindID = bindID + 1;
					var JSONTem = JSON.parse(sts);
					JSONStr[i].detail.push(JSONTem);
					break;
				}
			};

			if (i < 0) {
				var strTem = JSON.parse('{"title":"' + pjStr[tem].title + '","df":"' + pjStr[tem].str1 + '","name":"' + pjStr[tem].str2 + '","detail":[{"type":"' + pjStr[tem].str3 + '","id":"' + pjStr[tem].name + '","price":"' + pjStr[tem].price + '","comment":"' + pjStr[tem].note + '","isnew":"' + pjStr[tem].isnew + '","bindID":"' + (bindID) + '"}]}');
				bindID = bindID + 1;
				JSONStr.push(strTem);
			};
		};

	}


	return JSONStr;
}
/*{
    "title": "BS",
    "name": "",
    "research": "",
    "str1": "定番1",
    "str2": "qw",
    "str3": "155/65R14",
    "price": "",
    "note": "",
    "isnew":"true|false"

  },*/

function paserJSONtoStr(JSONObj) {
	var temObj = JSON.parse("[]");
	for (var i = 0; i < JSONObj.length; i++) {
		for (var j = 0; j < JSONObj[i].detail.length; j++) {
			var temStr = new String('{"title":"' + JSONObj[i].title + '","name":"' + JSONObj[i].detail[j].id + '","research":"","str1":"' + JSONObj[i].df + '","str2":"' + JSONObj[i].name + '","str3":"' + JSONObj[i].detail[j].type + '","price":"' + JSONObj[i].detail[j].price + '","note":"' + JSONObj[i].detail[j].comment + '","isnew":"' + JSONObj[i].detail[j].isnew + '"}');
			var tem = JSON.parse(temStr);
			temObj.push(tem);
		};
	};
	return JSON.stringify(temObj);

}


function draw(JSONStr, what) {
	$("#draw").children().remove();
	if (what) {
		if (what == "title") {
			drawTableByTitle(JSONStr);
			console.log("****drawByTitle*****");
		} else if (what == "df") {
			drawTableByDF(JSONStr);
			console.log("****drawByDF*****");
		} else if (what == "type") {
			drawByType(JSONStr);
			console.log("****drawByType****");
		} else {

			console.log("Error Input : What in draw");
		};
	}


}

/*
	[{
		"title": "BS",
		"df": "定番1",
		"name":"yt"
		"detail": [{
			"bindID":"0++"
			"id": ""
			"type": "175/65R",
			"price": "",
			"comment": ""
		}]
	}]
*/

/*
 [{
    "type": "降序",
    "listOut": [{
      "title": "升序",
      "listIn":[{
        "name":"升序",
        "price":"",
        "comment":"",
        "bindID":""
        }]
    }]
  }]
*/

function drawByType(JSONStr) {
	var JSONTEMP = JSONStr.slice(0);
	// JSONTEMP.sort(sortPrice);



	console.log('*********************');

	var list = new Array();
	for (var i = 0; i < JSONTEMP.length; i++) {
		for (var j = 0; j < JSONTEMP[i].detail.length; j++) {
			var tem = JSONTEMP[i].detail[j];

			var k = 0;
			for (; k < list.length; k++) {
				var temStr = $(list[k]).attr('id');
				if (temStr == tem.type) {
					break;
				};
			};
			if (k == list.length) {
				//new and init
				var group = $('<tbody id="' + tem.type + '"></tbody>');
				var tr = $('<tr id="' + tem.bindID + '"> <td>' + tem.type + '</td>  <td>' + JSONTEMP[i].title + '</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
				$(group).append(tr);

				list.push(group);
			} else {

				//new

				var flag = true;
				var s_idx = -1,
					e_idx = -1;
				$(list[k]).children('tr').children('td:nth-child(2)').each(function(index, el) {
					s_idx = index;
					if ($(el).text() == JSONTEMP[i].title) {
						flag = false;

						return flag;
					}
				});

				if (flag) {
					//是本MAKER的第一行，flag = true；
					var tr = $('<tr id="' + tem.bindID + '" > <td >&nbsp;</td>  <td>' + (flag ? JSONTEMP[i].title : "&nbsp;") + '</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
					$(list[k]).append(tr);
				} else {
					//不是本MAKER的第一行 flag = false;
					if ($(list[k]).children('tr').size() == 1) {
						//如果是第一条数据继续添加
						var nameTem = $(list[k]).children('tr').children('td:eq(2)').text();
						if (JSONTEMP[i].name < nameTem) {
							var $trNode = $(list[k]).children('tr:eq(0)');
							var $text = $trNode.children('td:eq(0)').text();
							$trNode.children('td:eq(1)').text('');
							$trNode.children('td:eq(0)').text('');

							var tr = $('<tr id="' + tem.bindID + '" > <td >' + $text + '</td>  <td>' + JSONTEMP[i].title + '</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
							$(list[k]).children('tr').before(tr);
						} else {
							var tr = $('<tr id="' + tem.bindID + '" > <td >&nbsp;</td>  <td>&nbsp;</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
							$(list[k]).append(tr);
						};
					} else {
						var whereToInsert = -1,
							rec = -1;
						$(list[k]).children('tr').slice(s_idx).each(function(index, el) {
							var nameTem = $(el).children('td:eq(2)').text();
							rec = index;
							if (JSONTEMP[i].name < nameTem) {
								whereToInsert = index;
								return false;
							}
							return true;
						});



						// rec =0 whereToInsert = 0

						//rec=n whereToInsert=n

						//rec=0,n whereToInsert=-1
						if (whereToInsert == -1) {
							var tr = $('<tr id="' + tem.bindID + '" > <td >&nbsp;</td>  <td>&nbsp;</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');

							$(list[k]).append(tr);
						} else {
							if (whereToInsert == 0) {
								var $tdNode = $(list[k]).children('tr:eq(' + s_idx + ')').children('td:eq(1)');
								$tdNode.text('');
								var $text = $tdNode.parent().children('td:eq(0)').text();

								var tr = $('<tr id="' + tem.bindID + '" > <td >' + $text + '</td>  <td>' + JSONTEMP[i].title + '</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
								$tdNode.parent().children('td:eq(0)').text('');
								$tdNode.parent().before(tr);
							} else {
								var $trNode = $(list[k]).children('tr:eq(' + (whereToInsert + s_idx) + ')');
								var tr = $('<tr id="' + tem.bindID + '" > <td >&nbsp;</td>  <td>&nbsp;</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');

								$trNode.before(tr);
							};


						};



					};

				};



			}

		};
	};
	list.sort(sortByType);


	var items = new Array();

	$(list).each(function(index, el) {
		var item = $('<div ></div>');
		var typeStr = el.children('tr:eq(0)').children('td:eq(0)').text();

		var head = $('<div id="" class="item"><span>' + typeStr + '</span></div>');
		var table = $('<table class="dataTable" border="2px;"></table>');
		var th = $('<thead><tr> <td class="FistColHiden"> </td>  <td>メーカー名</td>  <td>ブランド名</td>  <td>販売価格（4本税込）</td>  <td>備考</td> </tr></thead>');
		//var th = $('<thead><tr> <td>{!$Label.column3}</td>  <td>{!$Label.column1}</td>  <td>{!$Label.column2}</td>  <td>{!$Label.column4}</td>  <td>{!$Label.column5}</td> </tr></thead>');
		var tb = $('<tbody></tbody>');
		el.children('tr:eq(0)').children('td:eq(0)').text('');
		el.find('td:nth-child(1)').addClass('FistColHiden');

		$(tb).append($(el).children('tr'));

		$(table).append(th);
		$(table).append(tb);
		$(item).append(head);
		$(item).append(table);
		items.push(item);
	});


	$(items).each(function(index, el) {
		var $trs = el.children('table').find('tr');
		$trs.children('td:nth-child(2)').attr('width', g_Width);
		$trs.children('td:nth-child(3)').attr('width', "40%");
		$trs.children('td:nth-child(4)').attr('width', g_Width);
		$trs.children('td:nth-child(5)').attr('width', "30%");
		el.appendTo('#draw');	
	});

}

function drawTableByType(JSONStr) {
	var JSONTEMP = JSONStr.slice(0);
	// JSONTEMP.sort(sortPrice);



	var item = $('<div ></div>');
	var head = $('<div id="" class="item"><span>サイズ</span></div>');
	var table = $('<table class="dataTable" border="2px;"></table>');
	var th = $('<thead><tr> <td>タイヤサイズ</td>  <td>メーカー名</td>  <td>ブランド名</td>  <td>販売価格（4本税込）</td>  <td>備考</td> </tr></thead>');
	//var th = $('<thead><tr> <td>{!$Label.column3}</td>  <td>{!$Label.column1}</td>  <td>{!$Label.column2}</td>  <td>{!$Label.column4}</td>  <td>{!$Label.column5}</td> </tr></thead>');
	var tb = $('<tbody></tbody>');
	console.log('*********************');

	var list = new Array();
	for (var i = 0; i < JSONTEMP.length; i++) {
		for (var j = 0; j < JSONTEMP[i].detail.length; j++) {
			var tem = JSONTEMP[i].detail[j];

			var k = 0;
			for (; k < list.length; k++) {
				var temStr = $(list[k]).attr('id');
				if (temStr == tem.type) {
					break;
				};
			};
			if (k == list.length) {
				//new and init
				var group = $('<tbody id="' + tem.type + '"></tbody>');
				var tr = $('<tr id="' + tem.bindID + '"> <td>' + tem.type + '</td>  <td>' + JSONTEMP[i].title + '</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
				$(group).append(tr);

				list.push(group);
			} else {
				//new
				var flag = true;
				$(list[k]).children('tr').children('td:nth-child(2)').each(function(index, el) {
					if ($(el).html() == JSONTEMP[i].title) {
						flag = false;
						return flag;
					}
				});
				//是本MAKER的第一行，flag = true；
				//不是本MAKER的第一行 flag = false;

				var tr = $('<tr id="' + tem.bindID + '" > <td >&nbsp;</td>  <td>' + (flag ? JSONTEMP[i].title : "&nbsp;") + '</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
				$(list[k]).append(tr);

			}

		};
	};
	list.sort(sortByType);
	$(list).each(function(index, el) {
		$(tb).append($(el).children('tr'));
	});

	$(table).append(th);
	$(table).append(tb);
	$(item).append(head);
	$(item).append(table);
	$('#draw').append(item);
}

function drawTableByTitle(JSONStr) {

	var items = new Array();
	for (var i = 0; i < JSONStr.length; i++) {
		var j = 0
		for (; j < items.length; j++) {
			if ($(items[j]).attr('id') == JSONStr[i].title) {
				//find same elem
				break;
			};
		};

		if (j == items.length) {
			//init a table;
			var table, head, item;
			table = $('<table class="dataTable" border="2px" ></table>');
			var th = $('<thead><tr><td></td><td>ブランド名</td><td>タイヤサイズ</td><td>販売価格（4本税込）</td><td>備考</td></tr></thead>');
			var tb = $('<tbody></tbody>');
			table.append(th);
			table.append(tb);
			head = $('<div><span>' + JSONStr[i].title + '</span></div>');
			item = $('<div class="item" id=' + JSONStr[i].title + '></div>');
			$(item).append(head);
			$(item).append(table);
			items.push(item);
		}
		//new Item 
		//draw new Item
		//items[j]; 为当前选定的item
		var tds = $('<tr id="' + JSONStr[i].detail[0].bindID + '"> <td>' + JSONStr[i].df + '</td>  <td>' + JSONStr[i].name + '</td>  <td>' + JSONStr[i].detail[0].type + '</td>  <td class="editable">' + JSONStr[i].detail[0].price + '</td>  <td class="editable">' + JSONStr[i].detail[0].comment + '</td> </tr>');
		$(items[j]).children('table').children('tbody').append(tds);
		for (var k = 1; k < JSONStr[i].detail.length; k++) {
			tds = $('<tr id="' + JSONStr[i].detail[k].bindID + '"> <td> &nbsp;</td>  <td> &nbsp;</td>  <td>' + JSONStr[i].detail[k].type + '</td>  <td class="editable">' + JSONStr[i].detail[k].price + '</td>  <td class="editable">' + JSONStr[i].detail[k].comment + '</td> </tr>');
			$(items[j]).children('table').children('tbody').append(tds);
		};

	};

	for (var w = 0; w < items.length; w++) {
		items[w].children('table').attr('width', '100%');
		var $trs =  items[w].children('table').find('tr');
		$trs.children('td:nth-child(1)').attr('width', g_Width);
		$trs.children('td:nth-child(2)').attr('width', '40%');
		$trs.children('td:nth-child(3)').attr('width', g_Width);
		$trs.children('td:nth-child(4)').attr('width', g_Width);
		$trs.children('td:nth-child(5)').attr('width', '30%');

		$("#draw").append(items[w]);
	};


}

function drawTableByDF(JSONStr) {

	var items = new Array();
	for (var i = 0; i < JSONStr.length; i++) {
		var j = 0
		for (; j < items.length; j++) {
			if ($(items[j]).attr('id') == JSONStr[i].df) {
				//find same elem
				break;
			};
		};

		if (j == items.length) {
			//init a table;
			var table, head, item;
			table = $('<table class="dataTable" border="2px" ></table>');
			var th = $('<thead><tr><td>メーカー名</td><td>ブランド名</td><td>タイヤサイズ</td><td>販売価格（4本税込）</td><td>備考</td></tr></thead>');
			var tb = $('<tbody></tbody>');
			table.append(th);
			table.append(tb);
			head = $('<div><span>' + JSONStr[i].df + '</span></div>');
			item = $('<div class="item" id=' + JSONStr[i].df + '></div>');
			$(item).append(head);
			$(item).append(table);
			items.push(item);
		}
		//new Item 
		//draw new Item
		//items[j]; 为当前选定的item
		var tds = $('<tr id="' + JSONStr[i].detail[0].bindID + '"> <td>' + JSONStr[i].title + '</td>  <td>' + JSONStr[i].name + '</td>  <td>' + JSONStr[i].detail[0].type + '</td>  <td class="editable">' + JSONStr[i].detail[0].price + '</td>  <td class="editable">' + JSONStr[i].detail[0].comment + '</td> </tr>');
		$(items[j]).children('table').children('tbody').append(tds);
		for (var k = 1; k < JSONStr[i].detail.length; k++) {
			tds = $('<tr id="' + JSONStr[i].detail[k].bindID + '"> <td >&nbsp;</td>  <td >&nbsp;</td>  <td>' + JSONStr[i].detail[k].type + '</td>  <td class="editable">' + JSONStr[i].detail[k].price + '</td>  <td class="editable">' + JSONStr[i].detail[k].comment + '</td> </tr>');
			$(items[j]).children('table').children('tbody').append(tds);
		};

	};

	for (var w = 0; w < items.length; w++) {
		items[w].children('table').attr('width', '100%');
		var $trs =  items[w].children('table').find('tr');
		$trs.children('td:nth-child(1)').attr('width', g_Width);
		$trs.children('td:nth-child(2)').attr('width', '40%');
		$trs.children('td:nth-child(3)').attr('width', g_Width);
		$trs.children('td:nth-child(4)').attr('width', g_Width);
		$trs.children('td:nth-child(5)').attr('width', '30%');
		$("#draw").append(items[w]);
	};
}


function bindData(JSONBind) {
	for (var i = 0; i < DataObj.length; i++) {
		if (DataObj[i].title == JSONBind.title && DataObj[i].str1 == DataObj[i].str1 && DataObj[i].str2 == JSONBind.str2 && DataObj[i].str3 == JSONBind.str3) {
			DataObj[i].price = JSONBind.price;
			DataObj[i].note = JSONBind.note;
			break;
		};
	};
	DataJSON = paserJSONtoStr(DataObj);

}

function drawNew(tem) {
	for (var i = 0; i < tem.length; i++) {
		var newTr = $("<tr id='" + tem[i].bindID + "' ><td class='editNew'>" + tem[i].title + "</td><td class='editNew'>" + tem[i].str1 + "</td><td class='editNew'>" + tem[i].str2 + "</td><td class='editNew'>" + tem[i].str3 + "</td> <td class='editNew'>" + tem[i].price + "</td> <td class='editNew'>" + tem[i].note + "</td></tr>");
		$(newTr).children('td:eq(0)').attr('width', g_Width);
		$(newTr).children('td:eq(1)').attr('width', g_Width);
		$(newTr).children('td:eq(2)').attr('width', "40%");
		$(newTr).children('td:eq(3)').attr('width', g_Width);
		$(newTr).children('td:eq(4)').attr('width', g_Width);
		$(newTr).children('td:eq(5)').attr('width', "30%");
		$("#newDraw").children('tbody').append($(newTr));
	};
	
	var tdd = $(".editNew");
	tdd.unbind("click");
	tdd.click(newClick);

}

function drawNewByStr(str) {
	$("#newDraw").children().children("tr:gt(1)").remove();
	if (str != "]") {
		var JSONNew = JSON.parse(str);
		var bindID = $("#newDraw tr:last").attr("id");
		if (!bindID) {
			bindID = 0;
		};
		for (var t in JSONNew) {
			bindID = bindID - 1;
			var sts = new String('{"title":"' + JSONNew[t].title + '","name":"' + JSONNew[t].name + '","research":"","str1":"' + JSONNew[t].str1 + '","str2":"' + JSONNew[t].str2 + '","str3":"' + JSONNew[t].str3 + '","price":"' + JSONNew[t].price + '","note":"' + JSONNew[t].note + '","isnew":"true","bindID":"' + bindID + '"}');
			backs.push(JSON.parse(sts));
		}
		drawNew(backs);
	} else {
		$("#newDraw").children().children("tr:gt(1)").remove();
	}

}

function sortByType(a, b) {
	var at = $(a).children('tr:eq(0)').children('td:eq(0)').text();
	var bt = $(b).children('tr:eq(0)').children('td:eq(0)').text();
	if (at < bt) {
		return 1
	} else {
		if (at == bt) {
			return 0;
		} else {
			return -1;
		}
	}
}