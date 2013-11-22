backs = JSON.parse("[]");

$(document).ready(function() {

    $(".datePicker1").prop("readOnly", true).datepicker({
        "dateFormat":"yy/mm/dd",
        "changeMonth": "true",
      "changeYear": "true",
      "showButtonPanel": "true"
     
    });
    var DateNow = new Date();
    if (DateNow.getDate() < 10) {
        var DateStr = DateNow.getFullYear() + "/" + (DateNow.getMonth() + 1) + "/0" + DateNow.getDate();
        document.getElementById("{!$Component.fm1.it1}").value = DateStr;
        document.getElementById("lbdate").innerHTML = DateStr;
    } else {
        var DateStr = DateNow.getFullYear() + "/" + (DateNow.getMonth() + 1) + "/" + DateNow.getDate();
        document.getElementById("{!$Component.fm1.it1}").value = DateStr;
        document.getElementById("lbdate").innerHTML = DateStr;
    }
    document.getElementById("{!$Component.fm1.txtacc}").innerHTML = localStorage.pramname;
    document.getElementById("{!$Component.fm1.txtacc}").value = localStorage.pramname;
    document.getElementById("{!$Component.fm1.ihacc}").value = localStorage.pramid;
    if (navigator.onLine == false) {
        var DateNow = new Date();
        if (DateNow.getMonth() + 1 != localStorage.CacheDateMonth) {
            alert("{!$Label.Pageupdatecache}");
        } else {
            if (DateNow.getDate() - localStorage.CacheDateDay > parseInt("{!$Label.PageCacheDate}")) {
                alert("{!$Label.Pageupdatecache}");
            } else {
                info = document.getElementById("{!$Component.fm1.ihOffLineData}").value;
                noinfo = "]";
            }
        }
    } else {
       
        if(!CheckSession())
        {
            window.location.href = "/apex/RedirectPage";
        }
        else
        {
            
            var cacheDateNow = new Date();
            localStorage.CacheDateMonth = cacheDateNow.getMonth() + 1;
            localStorage.CacheDateDay = cacheDateNow.getDate();
            geteditinfo();
            window.setTimeout(test, 100);
            info = document.getElementById("{!$Component.fm1.ih1}").value;
            noinfo = document.getElementById("{!$Component.fm1.ihNo}").value;    
           
            if (localStorage.OffLineValue != null && localStorage.OffLineValue != "") {
               alert("{!$Label.Pagesynchronous}");
                document.getElementById("{!$Component.fm1.ih3}").value = localStorage.OffLineValue;
                savelocal();
                window.setTimeout(checkLocal, 100);
            }
        }
    }
    init(info, noinfo);
    oldDate = document.getElementById("{!$Component.fm1.it1}").value;
   // window.setInterval(checkNet, 2e3);
  
});

function CheckSession()
{
    var str = "";
    try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/apex/CheckLogin", false);
            xhr.send(null);
           if (xhr.readyState === 4 && xhr.status === 200) {
                str = "ON LINE NOW";
                return true;
           } else {
               str = "OFF LINE NOW";
               return false;
           }
     } catch (ex) {
           str = "OFF LINE NOW! (LOGOUT)";
           return false;
    }     
}


OnLineAlert = true;

OffLineAlert = true;

function checkNet() {
    if (navigator.onLine == false && OffLineAlert) {
        var DateNow = new Date();
        if (DateNow.getMonth() + 1 != localStorage.CacheDateMonth) {
            alert("{!$Label.Pageupdatecache}");
        } else {
            if (DateNow.getDate() - localStorage.CacheDateDay > 10) {
                alert("{!$Label.Pageupdatecache}");
            } else {
                OffLineAlert = false;
                OnLineAlert = true;
            }
        }
    }
    if (navigator.onLine == true && OnLineAlert) {
        var cacheDateNow = new Date();
        localStorage.CacheDateMonth = cacheDateNow.getMonth() + 1;
        localStorage.CacheDateDay = cacheDateNow.getDate();
        OnLineAlert = false;
        OffLineAlert = true;
        if (localStorage.OffLineValue != null && localStorage.OffLineValue != "") {
             alert("{!$Label.Pagesynchronous}");
            document.getElementById("{!$Component.fm1.ih3}").value = localStorage.OffLineValue;
            savelocal();
            window.setTimeout(checkLocal, 100);
        }
    }
}

function checkLocal() {
    if (document.getElementById("{!$Component.fm1.ihMarkLocal}").value == "ok") {
       
        document.getElementById("{!$Component.fm1.ihMarkLocal}").value = "no";
        localStorage.OffLineValue = "";
    } else if (document.getElementById("{!$Component.fm1.ihMarkLocal}").value == "error") {
        document.getElementById("{!$Component.fm1.ihMarkLocal}").value = "no";
        alert("{!$Label.PagedataError}");
        localStorage.OffLineValue = "";
    } else {
        window.setTimeout(checkLocal, 100);
    }
}

