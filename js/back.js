
    <script>

        backs = JSON.parse('[]');
        
        $(document).ready(function() {
                                              
         //new date piker
            $( ".datePicker1" ).datepicker({
                  dateFormat:"yy/mm/dd"     
                  });
                                                
            var DateNow = new Date();
            if(DateNow.getDate()<10)
            {
                 var DateStr = DateNow.getFullYear() +"/"+ (DateNow.getMonth()+1)+"/0"+DateNow.getDate();
                 document.getElementById('{!$Component.fm1.it1}').value = DateStr ;
                                          
                 document.getElementById("lbdate").innerHTML = DateStr;
            }
            else
            {
                                       
                  var DateStr = DateNow.getFullYear() +"/"+ (DateNow.getMonth()+1)+"/"+DateNow.getDate();
                  document.getElementById('{!$Component.fm1.it1}').value = DateStr ;
                  document.getElementById("lbdate").innerHTML = DateStr;
                                       
            }
         //
            document.getElementById('{!$Component.fm1.txtacc}').innerHTML = localStorage.pramname;
                   
            document.getElementById('{!$Component.fm1.txtacc}').value= localStorage.pramname;
                    
            document.getElementById('{!$Component.fm1.ihacc}').value = localStorage.pramid;
                   
            if(navigator.onLine == false)
            {            
                 var DateNow = new Date();
                 if((DateNow.getMonth()+1)!= localStorage.CacheDateMonth)
                 {
                      alert("need network to uodate cache");
                 }
                 else
                 {
                      if((DateNow.getDate()-localStorage.CacheDateDay)>10)
                      {
                          alert("need network to update cache");
                      }
                      else
                      {
                          //alert("No network!");
                                
                           info = document.getElementById('{!$Component.fm1.ihOffLineData}').value;
                             
                           noinfo = "]";
                       }
                   }       
                    
             }
             else
             {    
                 var cacheDateNow = new Date();
                 localStorage.CacheDateMonth = cacheDateNow.getMonth()+1;
                 localStorage.CacheDateDay = cacheDateNow.getDate();
                                                      
                 geteditinfo();                      
                 window.setTimeout(test,1000);  
                 info =  document.getElementById('{!$Component.fm1.ih1}').value;                             
                 noinfo = document.getElementById('{!$Component.fm1.ihNo}').value;                                                         
                
                if(localStorage.OffLineValue != null && localStorage.OffLineValue != "")
                {
                    alert("There is localStorage.Now we let them synchronous");
                                                     
                    document.getElementById('{!$Component.fm1.ih3}').value = localStorage.OffLineValue;
                                                    
                    savelocal();
                    window.setTimeout(checkLocal,1000);    
                                              
                }                                                  
            }                           
                                   
            init(info,noinfo);                       
            oldDate = document.getElementById('{!$Component.fm1.it1}').value;
                              
            window.setInterval(checkNet,2000);
        });
        OnLineAlert = true;
        OffLineAlert = true;
        function checkNet()
        {
           if(navigator.onLine == false&&OffLineAlert)
           { 
                var DateNow = new Date();
                if((DateNow.getMonth()+1)!= localStorage.CacheDateMonth)
                {
                     alert("need network");
                }
                else
                {
                     if((DateNow.getDate()-localStorage.CacheDateDay)>10)
                     {
                          alert("need network");
                     }
                     else
                     {
                          //alert("Offline!");
                          OffLineAlert = false;
                          OnLineAlert = true;
                     }
                }
           }
           if(navigator.onLine == true&&OnLineAlert)
           {
             // alert("Online!");
              
              var cacheDateNow = new Date();
              localStorage.CacheDateMonth = cacheDateNow.getMonth()+1;
              localStorage.CacheDateDay = cacheDateNow.getDate();
              
              
              OnLineAlert = false;
              OffLineAlert = true;
              
              if(localStorage.OffLineValue != null && localStorage.OffLineValue != "")
              {
                    alert("There is localStorage.Now we let them synchronous");
                                 
                    document.getElementById('{!$Component.fm1.ih3}').value = localStorage.OffLineValue;
                               
                    savelocal();
                    window.setTimeout(checkLocal,1000);    
                              
               }       
           }
        }
        
        function checkLocal()
        {
               if(document.getElementById('{!$Component.fm1.ihMarkLocal}').value == "ok")
               {               
                   document.getElementById('{!$Component.fm1.ihMarkLocal}').value = "no";           
                   localStorage.OffLineValue = "";     
                 
               }
               else if(document.getElementById('{!$Component.fm1.ihMarkLocal}').value == "error")
               {   
                   document.getElementById('{!$Component.fm1.ihMarkLocal}').value = "no";
                   alert("Data is Format Error!");
               }
               else
               {
                   window.setTimeout(checkLocal,1000);
               }
        }

                function getinfo()
                {
                    var str = "";
                    try{    
                            var xhr = new XMLHttpRequest();
                            
                            xhr.open( 'GET', "/apex/CheckLogin", false );
                            
                            xhr.send(null);
                           
                            if (xhr.readyState === 4 && xhr.status === 200){
                            
                                str = "ON LINE NOW";
                            } else {
                                str = "OFF LINE NOW";
                            }
                        }catch( ex ){
                    
                        str =  "OFF LINE NOW! (LOGOUT)";                
                    }
                     //saveButton
                     document.getElementById('saveButton').disabled = true;
                     if(navigator.onLine == false)
                     {
                         alert("Data is store in local ,next if there is network ,data will be store to the database");
                         addlocaldata();
                         
                          window.location.href="/apex/CustomerChoice";    
                     }
                     else
                     {
                         if(str=="ON LINE NOW")
                         {                      
                               var oneinfo1 =data();    
                               //alert(oneinfo1);
                               document.getElementById('{!$Component.fm1.ih3}').value = oneinfo1 ;
                      
                               getinfo1();
                              
                               window.setTimeout(checkSave,1000);    
                             
                          
                         }
                         else
                         {
                             alert("OFF LINE NOW! (LOGOUT) You need login");
                             window.location.href='https://test.salesforce.com';
                         }     
                     }
                              
                } 
                function checkSave()
                {
                   if(document.getElementById('{!$Component.fm1.ihMarkSave}').value == "ok")
                   {               
                       document.getElementById('{!$Component.fm1.ihMarkSave}').value = "no"; 
                       window.location.href="/apex/CustomerChoice";                                    
                       
                   }
                   else if(document.getElementById('{!$Component.fm1.ihMarkSave}').value == "error")
                   {   
                       document.getElementById('{!$Component.fm1.ihMarkSave}').value = "no";
                       //alert("Add to local!");
                       //addlocaldata(); 
                       alert("Please Check Data Or Check Network!");
                       document.getElementById('saveButton').disabled = false;
                   }
                   else
                   {
                       window.setTimeout(checkSave,1000);
                   }
                }
                
    function addlocaldata()
    {
           var oneinfo =data();    
          
           var acc = document.getElementById('{!$Component.fm1.ihacc}').value;
      
           var date = document.getElementById('{!$Component.fm1.it1}').value;
           
           oneinfo = '[{"account":"'+acc+'","adata":"'+date+'","pricedetail":'+oneinfo+'}]';                            

           if(localStorage.OffLineValue == null || localStorage.OffLineValue == "")
            {
                localStorage.OffLineValue = oneinfo;
            }
            else
            {        
                 tempinfo = localStorage.OffLineValue;
                  alert(tempinfo);    
                   alert(oneinfo );    
                 var offinfo = ValidateLS(tempinfo,oneinfo); 
                 
                 localStorage.OffLineValue = offinfo;                
            }       
             alert(localStorage.OffLineValue);                      
    }
     function NotAllowed()
     {
         document.getElementById('{!$Component.fm1.it1}').value = oldDate;   
     }
     function DateIn()
     {
         if(document.getElementById("lbdate").innerHTML != document.getElementById('{!$Component.fm1.it1}').value)
         {
            document.getElementById('{!$Component.fm1.it1}').value  = document.getElementById("lbdate").innerHTML;
            checkDate();
         }
     }
   
    var oldDate = '';                   
    function checkDate()
    {
        
        var bool = window.confirm("Data will disappear, leaving you sure?");
        if(bool)
        {
           var info = document.getElementById('{!$Component.fm1.it1}').value;
           var nowDate = new Date();
           var day;
                if(nowDate.getDate()<10)
                {           
                  day = "0"+nowDate.getDate();
                }
                else
                {
                 day = nowDate.getDate();
                }
                var str = nowDate.getFullYear()+"/"+(nowDate.getMonth() + 1)+"/"+day;         
          
             if(info.localeCompare(str)>0)
             {
               alert("Date can not be after today");
               document.getElementById('{!$Component.fm1.it1}').value = oldDate;      
             } 
             else
             {  
                if(navigator.onLine == false)
                {
                     info = document.getElementById('{!$Component.fm1.ihOffLineData}').value;
                             
                     noinfo = "]";
                     
                     init(info,noinfo);
                }
                else
                {        
                    geteditinfo();
                    oldDate =  document.getElementById('{!$Component.fm1.it1}').value;
                    window.setTimeout(test,1000);     
                }     
             }
         }
         else
         {
            document.getElementById('{!$Component.fm1.it1}').value = oldDate;
         }
    }

    function test()
    {    
           if(document.getElementById('{!$Component.fm1.ihMark}').value == "ok")
           {               
               document.getElementById('{!$Component.fm1.ihMark}').value = "no";
           
                var info3 = document.getElementById('{!$Component.fm1.ihHad}').value;
                var info4 = document.getElementById('{!$Component.fm1.ihNo}').value;
           
                 info =  info3;                                
                 noinfo = info4

                 document.getElementById('{!$Component.fm1.ihHad}').value= "";
                 document.getElementById('{!$Component.fm1.ihNo}').value = "";
                 
              init(info,noinfo);
             
           }
           else if(document.getElementById('{!$Component.fm1.ihMark}').value == "error")
           {   
               document.getElementById('{!$Component.fm1.ihMark}').value = "no";
               alert("Data Format Had Error!");
           }
           else
           {
               window.setTimeout(test,1000);
           }
         
    }
