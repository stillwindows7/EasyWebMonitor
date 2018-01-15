var gap = 3000;
var id = 1258;
//启用状态且达到最大限制值则响铃，非启用状态则立即停止，响铃时长
window.setTimeout(function(){
    query();
},gap);

function request(obj){
    obj.type = obj.type||"GET";
    obj.params = obj.params || null;
    //url 参数
    if(obj.data && Object.keys(obj.data).length){
        var tmp = [];
        Object.keys(obj.data).forEach(function(val,key){
            tmp.push(val+"="+obj.data[val]);
        });
        obj.url+="?"+tmp.join("&");
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            var res = xhr.responseText?JSON.parse(xhr.responseText):null
            if(xhr.status===200 && xhr.status<300){
                obj.success(res);
            }else{
                obj.fail(res);
            }
        }
    }
    xhr.open(obj.type,obj.url,true);
    xhr.send(obj.params);
}

/*function $(selector){
    return document.querySelector(selector);
}*/

function sendEvent(event, value) {
    chrome.extension.sendRequest({eventName: event, eventValue: value});
}

function query(){
    if($("#queueCountData")){
        var val = $("#queueCountData").html();
        val = Number(val.replace(/[^\d]/g,""));
        request({
            type:"GET",
            url:("http://en.280i.cn/Home/GetConfig?key="+id),
            params:{},
            success:function(res){
                if(res){
                    if(res.status===1){
                        if(val>=res.count){
                            sendEvent("start",val);
                        }else{
                            sendEvent("stop",val);
                        }
                    }else{
                        sendEvent("stop",val);
                    }
                }
                window.setTimeout(function(){
                    query();
                },gap);
            },
            fail:function(res){
                window.setTimeout(function(){
                    query();
                },gap);
            }
        },true);
    }
};