//Save
function getinfo() {
    
    
    var datacomplete = true;
    var obj = eval(data());
    for(var i = 0;i< obj.length;i++)
    {
   
   
           if(obj[i].title == "" || obj[i].str2 == "" || obj[i].str3 == "" )
           {
              
              
                  if(obj[i].title == ""&&obj[i].str1== ""&&obj[i].str2== ""&&obj[i].str3== ""&&obj[i].price== ""&&obj[i].note== "")
                  {
                     
                  }
                  else
                  {
                      datacomplete = false;
                      break;
                  }
             
           }
      
        
    }
   if(datacomplete == false ){
      document.getElementById("saveButton").disabled = false;
       alert("{!$Label.CheckBlank}");
   }
   else
   {
    

        document.getElementById("saveButton").disabled = true;
        if (navigator.onLine == false) {
            alert("{!$Label.PagestoreToLocal}");
            addlocaldata();
            window.location.href = "/apex/CustomerChoice";
        } else {
            if (CheckSession()) {
            
                var ifval = document.getElementById("{!$Component.fm1.ihifHadVal}").value;
              
                if(ifval == "true")
                {
                    var oneinfo1 = data();
                    var objectList = eval(oneinfo1);
                    var clear = true;
                   
                    for(var m = 0;m< objectList.length;m++)
                    {
                       if(objectList[m].isnew == "false")
                       {
                        
                          if(objectList[m].price != "" || objectList[m].note != "")
                          {
                             clear = false;
                             break;
                          }
                       }
                       if(objectList[m].isnew == "true")
                       {
                          if(objectList[m].str1 != "" || objectList[m].str2 != ""|| objectList[m].str3 != ""|| objectList[m].title != "")
                          {
                             clear = false;
                             break;
                          }
                       }
                    }
                  
                    if(clear)
                    {
                        var bool = window.confirm("{!$Label.EnsureClear}");
                        if (bool) {
                            if(saveMark == false)
                            {
                                document.getElementById("saveButton").disabled = false;
                                alert("{!$Label.InputBox}");
                            }
                            else
                            {
                                  
                                  deleteinfo();
                                  window.setTimeout(checkdelete, 100);
                            }
                         }
                         else
                         {
                             document.getElementById("saveButton").disabled = false;
                         }
                    }
                    else
                    {
                    
                         if(saveMark == false)
                         {
                            document.getElementById("saveButton").disabled = false;
                            alert("{!$Label.InputBox}");
                         }
                         else
                         {
                            document.getElementById("{!$Component.fm1.ih3}").value = oneinfo1;
                            getinfo1();
                            window.setTimeout(checkSave, 100);
                         }
                    }
                }
                else
                {
                    var oneinfo1 = data();
                    var objectList = eval(oneinfo1);
                    var clear = true;
                    for(var m = 0;m< objectList.length;m++)
                    {
                       if(objectList[m].isnew == "false")
                       {
                          
                          if(objectList[m].price != "" || objectList[m].note != "")
                          {
                             clear = false;
                             break;
                          }
                       }
                       if(objectList[m].isnew == "true")
                       {
                          if(objectList[m].str1 != "" || objectList[m].str2 != ""|| objectList[m].str3 != ""|| objectList[m].title != "")
                          {
                             clear = false;
                             break;
                          }
                       }
                    }
                  
                    if(clear)
                    {
                         var oneinfo1 = data();
                      
                        if(saveMark == false)
                        {
                            document.getElementById("saveButton").disabled = false;
                            alert("{!$Label.InputBox}");
                        }
                        else
                        {
                            window.location.href = "/apex/CustomerChoice";
                         }
                    }
                    else
                    {
                        var oneinfo1 = data();
                      
                        if(saveMark == false)
                        {
                            document.getElementById("saveButton").disabled = false;
                            alert("{!$Label.InputBox}");
                        }
                        else
                        {
                            document.getElementById("{!$Component.fm1.ih3}").value = oneinfo1;
                            getinfo1();
                            window.setTimeout(checkSave, 100);
                        }
                    }
                 }   
            } else {
                alert("{!$Label.Logout}");
                window.location.href = "/apex/RedirectPage";
            }
        }
    }
}