//init

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
    
}

function bindCre(event){
    $("#cre").unbind('click');
    doDataCol();
    document.getElementById("ipt1").className="gray";
    document.getElementById("ipt3").className="gray";
    document.getElementById("ipt4").className="gray";
    document.getElementById("ipt5").className="gray";
   
    $("#cre").bind('click',bindCre);
}
//drawTable




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
    return (a.str3 > b.str3) ? 1 : 0;

   
}


function paserJSONtoDF(str) {
    var JSONStr = JSON.parse('[]');
    if(str != "]"){
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
            drawTableByType(JSONStr);
            console.log("****drawByType****");
        } else {
            
            console.log("Error Input : What in draw");
        };
    }
    
    
}



function drawTableByType(JSONStr) {
   var JSONTEMP = JSONStr;
   JSONTEMP.sort(sortPrice);
    
    
 
    var item = $('<div ></div>');
    var head = $('<div id="" class="divTitle"><span>サイズ</span></div>');
    var table = $('<table class="dataTable"></table>');
   // var th = $('<thead><tr> <td>タイヤサイズ</td>  <td>メーカー名</td>  <td>ブランド名</td>  <td>販売価格（4本税込）</td>  <td>備考</td> </tr></thead>');
    var th = $('<thead><tr> <td>{!$Label.column3}</td>  <td>{!$Label.column1}</td>  <td>{!$Label.column2}</td>  <td>{!$Label.column4}</td>  <td>{!$Label.column5}</td> </tr></thead>');
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
                        return;
                    }
                });
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
            table = $('<table class="dataTable" ></table>');
           // var th = $('<thead><tr><td></td><td>ブランド名</td><td>タイヤサイズ</td><td>販売価格（4本税込）</td><td>備考</td></tr></thead>');
           //{!$Label.column1}
            var th = $('<thead><tr><td></td><td>{!$Label.column2}</td><td>{!$Label.column3}</td><td>{!$Label.column4}</td><td>{!$Label.column5}</td></tr></thead>');
            var tb = $('<tbody></tbody>');
            table.append(th);
            table.append(tb);
            head = $('<div class="divTitle"><span>' + JSONStr[i].title + '</span></div>');
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
            tds = $('<tr id="' + JSONStr[i].detail[k].bindID + '"> <td> &nbsp;</td>  <td>&nbsp;</td>  <td>' + JSONStr[i].detail[k].type + '</td>  <td class="editable">' + JSONStr[i].detail[k].price + '</td>  <td class="editable">' + JSONStr[i].detail[k].comment + '</td> </tr>');
            $(items[j]).children('table').children('tbody').append(tds);
        };

    };

    for (var w = 0; w < items.length; w++) {
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
            table = $('<table class="dataTable"></table>');
           // var th = $('<thead><tr><td>メーカー名</td><td>ブランド名</td><td>タイヤサイズ</td><td>販売価格（4本税込）</td><td>備考</td></tr></thead>');
            var th = $('<thead><tr><td>{!$Label.column1}</td><td>{!$Label.column2}</td><td>{!$Label.column3}</td><td>{!$Label.column4}</td><td>{!$Label.column5}</td></tr></thead>');
            var tb = $('<tbody></tbody>');
            table.append(th);
            table.append(tb);
            head = $('<div class="divTitle"><span>' + JSONStr[i].df + '</span></div>');
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
            bindID = bindID -1;
            var sts = new String('{"title":"' + JSONNew[t].title + '","name":"' + JSONNew[t].name + '","research":"","str1":"' + JSONNew[t].str1 + '","str2":"' + JSONNew[t].str2 + '","str3":"' + JSONNew[t].str3 + '","price":"' + JSONNew[t].price + '","note":"' + JSONNew[t].note + '","isnew":"true","bindID":"' + bindID + '"}');
            backs.push(JSON.parse(sts));
        }
        drawNew(backs);
    } else {
        $("#newDraw").children().children("tr:gt(1)").remove();
    }

}
function sortByType(a,b){
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

//editable
//td被点击的事件  
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

        if (isNum(bindPrice)) {
            if (noteIsLE(bindComment)) {

                $alertContainer = $('#alertContainer');
                if ($alertContainer) {
                    $alertContainer.hide();
                };
                
                for (var i = 0; i < DataObj.length; i++) {
                    for (var j = 0; j < DataObj[i].detail.length; j++) {
                        if (bindID == DataObj[i].detail[j].bindID) {
                            DataObj[i].detail[j].price = bindPrice;
                            DataObj[i].detail[j].comment = bindComment;
                            break;
                        };
                    };
                };
            } else {
                tdNode.parent('tr').children('td:eq(4)').alert("This remark is too long!", {
                    focus: true,
                    alertClass: 'default',
                    position: 'top'
                });
            };
        } else {
            tdNode.parent('tr').children('td:eq(3)').alert("This price is not a number or too long!", {
                focus: true,
                alertClass: 'default',
                position: 'top'
            });
        }
    });
    var inputdom = input[0];

    //5 将文本内容加入td  
    td.append(input); //也可input.appendto(td)  
    //5.5让文本框文字被高亮选中  
    if(td.get(0) == td.parent('tr').children('td:eq(3)').get(0)){
        td.children('input').attr('type', 'number');
    }
    //需要将jquery的对象转换成dom对象  

    inputdom.select();
    //6 需要清除td上的点击事件  
    td.unbind("click");
}



