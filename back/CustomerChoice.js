
        var jsonStr;
        var objs;

        $(document).ready(function() {                  
             
   //         $(".divTop").pin({
   //             containerSelector:".div1"
   //         });
              

             if(navigator.onLine == false)
             {            
                  var DateNow = new Date();
                  if((DateNow.getMonth()+1)!= localStorage.CacheDateMonth)
                  {
                      var d1 = document.getElementById("div1");
                      var d2 = document.getElementById("div2");
                                    
                      d1.style.display= "block";
                      d2.style.display= "none";
                  }
                  else
                  {
                     if((DateNow.getDate()-localStorage.CacheDateDay)>parseInt("{!$Label.PageCacheDate}"))
                     {
                         var d1 = document.getElementById("div1");
                         var d2 = document.getElementById("div2");
                                    
                         d1.style.display= "block";
                         d2.style.display= "none";
                      }
                      else
                      {  
                        // window.setTimeout(initoffline,100);  
                                
                         jsonStr =document.getElementById('{!$Component.fm1.ih1}').value;
                
                         objs = eval(jsonStr);
                                     
                         initUp();    
                       }
                   }
                    
              }
               else
               {        
                   
                   
                    if(!CheckSession())
                    {
                        window.location.href = "/apex/RedirectPage";
                    }
                    else
                    {
                       var cacheDateNow = new Date();
                       localStorage.CacheDateMonth = cacheDateNow.getMonth()+1;
                       localStorage.CacheDateDay = cacheDateNow.getDate();
    
                       if(localStorage.OffLineValue != null && localStorage.OffLineValue != "")
                       {
                            alert("{!$Label.Pagesynchronous}");
                                     
                            document.getElementById('{!$Component.fm1.ih3}').value = localStorage.OffLineValue;                                                                    
                                       
                            savelocal();
                                       
                            window.setTimeout(checkLocal,100);    
                                  
                        }        
                             
    
                        jsonStr =document.getElementById('{!$Component.fm1.ih1}').value;
        
                        objs = eval(jsonStr);
                             
                        initUp();    
                    }
               }
               var selectoptions=document.getElementById('{!$Component.fm1.ih2}').value;
                   
               if(selectoptions!= "")
               {
                    var arrstr = selectoptions.split(";");
                    drawSelect(arrstr);
               }
              // window.setInterval(checkNet,2000);
                     
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
         
         function initoffline()
         {
             window.location.href="/apex/CustomerChoice";   
         }
         
         
        OnLineAlert = true;
        OffLineAlert = true;
        function checkNet()
        {
           if(navigator.onLine == false&&OffLineAlert)
           { 
                var DateNow = new Date();
                if((DateNow.getMonth()+1)!= localStorage.CacheDateMonth)
                {
                     var d1 = document.getElementById("div1");
                     var d2 = document.getElementById("div2");
                                    
                     d1.style.display= "block";
                     d2.style.display= "none";
                 }
                 else
                 {
                      if((DateNow.getDate()-localStorage.CacheDateDay)>10)
                      {
                           var d1 = document.getElementById("div1");
                           var d2 = document.getElementById("div2");
                                    
                           d1.style.display= "block";
                           d2.style.display= "none";
                       }
                       else
                       {    
                                                
                            OffLineAlert = false;
                            OnLineAlert = true;
                       }
                }
           }
           if(navigator.onLine == true&&OnLineAlert)
           {   
               OnLineAlert = false;
               OffLineAlert = true;
              
                var cacheDateNow = new Date();
                localStorage.CacheDateMonth = cacheDateNow.getMonth()+1;
                localStorage.CacheDateDay = cacheDateNow.getDate();
              
                if(localStorage.OffLineValue != null && localStorage.OffLineValue != "")
                {
                     alert("{!$Label.Pagesynchronous}");
                                 
                     document.getElementById('{!$Component.fm1.ih3}').value = localStorage.OffLineValue;                                                                    
                                   
                     savelocal();
                                   
                     window.setTimeout(checkLocal,100);    
                              
                }         
           }
        }
        
   
    function ClosePage()
    {
       alert("{!$Label.Pageupdatecache}");
       window.location.href='https://test.salesforce.com';
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
               alert("{!$Label.PagedataError}");
               localStorage.OffLineValue = "";  
           }
           else
           {
               window.setTimeout(checkLocal,100);
           }
    }

    //获得选择框右上的值
    function getReusltBySelect(){
       deleteRows();
       var selected = document.getElementById("mySelected");
       var selectOption = selected.options[selected.selectedIndex].value;
       var result = new Array();
       var obj = eval(jsonStr);
       if(selectOption=="{!$Label.Select}"){
           objs = eval(jsonStr);
       }else{
           for(var i = 0;i < obj.length;i++){
               if(obj[i].str2 == selectOption){
                   result.push(obj[i]);
               }
           }
           objs = result; 
       }
       initUp();
       document.getElementById("search").value = "";
    }
   //清空表格
    function deleteRows(){
        var tb=document.getElementById("clearStart");
        for(var j=0;j<objs.length;j++){
             var tr = tb.deleteRow(0);
        }
    }
    //排序 按label
    function getDataArrUp(lable){
        if(lable==1){
            for(var i=0;i<objs.length;i++){
               
                for(var j=i;j<objs.length;j++){
                    if(objs[i].name.localeCompare(objs[j].name) < 0 ){
                      
                        var temp=objs[i];
                        objs[i]=objs[j];
                        objs[j]=temp;
                    }     
                }
            }
        }else if(lable==2){
            for(var i=0;i<objs.length;i++){
             
                for(var j=i;j<objs.length;j++){
                    if(objs[i].str1.localeCompare(objs[j].str1) < 0 ){
                      
                        var temp=objs[i];
                        objs[i]=objs[j];
                        objs[j]=temp;
                    }     
                }
            }
        }
        else
        {
          for(var i=0;i<objs.length;i++){
             
                for(var j=i;j<objs.length;j++){
                    if(objs[i].str2.localeCompare(objs[j].str2) < 0 ){
                      
                        var temp=objs[i];
                        objs[i]=objs[j];
                        objs[j]=temp;
                    }     
                }
            }
        }
        return objs;
    }
    //降序
    function getDataArrDown(lable){
        if(lable==1){
            for(var i=0;i<objs.length;i++){
               
                for(var j=i;j<objs.length;j++){
                    if(objs[i].name.localeCompare(objs[j].name) > 0 ){
                       
                        var temp=objs[i];
                        objs[i]=objs[j];
                        objs[j]=temp;
                    }     
                }
            }
        }else if(lable==2){
            for(var i=0;i<objs.length;i++){
               
                for(var j=i;j<objs.length;j++){
                    if(objs[i].str1.localeCompare(objs[j].str1) > 0 ){
                      
                        var temp=objs[i];
                        objs[i]=objs[j];
                        objs[j]=temp;
                    }     
                }
            }
        }
        else
        {
            for(var i=0;i<objs.length;i++){
               
                for(var j=i;j<objs.length;j++){
                    if(objs[i].str2.localeCompare(objs[j].str2) > 0 ){
                      
                        var temp=objs[i];
                        objs[i]=objs[j];
                        objs[j]=temp;
                    }     
                }
            }
        }
        return objs;
    }
    //给Select 添加Option
    function drawSelect(str)
    {
      
        var objSelectNow=document.getElementById("mySelected");
        for(var i = 0;i<str.length;i++)
        {
            var objOption = document.createElement("OPTION");
            objOption.text= str[i];
            objOption.value=str[i];
            objSelectNow.options.add(objOption);
        }
      
      
      
    }
    //初始化表
    function initUp()
    {
         var objs = getDataArrDown("1");
         var tb=document.getElementById("clearStart");
         
         for(var i=0;i<objs.length;i++){
                tb.border="0";  
                var tr = tb.insertRow(i);  
                tr.className = "content"; 
                var td1 = tr.insertCell(0);  
                var td2 = tr.insertCell(1);  
                var td3 = tr.insertCell(2); 
             
           //   var alink= '<a href="/apex/CustomDetailTest" onclick ="PostPram(\''+objs[i].id+'\',\''+objs[i].name+'\');"> '+objs[i].name+'</a>';
           
           //   var alink= '<a href="/apex/CustomDetailTest?date='+nowDate+'" onclick ="PostPram(\''+objs[i].id+'\',\''+objs[i].name+'\');"> '+objs[i].name+'</a>';
           
                var alink= ' <u style="color:black"><a onclick ="PostPram(\''+objs[i].id+'\',\''+objs[i].name+'\');" style="cursor:pointer"> '+objs[i].name+'</a></u>';
     
            
                td1.innerHTML= alink;  
                td2.innerHTML= objs[i].str1;  
                td3.innerHTML= objs[i].str2;
         }  
    }
    //页面跳转和传参数
    function PostPram(p1,p2)
    {
         localStorage.pramid= p1;
         localStorage.pramname= p2;
    
        nowDate = new Date();
        if(navigator.onLine == false)
        {
            window.location.href="/apex/EntryPrice";
        }
        else
        {
             if(localStorage.OffLineValue != null && localStorage.OffLineValue != "")
                                   {
                                       alert("{!$Label.Pagesynchronous}");
                                     
                                       document.getElementById('{!$Component.fm1.ih3}').value = localStorage.OffLineValue;                                                                    
                                       
                                       savelocal();
                                       
                                       window.setTimeout(checkLocal,100);    
                                  
                                   }   
            window.location.href="/apex/EntryPrice?date="+nowDate;
           
           //window.location.href="/apex/EntryPrice";
        }
         
    }
    //判断升序
    function insertUp(lable){  
         var objs = getDataArrUp(lable);
         var tb=document.getElementById("clearStart");
           for(var j=0;j<objs.length;j++){
             var tr = tb.deleteRow(0);
         }
         for(var i=0;i<objs.length;i++){
                tb.border="0";  
                var tr = tb.insertRow(i);   
                 tr.className = "content"; 
                var td1 = tr.insertCell(0);  
                var td2 = tr.insertCell(1);  
                var td3 = tr.insertCell(2); 
             // var alink= '<a href="/apex/CustomDetailTest?id='+objs[i].id+'&&name='+objs[i].name+'"> '+objs[i].name+'</a>';
             // var alink= '<a href="/apex/CustomDetailTest" onclick ="PostPram(\''+objs[i].id+'\',\''+objs[i].name+'\');"> '+objs[i].name+'</a>';
             
                var alink= ' <u style="color:black"><a onclick ="PostPram(\''+objs[i].id+'\',\''+objs[i].name+'\');" style="cursor:pointer"> '+objs[i].name+'</a></u>';
                td1.innerHTML= alink;   
                td2.innerHTML= objs[i].str1;  
                td3.innerHTML= objs[i].str2;
         }  
    }  
    //判断是降序
    function insertDown(lable){  
         
         var objs = getDataArrDown(lable);
         var tb=document.getElementById("clearStart"); 
         for(var j=0;j<objs.length;j++){
             var tr = tb.deleteRow(0);
         }
         for(var i=0;i<objs.length;i++){
                tb.border="0"; 
                var tr = tb.insertRow(i);   
                 tr.className = "content"; 
                var td1 = tr.insertCell(0);  
                var td2 = tr.insertCell(1);  
                var td3 = tr.insertCell(2); 
              //var alink= '<a href="/apex/CustomDetailTest?id='+objs[i].id+'&&name='+objs[i].name+'"> '+objs[i].name+'</a>';
              //var alink= '<a href="/apex/CustomDetailTest" onclick ="PostPram(\''+objs[i].id+'\',\''+objs[i].name+'\');"> '+objs[i].name+'</a>';
        
                var alink= ' <u style="color:black"><a onclick ="PostPram(\''+objs[i].id+'\',\''+objs[i].name+'\');" style="cursor:pointer"> '+objs[i].name+'</a></u>';
                td1.innerHTML= alink;   
                td2.innerHTML= objs[i].str1;  
                td3.innerHTML= objs[i].str2;
         }   
    }
    var sign = "0";
    var sign2 = "0";
    var sign3 = "0";
    //三个表头的CLick
    function clk1()
     {
         var imageId1=document.getElementById("image1");
         
         if(sign == "1")
         {
            insertDown(1);
            imageId1.src="{!URLFOR($Resource.imgup)}"
            sign = "0";  
            return;
         }    
         else
         {
             insertUp(1);
             imageId1.src="{!URLFOR($Resource.imgdown)}"
             sign = "1";
             return;
         }
     }
    function clk2()
     {
         var imageId2=document.getElementById("image2");
       
          if(sign2 == "1")
         {
            insertDown(2);
            imageId2.src="{!URLFOR($Resource.imgup)}";
            sign2 = "0";  
            return;
         }    
         else
         {
             insertUp(2);
             imageId2.src="{!URLFOR($Resource.imgdown)}";
             sign2 = "1";
             return;
         }
     }         
      
     function clk3()
     {
         var imageId3=document.getElementById("image3");
       
          if(sign3 == "1")
         {
            insertDown(3);
            imageId3.src="{!URLFOR($Resource.imgup)}";
            sign3 = "0";  
            return;
         }    
         else
         {
             insertUp(3);
             imageId3.src="{!URLFOR($Resource.imgdown)}";
             sign3 = "1";
             return;
         }
     }   
    
     
      //检索按钮的Click
     function SearchTest()
     {    
        var obj;
        obj=document.getElementsByName("radiobutton");

            if(obj[0].checked){
                 
               deleteRows();
               var text = document.getElementById("search").value;
               
               var obj = eval(jsonStr);       
               var result = new Array();
               if(text==null){
                   objs = eval(jsonStr);
               }else{
                   for(var i = 0;i < obj.length;i++){
                       if(obj[i].name.indexOf(text) != -1){
                           result.push(obj[i]);
                       }
                   } 
                   objs = result;
               }
               initUp();
            }
            else
            {
           
               deleteRows();
               var text = document.getElementById("search").value;
               
               var patt1=new RegExp("^"+text,"g");
              
               var obj = eval(jsonStr);       
               var result = new Array();
               if(text==null){
                   objs = eval(jsonStr);
               }else{
                   for(var i = 0;i < obj.length;i++){
                       if(patt1.test(obj[i].str1)){
                           result.push(obj[i]);
                       }
                   } 
                   objs = result;
               }
               initUp();
            }
            document.getElementById("mySelected").value = "{!$Label.Select}";
        }
        //update 按钮 Click
        function UpdatePage()
        {
            
            //location.reload(true);
            //location.replace("/apex/CustomerChoice");           
            //window.location.href="/apex/CustomerChoice";
            //window.location.href="/apex/CustomerChoice?"+updateDate;
            
             var exp=new Date(); 
             exp.setTime(exp.getTime()+2*60*24*60*1000); 
            
             var updateDate = new Date();
             document.cookie = "apex__forcedUpdate="+ updateDate +";expires="+exp.toGMTString()+ "; path=" + "/"+ "; secure";
             location.reload(true);
             
             
             
        }