//检查后台是否Save
function checkSave() {
    if (document.getElementById("{!$Component.fm1.ihMarkSave}").value == "ok") {
        document.getElementById("{!$Component.fm1.ihMarkSave}").value = "no";
        window.location.href = "/apex/CustomerChoice";
    } else if (document.getElementById("{!$Component.fm1.ihMarkSave}").value == "error") {
        document.getElementById("{!$Component.fm1.ihMarkSave}").value = "no";
        alert("{!$Label.PagedataError}");
        document.getElementById("saveButton").disabled = false;
        window.location.href = "/apex/CustomerChoice";
    } else {
        window.setTimeout(checkSave, 100);
    }
}
//检查
function checkdelete()
{
     if (document.getElementById("{!$Component.fm1.ihMarkDelete}").value == "ok") {
        document.getElementById("{!$Component.fm1.ihMarkDelete}").value = "no";
        window.location.href = "/apex/CustomerChoice";
    } else if (document.getElementById("{!$Component.fm1.ihMarkDelete}").value == "error") {
        document.getElementById("{!$Component.fm1.ihMarkDelete}").value = "no";
        alert("{!$Label.PagedataError}");
        document.getElementById("saveButton").disabled = false;
        window.location.href = "/apex/CustomerChoice";
    } else {
        window.setTimeout(checkdelete, 100);
    }
}
//local 加数据
function addlocaldata() {
    var oneinfo = data();
     if(saveMark == false)
     {
         document.getElementById("saveButton").disabled = false;
         alert("{!$Label.InputBox}");
     }
     else
     {
        var acc = document.getElementById("{!$Component.fm1.ihacc}").value;
        var date = document.getElementById("{!$Component.fm1.it1}").value;
        oneinfo = '[{"account":"' + acc + '","adata":"' + date + '","pricedetail":' + oneinfo + "}]";
        if (localStorage.OffLineValue == null || localStorage.OffLineValue == "") {
            localStorage.OffLineValue = oneinfo;
        } else {
            tempinfo = localStorage.OffLineValue;
          
            var offinfo = ValidateLS(tempinfo, oneinfo);
            localStorage.OffLineValue = offinfo;
        }
    }
}
//禁止输入
function NotAllowed() {
    document.getElementById("{!$Component.fm1.it1}").value = oldDate;
}
//当前日期点击
function DateIn() {
    if (document.getElementById("lbdate").innerHTML != document.getElementById("{!$Component.fm1.it1}").value) {
        document.getElementById("{!$Component.fm1.it1}").value = document.getElementById("lbdate").innerHTML;
        checkDate();
    }
}

var oldDate = "";

function checkDate() {
    var checks = document.getElementById("{!$Component.fm1.it1}").value;
    var TodayDate = new Date();
   
    if(((TodayDate.getMonth() + 1)-checks.split("/")[1] > 1)||(TodayDate.getFullYear() != checks.split("/")[0]))
    {
       alert("{!$Label.CanNotGetMoreInfo}");
       document.getElementById("{!$Component.fm1.it1}").value = oldDate;
    }
    else
    {
         var info = document.getElementById("{!$Component.fm1.it1}").value;
         var nowDate = new Date();
         var day;
         if (nowDate.getDate() < 10) {
             day = "0" + nowDate.getDate();
         } else {
             day = nowDate.getDate();
         }
         var str = nowDate.getFullYear() + "/" + (nowDate.getMonth() + 1) + "/" + day;
         if (info.localeCompare(str) > 0) {
             alert("{!$Label.DateError}");
             document.getElementById("{!$Component.fm1.it1}").value = oldDate;
         }
         else
         {
     
            var bool = window.confirm("{!$Label.DateChange}");
            if (bool) {

                    if (navigator.onLine == false) {
                        info = document.getElementById("{!$Component.fm1.ihOffLineData}").value;
                        noinfo = "]";
                        init(info, noinfo);
                    } else {
                        geteditinfo();
                        oldDate = document.getElementById("{!$Component.fm1.it1}").value;
                        window.setTimeout(test, 100);
                    }
                
            } else {
                document.getElementById("{!$Component.fm1.it1}").value = oldDate;
            }
        }
   }
}
//页面初始化
function test() {
    if (document.getElementById("{!$Component.fm1.ihMark}").value == "ok") {
        document.getElementById("{!$Component.fm1.ihMark}").value = "no";
        var info3 = document.getElementById("{!$Component.fm1.ihHad}").value;
        var info4 = document.getElementById("{!$Component.fm1.ihNo}").value;
        info = info3;
        noinfo = info4;
  
        document.getElementById("{!$Component.fm1.ihHad}").value = "";
        document.getElementById("{!$Component.fm1.ihNo}").value = "";
        init(info, noinfo);
    } else if (document.getElementById("{!$Component.fm1.ihMark}").value == "error") {
        document.getElementById("{!$Component.fm1.ihMark}").value = "no";
        alert("{!$Label.PagedataError}");
        
        info = "]";
        noinfo = "]";
        init(info, noinfo);
    } else {
        window.setTimeout(test, 100);
    }
}


g_Width = "150px";

function init(info, noinfo) {
    DataJSON = new String(info);
    DataObj = paserJSONtoDF(DataJSON);
    backs = JSON.parse("[]");
    draw(DataObj, "title");
    $("#cre").unbind("click");
    $("#cre").click(bindCre);
    drawNewByStr(noinfo);
    $("#sel").change(function(event) {
        console.log("loading is ready");
        var what = $(this).val();
        $("#draw").children().remove();
        draw(DataObj, what);
        var tds = $(".editable");
        tds.click(tdclick);
    });
    var tds = $(".editable");
    tds.click(tdclick);
    $("#ipt5").keydown(ipt5Val);
}