function newClick() {

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
        tdNode.click(newClick);
        var bindID = tdNode.parent('tr').attr('id');
        var title = tdNode.parent('tr').children('td:eq(0)').html();
        var str1 = tdNode.parent('tr').children('td:eq(1)').html();
        var str2 = tdNode.parent('tr').children('td:eq(2)').html();
        var str3 = tdNode.parent('tr').children('td:eq(3)').html();
        var price = tdNode.parent('tr').children('td:eq(4)').html();
        var note = tdNode.parent('tr').children('td:eq(5)').html();

        if (isNum(price)) {
            if (noteIsLE(note)) {
                $alertContainer = $('#alertContainer');
                if ($alertContainer) {
                    $alertContainer.hide();
                };

                
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
                    };
                };

            } else {

                tdNode.parent().children('td:eq()').alert("This remark is too long!", {
                    position: 'top',
                    alertClass: 'default',
                    focus: true
                });
            };
        } else {

            tdNode.parent().children('td:eq()').alert("This price is not a number or too long!", {
                position: 'top',
                alertClass: 'default',
                focus: true
            });
        }


    });
    //5 将文本内容加入td  
    td.append(input); //也可input.appendto(td) 
    if(td.get(0) == td.parent('tr').children('td:eq(4)').get(0)){
        td.children('input').attr('type', 'number');
    } 
    //5.5让文本框文字被高亮选中  
    //需要将jquery的对象转换成dom对象  
    var inputdom = input.get(0);
    inputdom.select();
    //6 需要清除td上的点击事件  
    td.unbind("click");
}
//data


