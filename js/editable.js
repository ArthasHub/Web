
//td被点击的事件  

function tdclick() {
	//0 保存当前td节点  
	var td = $(this);
	//1 取出当前td的文本内容保存起来  
	var text = td.text();
	//2 清空td里面的内容  
	td.html(""); //也可以用td.empty();  
	//3 建立文本框，也就是input的节点  
	var input = $("<input>");
	//4 设置文本框值，即保存的文本内容  
	input.attr("value", text);
	//4.5让文本框可以响应lose焦点的事件  
	input.blur(function(event) {

		var inputnode = $(this);
		//2 获取当前文本框的内容

		var inputtext = inputnode.val();
		//3 清空td里面的内容  
		var tdNode = inputnode.parent();
		//4 保存文本框的内容填充到td中  
		tdNode.html(inputtext);
		//5 让td重新拥有点击事件 

		tdNode.click(tdclick);
		var bindID = tdNode.parent('tr').attr('id');
		var bindPrice = tdNode.parent('tr').children('td:eq(3)').html();
		var bindComment = tdNode.parent('tr').children('td:eq(4)').html();
		for (var i = 0; i < DataObj.length; i++) {
			for (var j = 0; j < DataObj[i].detail.length; j++) {
				DataObj[i].detail[j];
				if (bindID == DataObj[i].detail[j].bindID) {
					DataObj[i].detail[j].price = bindPrice;
					DataObj[i].detail[j].comment = bindComment;		
					break;
				};

			};
		};
		


	});
	//5 将文本内容加入td  
	td.append(input); //也可input.appendto(td)  
	//5.5让文本框文字被高亮选中  
	//需要将jquery的对象转换成dom对象  
	var inputdom = input.get(0);
	inputdom.select();
	//6 需要清除td上的点击事件  
	td.unbind("click");
}