function bindCre(event) {
    $("#cre").unbind("click");
    doDataCol();
    document.getElementById("ipt1").className = "gray";
    document.getElementById("ipt3").className = "gray";
    document.getElementById("ipt4").className = "gray";
    document.getElementById("ipt5").className = "gray";
    $("#cre").bind("click", bindCre);
}

function sortPrice(a, b) {
    if (a.str3 < b.str3) {
        return 1;
    } else {
        if (a.str3 == b.str3) {
            return 0;
        } else {
            return -1;
        }
    }
    return a.str3 > b.str3 ? 1 :0;
}

function paserJSONtoDF(str) {
    var JSONStr = JSON.parse("[]");
    if (str != "]") {
        bindID = 0;
        var pjStr = JSON.parse(str);
        for (var tem in pjStr) {
            var i = JSONStr.length - 1;
            for (;i >= 0; i--) {
                if (JSONStr[i].title == pjStr[tem].title && JSONStr[i].df == pjStr[tem].str1 && JSONStr[i].name == pjStr[tem].str2) {
                    var sts = new String('{"type":"' + pjStr[tem].str3 + '","id":"' + pjStr[tem].name + '","price":"' + pjStr[tem].price + '","comment":"' + pjStr[tem].note + '","isnew":"' + pjStr[tem].isnew + '","bindID":"' + bindID + '"}');
                    bindID = bindID + 1;
                    var JSONTem = JSON.parse(sts);
                    JSONStr[i].detail.push(JSONTem);
                    break;
                }
            }
            if (i < 0) {
                var strTem = JSON.parse('{"title":"' + pjStr[tem].title + '","df":"' + pjStr[tem].str1 + '","name":"' + pjStr[tem].str2 + '","detail":[{"type":"' + pjStr[tem].str3 + '","id":"' + pjStr[tem].name + '","price":"' + pjStr[tem].price + '","comment":"' + pjStr[tem].note + '","isnew":"' + pjStr[tem].isnew + '","bindID":"' + bindID + '"}]}');
                bindID = bindID + 1;
                JSONStr.push(strTem);
            }
        }
    }
    return JSONStr;
}