function doDataCol(isSave) {
    var tem = dataCol(isSave);

   if (tem) {
        if (tem.title != "必須") {
            if (tem.str2 != "必須") {
                if (tem.str3 != "必須") {
                    if (tem.price != "必須") {
                        
                        if (isNum(tem.price)) {
                            if (noteIsLE(tem.note)) {
                                clearIpt();
                                backs.push(tem);
                                drawNew(JSON.parse("[" + JSON.stringify(tem) + "]"));
                            } else if (isSave) {} else {
                                alert("This remark is too long!");
                            };
                        } else if (isSave) {} else {
                            alert("This price is not a number or too long!");
                        }

                    } else {
                        alert('価格（4本税込）is required');
                    };
                } else {
                    alert('サイズ is required');
                };
            } else {

                alert('ブランド is required')
            };


        } else if (isSave) {} else {
            alert("メーカー名 is required!");
        }
    }

    var ted = new Array();
    for (var i = 0; i < backs.length; i++) {
        ted.push(JSON.parse('{"title":"' + backs[i].title + '","name":"' + backs[i].name + '","research":"","str1":"' + backs[i].str1 + '","str2":"' + backs[i].str2 + '","str3":"' + backs[i].str3 + '","price":"' + backs[i].price + '","note":"' + backs[i].note + '","isnew":"true"}'));
    };

    return ted;
}
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

        for (; i < backs.length; i++) {
            if (title == backs[i].title && str2 == backs[i].str2 && str3 == backs[i].str3) {
                if (isSave) {

                } else {
                    alert("input error: data has existed in new");
                    break;
                };

            }
        };
        var DataTem = JSON.parse(DataJSON);
        var j = 0;
        for (; j < DataTem.length; j++) {
            if (title == DataTem[j].title && str2 == DataTem[j].str2 && str3 == DataTem[j].str3) {
                if (isSave) {

                } else {
                    alert("input error: data has existed in old");
                    break;
                };
            };
        };
        if (i == backs.length && j == DataTem.length) {
            var str = new String('{"title":"' + title + '","name":"","research":"","str1":"' + str1 + '","str2":"' + str2 + '","str3":"' + str3 + '","price":"' + price + '","note":"' + note + '","isnew":"true","bindID":"' + bindID + '"}');
            return JSON.parse(str);
        };
    };
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
    
    document.getElementById("ipt1").className="gray";
    document.getElementById("ipt3").className="gray";
    document.getElementById("ipt4").className="gray";
    document.getElementById("ipt5").className="gray";
}

