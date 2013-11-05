info = new String('[{"title":"YO","name":"0000000122","isnew":"false","str1":"定番1","str2":"yt","str3":"195/65R15","price":"45","note":"null"},{"title":"YO","name":"0000000123","isnew":"false","str1":"定番1","str2":"yt","str3":"175/65R14","price":"54","note":"null"},{"title":"YO","name":"0000000124","isnew":"false","str1":"定番2","str2":"rte","str3":"175/65R14","price":"45","note":"null"},{"title":"YO","name":"0000000125","isnew":"false","str1":"ミニバン","str2":"ert","str3":"195/65R15","price":"4","note":"null"},{"title":"DU","name":"0000000126","isnew":"false","str1":"定番1","str2":"eert","str3":"195/65R15","price":"45","note":"null"},{"title":"DU","name":"0000000127","isnew":"false","str1":"定番1","str2":"eert","str3":"155/65R13","price":"4","note":"null"},{"title":"DU","name":"0000000128","isnew":"false","str1":"定番2","str2":"ffty","str3":"195/65R15","price":"45","note":"null"},{"title":"DU","name":"0000000129","isnew":"false","str1":"定番2","str2":"ffty","str3":"155/65R14","price":"54","note":"null"},{"title":"DU","name":"0000000130","isnew":"false","str1":"ミニバン","str2":"huy","str3":"195/65R15","price":"45","note":"null"},{"title":"BS","name":"0000000110","isnew":"false","str1":"定番1","str2":"qw","str3":"195/65R15","price":"12","note":"null"},{"title":"BS","name":"0000000111","isnew":"false","str1":"定番1","str2":"qw","str3":"175/65R14","price":"12","note":"null"},{"title":"BS","name":"0000000112","isnew":"false","str1":"定番1","str2":"qw","str3":"155/65R14","price":"12","note":"null"},{"title":"BS","name":"0000000113","isnew":"false","str1":"定番1","str2":"qw","str3":"155/65R13","price":"12","note":"null"},{"title":"BS","name":"0000000114","isnew":"false","str1":"定番1","str2":"yyt","str3":"195/65R15","price":"12","note":"null"},{"title":"BS","name":"0000000115","isnew":"false","str1":"定番2","str2":"we","str3":"195/65R15","price":"12","note":"null"},{"title":"BS","name":"0000000116","isnew":"false","str1":"定番2","str2":"we","str3":"175/65R14","price":"12","note":"null"},{"title":"BS","name":"0000000117","isnew":"false","str1":"定番2","str2":"we","str3":"155/65R14","price":"12","note":"null"},{"title":"BS","name":"0000000118","isnew":"false","str1":"定番2","str2":"we","str3":"155/65R13","price":"2","note":"null"},{"title":"BS","name":"0000000119","isnew":"false","str1":"ミニバン","str2":"er","str3":"205/60R16","price":"2","note":"null"},{"title":"BS","name":"0000000120","isnew":"false","str1":"ミニバン","str2":"er","str3":"195/65R15","price":"2","note":"null"},{"title":"BS","name":"0000000121","isnew":"false","str1":"ミニバン","str2":"yy","str3":"195/65R15","price":"12","note":"null"}]');


stw = new String('[{"title":"BS","name":"","research":"","str1":"定番1","str2":"Newsite","str3":"195/65R15","price":"1000000","note":"good","isnew":"true"}]');
$(document).ready(function() {

	/*alert('[{"title":"BS","str1":"ミニバン","str2":"er","str3":"195/65R15"},{"title":"BS","str1":"ミニバン","str2":"er","str3":"205/60R16"}]')；
	 */

	init(info,stw);
});

function init(info,noinfo){
	DataJSON = new String(info);
	DataObj = paserJSONtoDF(DataJSON);
	backs = JSON.parse('[]');
	draw(DataObj, "title");

	$("#cre").click(function(event) {
		doDataCol();

	});
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
	
}