function paserJSONtoStr(JSONObj) {
    var temObj = JSON.parse("[]");
    for (var i = 0; i < JSONObj.length; i++) {
        for (var j = 0; j < JSONObj[i].detail.length; j++) {
            var temStr = new String('{"title":"' + JSONObj[i].title + '","name":"' + JSONObj[i].detail[j].id + '","research":"","str1":"' + JSONObj[i].df + '","str2":"' + JSONObj[i].name + '","str3":"' + JSONObj[i].detail[j].type + '","price":"' + JSONObj[i].detail[j].price + '","note":"' + JSONObj[i].detail[j].comment + '","isnew":"' + JSONObj[i].detail[j].isnew + '"}');
            var tem = JSON.parse(temStr);
            temObj.push(tem);
        }
    }
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
        }
    }
}

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
                    
                    var tr = $('<tr id="' + tem.bindID + '" > <td >&nbsp;</td>  <td>' + (flag ? JSONTEMP[i].title : "&nbsp;") + '</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
                    $(list[k]).append(tr);
                } else {
                    
                    if ($(list[k]).children('tr').size() == 1) {
                        
                        var nameTem = $(list[k]).children('tr').children('td:eq(2)').text();
                        if (JSONTEMP[i].name < nameTem) {
                            var $trNode =  $(list[k]).children('tr:eq(0)');
                            var $text = $trNode.children('td:eq(0)').text();
                            $trNode.children('td:eq(1)').text('');
                            $trNode.children('td:eq(0)').text('');

                            var tr = $('<tr id="' + tem.bindID + '" > <td >'+$text+'</td>  <td>' + JSONTEMP[i].title + '</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
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
                                var $tdNode = $(list[k]).children('tr:eq('+s_idx+')').children('td:eq(1)');
                                $tdNode.text('');
                                var $text = $tdNode.parent().children('td:eq(0)').text();

                                var tr = $('<tr id="' + tem.bindID + '" > <td >'+$text+'</td>  <td>' + JSONTEMP[i].title + '</td>  <td>' + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + '</td> </tr>');
                                $tdNode.parent().children('td:eq(0)').text('');
                                $tdNode.parent().before(tr);
                            } else {
                                var $trNode = $(list[k]).children('tr:eq('+(whereToInsert+s_idx)+')');
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

        var head = $('<div id="" class="divTitle"><span>' + typeStr + '</span></div>');
        var table = $('<table class="dataTable" border="2px;"></table>');
        var th = $('<thead><tr> <td class="FistColHiden"> </td>  <td>{!$Label.Pagecolumn1}</td>  <td>{!$Label.Pagecolumn2}</td>  <td>{!$Label.Pagecolumn4}</td>  <td>{!$Label.Pagecolumn5}</td> </tr></thead>');
       
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
    var JSONTEMP = JSONStr;
    JSONTEMP.sort(sortPrice);
    var item = $("<div ></div>");
    var head = $('<div id="" class="divTitle"><span>{!$Label.Size}</span></div>');
    var table = $('<table class="dataTable"></table>');
    var th = $("<thead><tr> <td>{!$Label.Pagecolumn3}</td>  <td>{!$Label.Pagecolumn1}</td>  <td>{!$Label.Pagecolumn2}</td>  <td>{!$Label.Pagecolumn4}</td>  <td>{!$Label.Pagecolumn5}</td> </tr></thead>");
    var tb = $("<tbody></tbody>");
    console.log("*********************");
    var list = new Array();
    for (var i = 0; i < JSONTEMP.length; i++) {
        for (var j = 0; j < JSONTEMP[i].detail.length; j++) {
            var tem = JSONTEMP[i].detail[j];
            var k = 0;
            for (;k < list.length; k++) {
                var temStr = $(list[k]).attr("id");
                if (temStr == tem.type) {
                    break;
                }
            }
            if (k == list.length) {
                var group = $('<tbody id="' + tem.type + '"></tbody>');
                var tr = $('<tr id="' + tem.bindID + '"> <td>' + tem.type + "</td>  <td>" + JSONTEMP[i].title + "</td>  <td>" + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + "</td> </tr>");
                $(group).append(tr);
                list.push(group);
            } else {
                var flag = true;
                $(list[k]).children("tr").children("td:nth-child(2)").each(function(index, el) {
                    if ($(el).html() == JSONTEMP[i].title) {
                        flag = false;
                        return;
                    }
                });
                var tr = $('<tr id="' + tem.bindID + '" > <td >&nbsp;</td>  <td>' + (flag ? JSONTEMP[i].title :"&nbsp;") + "</td>  <td>" + JSONTEMP[i].name + '</td>  <td class="editable">' + tem.price + '</td>  <td class="editable">' + tem.comment + "</td> </tr>");
                $(list[k]).append(tr);
            }
        }
    }
    list.sort(sortByType);
    $(list).each(function(index, el) {
        $(tb).append($(el).children("tr"));
    });
    $(table).append(th);
    $(table).append(tb);
    $(item).append(head);
    $(item).append(table);
    $("#draw").append(item);
}

function drawTableByTitle(JSONStr) {
    var items = new Array();
    for (var i = 0; i < JSONStr.length; i++) {
        var j = 0;
        for (;j < items.length; j++) {
            if ($(items[j]).attr("id") == JSONStr[i].title) {
                break;
            }
        }
        if (j == items.length) {
            var table, head, item;
            table = $('<table class="dataTable" ></table>');
            var th = $("<thead><tr><td>{!$Label.DFName}</td><td>{!$Label.Pagecolumn2}</td><td>{!$Label.Pagecolumn3}</td><td>{!$Label.Pagecolumn4}</td><td>{!$Label.Pagecolumn5}</td></tr></thead>");
            var tb = $("<tbody></tbody>");
            table.append(th);
            table.append(tb);
            head = $('<div class="divTitle"><span>' + JSONStr[i].title + "</span></div>");
            item = $('<div class="item" id=' + JSONStr[i].title + "></div>");
            $(item).append(head);
            $(item).append(table);
            items.push(item);
        }
        var tds = $('<tr id="' + JSONStr[i].detail[0].bindID + '"> <td>' + JSONStr[i].df + "</td>  <td>" + JSONStr[i].name + "</td>  <td>" + JSONStr[i].detail[0].type + '</td>  <td class="editable">' + JSONStr[i].detail[0].price + '</td>  <td class="editable">' + JSONStr[i].detail[0].comment + "</td> </tr>");
        $(items[j]).children("table").children("tbody").append(tds);
        for (var k = 1; k < JSONStr[i].detail.length; k++) {
            tds = $('<tr id="' + JSONStr[i].detail[k].bindID + '"> <td> &nbsp;</td>  <td>&nbsp;</td>  <td>' + JSONStr[i].detail[k].type + '</td>  <td class="editable">' + JSONStr[i].detail[k].price + '</td>  <td class="editable">' + JSONStr[i].detail[k].comment + "</td> </tr>");
            $(items[j]).children("table").children("tbody").append(tds);
        }
    }
    for (var w = 0; w < items.length; w++) {
        items[w].children('table').attr('width', '100%');
        var $trs =  items[w].children('table').find('tr');
        $trs.children('td:nth-child(1)').attr('width', g_Width);
        $trs.children('td:nth-child(2)').attr('width', '40%');
        $trs.children('td:nth-child(3)').attr('width', g_Width);
        $trs.children('td:nth-child(4)').attr('width', g_Width);
        $trs.children('td:nth-child(5)').attr('width', '30%');
        $("#draw").append(items[w]);
    }
}

function drawTableByDF(JSONStr) {
    var items = new Array();
    for (var i = 0; i < JSONStr.length; i++) {
        var j = 0;
        for (;j < items.length; j++) {
            if ($(items[j]).attr("id") == JSONStr[i].df) {
                break;
            }
        }
        if (j == items.length) {
            var table, head, item;
            table = $('<table class="dataTable"></table>');
            var th = $("<thead><tr><td>{!$Label.Pagecolumn1}</td><td>{!$Label.Pagecolumn2}</td><td>{!$Label.Pagecolumn3}</td><td>{!$Label.Pagecolumn4}</td><td>{!$Label.Pagecolumn5}</td></tr></thead>");
            var tb = $("<tbody></tbody>");
            table.append(th);
            table.append(tb);
            head = $('<div class="divTitle"><span>' + JSONStr[i].df + "</span></div>");
            item = $('<div class="item" id=' + JSONStr[i].df + "></div>");
            $(item).append(head);
            $(item).append(table);
            items.push(item);
        }
        var tds = $('<tr id="' + JSONStr[i].detail[0].bindID + '"> <td>' + JSONStr[i].title + "</td>  <td>" + JSONStr[i].name + "</td>  <td>" + JSONStr[i].detail[0].type + '</td>  <td class="editable">' + JSONStr[i].detail[0].price + '</td>  <td class="editable">' + JSONStr[i].detail[0].comment + "</td> </tr>");
        $(items[j]).children("table").children("tbody").append(tds);
        for (var k = 1; k < JSONStr[i].detail.length; k++) {
            tds = $('<tr id="' + JSONStr[i].detail[k].bindID + '"> <td >&nbsp;</td>  <td >&nbsp;</td>  <td>' + JSONStr[i].detail[k].type + '</td>  <td class="editable">' + JSONStr[i].detail[k].price + '</td>  <td class="editable">' + JSONStr[i].detail[k].comment + "</td> </tr>");
            $(items[j]).children("table").children("tbody").append(tds);
        }
    }
    for (var w = 0; w < items.length; w++) {
        items[w].children('table').attr('width', '100%');
        var $trs =  items[w].children('table').find('tr');
        $trs.children('td:nth-child(1)').attr('width', g_Width);
        $trs.children('td:nth-child(2)').attr('width', '40%');
        $trs.children('td:nth-child(3)').attr('width', g_Width);
        $trs.children('td:nth-child(4)').attr('width', g_Width);
        $trs.children('td:nth-child(5)').attr('width', '30%');
        $("#draw").append(items[w]);
    }
}

function bindData(JSONBind) {
    for (var i = 0; i < DataObj.length; i++) {
        if (DataObj[i].title == JSONBind.title && DataObj[i].str1 == DataObj[i].str1 && DataObj[i].str2 == JSONBind.str2 && DataObj[i].str3 == JSONBind.str3) {
            DataObj[i].price = JSONBind.price;
            DataObj[i].note = JSONBind.note;
            break;
        }
    }
    DataJSON = paserJSONtoStr(DataObj);
}

function drawNew(tem) {
    for (var i = 0; i < tem.length; i++) {
        var newTr = $("<tr id='" + tem[i].bindID + "' ><td class='editNew'>" + tem[i].title + "</td><td class='editNew'>" + tem[i].str1 + "</td><td class='editNew'>" + tem[i].str2 + "</td><td class='editNew'>" + tem[i].str3 + "</td> <td class='editNew'>" + tem[i].price + "</td> <td class='editNew'>" + tem[i].note + "</td></tr>");
        $("#newDraw").children("tbody").append($(newTr));
    }
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
        }
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
    var at = $(a).children("tr:eq(0)").children("td:eq(0)").text();
    var bt = $(b).children("tr:eq(0)").children("td:eq(0)").text();
    if (at < bt) {
        return 1;
    } else {
        if (at == bt) {
            return 0;
        } else {
            return -1;
        }
    }
}

function tdclick() {
    var td = $(this);
    var text = td.text();
    td.html("");
    var input = $("<input>");
    input.attr("value", text);
    input.attr('maxlength', '50');
    input.blur(function(event) {
        var inputnode = $(this);
        var inputtext = inputnode.val();
        var tdNode = inputnode.parent();
        tdNode.html(inputtext);
        tdNode.click(tdclick);
        var bindID = tdNode.parent("tr").attr("id");
        var bindPrice = tdNode.parent("tr").children("td:eq(3)").html();
        var bindComment = tdNode.parent("tr").children("td:eq(4)").html();
        if (isNum(bindPrice)) {
            if (noteIsLE(bindComment)) {
                $alertContainer = $("#alertContainer");
                if ($alertContainer) {
                    $alertContainer.hide();
                }
                for (var i = 0; i < DataObj.length; i++) {
                    for (var j = 0; j < DataObj[i].detail.length; j++) {
                        if (bindID == DataObj[i].detail[j].bindID) {
                            DataObj[i].detail[j].price = bindPrice;
                            DataObj[i].detail[j].comment = bindComment;
                            break;
                        }
                    }
                }
            } else {
                tdNode.parent("tr").children("td:eq(4)").alert("{!$Label.Long}", {
                    "focus":true,
                    "alertClass":"default",
                    "position":"top"
                });
            }
        } else {
            tdNode.parent("tr").children("td:eq(3)").alert("{!$Label.NumberLimit}", {
                "focus":true,
                "alertClass":"default",
                "position":"top"
            });
        }
    });
    var inputdom = input[0];
    td.append(input);
    if (td.get(0) == td.parent("tr").children("td:eq(3)").get(0)) {
        input.keydown(ipt5Val);
        td.children("input").attr("type", "number");
         
    }
    inputdom.select();
    td.unbind("click");
}

function newClick() {
    var td = $(this);
    var text = td.text();
    td.html("");
    var input = $("<input>");
    input.attr("value", text);
    input.attr('maxlength', '50');
    input.blur(function(event) {
        var inputnode = $(this);
        var inputtext = inputnode.val();
        var tdNode = inputnode.parent();
        tdNode.html(inputtext);
        tdNode.click(newClick);
        var bindID = tdNode.parent("tr").attr("id");
        var title = tdNode.parent("tr").children("td:eq(0)").html();
        var str1 = tdNode.parent("tr").children("td:eq(1)").html();
        var str2 = tdNode.parent("tr").children("td:eq(2)").html();
        var str3 = tdNode.parent("tr").children("td:eq(3)").html();
        var price = tdNode.parent("tr").children("td:eq(4)").html();
        var note = tdNode.parent("tr").children("td:eq(5)").html();
        if (isNum(price)) {
            if (noteIsLE(note)) {
                $alertContainer = $("#alertContainer");
                if ($alertContainer) {
                    $alertContainer.hide();
                }
                for (var i = 0; i < backs.length; i++) {
                    if (backs[i].bindID == bindID) {
                        if ($.trim(title + str1 + str2 + str3 + price + note) != $.trim(inputtext)) {
                            var str = new String('{"title":"' + title + '","name":"' + backs[i].name + '","research":"","str1":"' + str1 + '","str2":"' + str2 + '","str3":"' + str3 + '","price":"' + price + '","note":"' + note + '","isnew":"true","bindID":"' + bindID + '"}');
                            backs[i] = JSON.parse(str);
                        } else {
                            var str = new String('{"title":"","name":"' + backs[i].name + '","research":"","str1":"","str2":"","str3":"","price":"","note":"","isnew":"true","bindID":"' + bindID + '"}');
                            backs[i] = JSON.parse(str);
                            tdNode.parent().remove();
                        }
                        break;
                    }
                }
            } else {
                tdNode.parent().children("td:eq()").alert("{!$Label.Long}", {
                    "position":"top",
                    "alertClass":"default",
                    "focus":true
                });
            }
        } else {
            tdNode.parent().children("td:eq()").alert("{!$Label.NumberLimit}", {
                "position":"top",
                "alertClass":"default",
                "focus":true
            });
        }
    });
    td.append(input);
    if (td.get(0) == td.parent("tr").children("td:eq(4)").get(0)) {
        input.keydown(ipt5Val);
        td.children("input").attr("type", "number");
       
    }
    var inputdom = input.get(0);
    input.css("width","120px");

    inputdom.select();
    td.unbind("click");
}

function ipt5Val(event) {
    var $that = $(this);
    var keyCode = event.which;
    if (keyCode >= 65 && keyCode <= 90) {
        return false;
    } else {
        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)) {
            var str = $that.val();
            if (str.length >= 8) {
                return false;
            }
        };

    };

}