//validate.js validate all the param
function isNum(str){
    var reg = /^[\d]{0,5}$/g  ;
    return reg.test(str);
}
function noteIsLE(str){
    var reg = /^.{0,50}$/g;
    return reg.test(str);
}

//return New leggle JSON
function ValidateLS(LSStr,NewStr){
    var LSObj = JSON.parse(LSStr);
    var NewObj = JSON.parse(NewStr);
 /*   var i = 0;
    for (; i < LSObj.length; i++) {
        if (LSObj[i].account == NewObj.account && LSObj[i].adata == NewObj.adata) {
            LSObj.splice(i,1,NewObj);
            break;
        };
    };
    if (i == LSObj.length) {*/
        LSObj.push(NewObj);
   //     alert(JSON.stringify(LSObj));
   // };
    return JSON.stringify(LSObj);
}




function ReturnLink()
{

        if(navigator.onLine == false)
        {
           
        }
        else
        {
             if(localStorage.OffLineValue != null && localStorage.OffLineValue != "")
             {
                 alert("There is localStorage.Now we let them synchronous");
                                     
                 document.getElementById('{!$Component.fm1.ih3}').value = localStorage.OffLineValue;                                                                    
                                       
                 savelocal();
                                       
                 window.setTimeout(checkLocal,1000);    
                                  
             }   
           
       }
       window.location.href="/apex/CustomerChoice";
}
</script> 