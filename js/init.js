info = new String('[{"title":"BS","name":"null","isnew":"false","str1":"定番1","str2":"yyt","str3":"195/65R15","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"定番1","str2":"qw","str3":"195/65R15","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"定番1","str2":"qw","str3":"205/65R15","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"定番1","str2":"qw","str3":"175/65R14","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"定番1","str2":"qw","str3":"155/65R14","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"定番1","str2":"qw","str3":"155/65R13","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"定番2","str2":"we","str3":"195/65R15","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"定番2","str2":"we","str3":"175/65R14","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"定番2","str2":"we","str3":"155/65R14","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"定番2","str2":"we","str3":"155/65R13","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"ミニバン","str2":"er","str3":"205/60R16","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"ミニバン","str2":"er","str3":"195/65R15","price":"","note":""},{"title":"BS","name":"null","isnew":"false","str1":"ミニバン","str2":"yy","str3":"195/65R15","price":"","note":""},{"title":"DU","name":"null","isnew":"false","str1":"定番1","str2":"eert","str3":"195/65R15","price":"","note":""},{"title":"DU","name":"null","isnew":"false","str1":"定番1","str2":"eert","str3":"155/65R13","price":"","note":""},{"title":"DU","name":"null","isnew":"false","str1":"定番2","str2":"ffty","str3":"195/65R15","price":"","note":""},{"title":"DU","name":"null","isnew":"false","str1":"定番2","str2":"ffty","str3":"155/65R14","price":"","note":""},{"title":"DU","name":"null","isnew":"false","str1":"ミニバン","str2":"huy","str3":"195/65R15","price":"","note":""},{"title":"YO","name":"null","isnew":"false","str1":"定番1","str2":"yt","str3":"195/65R15","price":"","note":""},{"title":"YO","name":"null","isnew":"false","str1":"定番1","str2":"yt","str3":"175/65R14","price":"","note":""},{"title":"YO","name":"null","isnew":"false","str1":"定番2","str2":"rte","str3":"175/65R14","price":"","note":""},{"title":"YO","name":"null","isnew":"false","str1":"ミニバン","str2":"ert","str3":"195/65R15","price":"","note":""}]');


stw = new String('[{"title":"BS","name":"","research":"","str1":"定番1","str2":"Newsite","str3":"195/65R15","price":"1000","note":"good","isnew":"true"}]');
$(document).ready(function() {

	/*alert('[{"title":"BS","str1":"ミニバン","str2":"er","str3":"195/65R15"},{"title":"BS","str1":"ミニバン","str2":"er","str3":"205/60R16"}]')；
	 */
	 $(".edt").click(editable);
	 
	init(info,stw);
});

function init(info,noinfo){
	DataJSON = new String(info);
	DataObj = paserJSONtoDF(DataJSON);
	backs = JSON.parse('[]');
	draw(DataObj, "title");
	$("#cre").unbind('click');
	$("#cre").click(bindCre);
	drawNewByStr(noinfo);
	

	$("#sel").change(function(event) {
		console.log("loading is ready");
		var what = $(this).val();
		$("#draw").children().remove();
		draw(DataObj, what);
		var tds = $(".editable");
		//给所有td节点添加点击事件  
		tds.click(tdclick);
	});

	var tds = $(".editable");
	//给所有td节点添加点击事件  
	tds.click(tdclick);

	//bind #Ipt5 keydown event
	$("#ipt5").keydown(ipt5Val);
	
}
function bindCre(event){
	$("#cre").unbind('click');
	doDataCol();
	$("#cre").bind('click',bindCre);
}