var saveMark = true;
function doDataCol(isSave) {
    var tem = dataCol(isSave);
    if (tem) {
        if (tem.title != "{!$Label.Must}") {
            if (tem.str2 != "{!$Label.Must}") {
                if (tem.str3 != "{!$Label.Must}") {
                    if (tem.price != "") {
                        if (isNum(tem.price)) {
                            if (noteIsLE(tem.note)) {
                                clearIpt();
                                backs.push(tem);
                                drawNew(JSON.parse("[" + JSON.stringify(tem) + "]"));
                                saveMark = true;
                            } else if (isSave) {saveMark = false;} else {
                                alert("{!$Label.Long}");
                                
                            }
                        } else if (isSave) {saveMark = false;} else {
                           alert("{!$Label.NumberLimit}");
                           
                        }
                    } else if(isSave){saveMark = false;}else {
                        alert("{!$Label.Pagepricerequired}");
                       
                    }
                } else if(isSave){saveMark = false;}else {
                    alert("{!$Label.PagesizeRequired}");
                    saveMark = false;
                }
            } else if(isSave){saveMark = false;}else {
                alert("{!$Label.Pagedfrequired}");
                
            }
        } else if (isSave) {saveMark = false;} else {
            alert("{!$Label.Pagemakerrequired}");
           
        }
    }
    if(isSave&&tem.title=="{!$Label.Must}"&&tem.str1 == ""&&tem.str2 =="{!$Label.Must}"&&tem.str3 == "{!$Label.Must}" && tem.price == "" && tem.note == "")
    {
      saveMark = true;
    }
    var ted = new Array();
    for (var i = 0; i < backs.length; i++) {
        ted.push(JSON.parse('{"title":"' + backs[i].title + '","name":"' + backs[i].name + '","research":"","str1":"' + backs[i].str1 + '","str2":"' + backs[i].str2 + '","str3":"' + backs[i].str3 + '","price":"' + backs[i].price + '","note":"' + backs[i].note + '","isnew":"true"}'));
    }
    return ted;
}
ExistDataMark = true;
function dataCol(isSave) {
    var bindID = $("#newDraw tr:last").attr("id");
    if (!bindID) {
        bindID = 0;
    } else {
        bindID = bindID - 1;
    }
    var title = $("#ipt1").val();
    var str1 = $("#ipt2").val();
    var str2 = $("#ipt3").val();
    var str3 = $("#ipt4").val();
    var price = $("#ipt5").val();
    var note = $("#ipt6").val();
    var i = 0;
    if (title + str2 + str3 + price + note != "") {
        for (;i < backs.length; i++) {
            if (title == backs[i].title && str2 == backs[i].str2 && str3 == backs[i].str3) {
                if (isSave) {alert("{!$Label.ExistData}");ExistDataMark = false;break;} else {
                    alert("{!$Label.ExistData}");
                    break;
                }
            }
            if(backs[i].title == ""&&backs[i].str1 == ""&&backs[i].str2==""&&backs[i].str3=="")
            {}
            else
            {
                if(backs[i].price == "" ||backs[i].price == null||backs[i].price == "null")
                {
                   alert("{!$Label.CheckBlank}");
                   break;
                }
            }
        }
        var DataTem = JSON.parse(DataJSON);
        var j = 0;
        for (;j < DataTem.length; j++) {
            if (title == DataTem[j].title && str2 == DataTem[j].str2 && str3 == DataTem[j].str3) {
                if (isSave) {alert("{!$Label.ExistData}");ExistDataMark = false;break;} else {
                    alert("{!$Label.ExistData}");
                    break;
                }
            }
          
        }
        if (i == backs.length && j == DataTem.length) {
            ExistDataMark = true;
            var str = new String('{"title":"' + title + '","name":"","research":"","str1":"' + str1 + '","str2":"' + str2 + '","str3":"' + str3 + '","price":"' + price + '","note":"' + note + '","isnew":"true","bindID":"' + bindID + '"}');
            return JSON.parse(str);
        }
    }
}

function data() {
    var str = "";
    var newOne = doDataCol(true);
    var oldOne = JSON.parse(paserJSONtoStr(DataObj));
    var ret = oldOne.concat(newOne);
    str = JSON.stringify(ret);
    return str;
}

function clearIpt() {
    $("#ipt1").val("{!$Label.Must}");
    $("#ipt2").val("");
    $("#ipt3").val("{!$Label.Must}");
    $("#ipt4").val("{!$Label.Must}");
    $("#ipt5").val("{!$Label.Must}");
    $("#ipt6").val("");
    document.getElementById("ipt1").className = "gray";
    document.getElementById("ipt3").className = "gray";
    document.getElementById("ipt4").className = "gray";
    document.getElementById("ipt5").className = "gray";
}

function isNum(str) {
    var reg = /^[\d]{0,8}$/g;
    return reg.test(str);
}

function noteIsLE(str) {
    var reg = /^.{0,50}$/g;
    return reg.test(str);
}

function ValidateLS(LSStr, NewStr) {
    var LSObj = JSON.parse(LSStr);
    var NewObj = JSON.parse(NewStr);
    LSObj.push(NewObj);
    return JSON.stringify(LSObj);
}

function ReturnLink() {
    var bool = window.confirm("{!$Label.DateChange}");
    if (bool) {
        if (navigator.onLine == false) {} else {
            if (localStorage.OffLineValue != null && localStorage.OffLineValue != "") {
                alert("{!$Label.Pagesynchronous}");
                document.getElementById("{!$Component.fm1.ih3}").value = localStorage.OffLineValue;
                savelocal();
                window.setTimeout(checkLocal, 100);
            }
        }
        window.location.href = "/apex/CustomerChoice";
    }
}