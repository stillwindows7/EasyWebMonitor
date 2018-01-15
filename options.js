var $save_btn = $("#save_btn");
var $start_btn = $("#start_btn");
var $stop_btn = $("#stop_btn");
var $count = $("#count");
var id = 1258;
var def_count = 3;
var obj = {
    "status":0
};

$save_btn.on("click",save);
$start_btn.on("click",start);
$stop_btn.on("click",stop);

//保存
function save(){
    var val = $count.val();
    if(val===""){
        alert("请设置最大排队人数");
        return;
    }else if(!(/^\d+$/).test(val)){
        alert("请输入数字");
        return;
    }
    val = Number(val);
    obj.count = val;
    var str = JSON.stringify(obj);

    request({
        type:"POST",
        url:"http://en.280i.cn//Home/SetConfig?key="+id+"&content="+str,
        success:function(res){
            console.log(res);
        },
        fail:function(res){

        }
    });
}

//启用
function start(){
    var str = JSON.stringify({
        "count":obj.count,
        "status":1
    });
    request({
        type:"POST",
        url:"http://en.280i.cn//Home/SetConfig?key="+id+"&content="+str,
        success:function(res){
            alert("已启用");
            $("#status").html("启用");
            obj.status = 1;
        },
        fail:function(res){

        }
    });
}

//停用
function stop(){
    var str = JSON.stringify({
        "count":obj.count,
        "status":0
    });
    request({
        type:"POST",
        url:"http://en.280i.cn//Home/SetConfig?key="+id+"&content="+str,
        success:function(res){
            alert("已停用");
            $("#status").html("停用");
            obj.status = 0;
        },
        fail:function(res){

        }
    });
}

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
            var res = xhr.responseText?JSON.parse(xhr.responseText):null;
            if(xhr.status===200){
                obj.success(res);
            }else{
                obj.fail(res);
            }
        }
    }
    xhr.open(obj.type,obj.url,true);
    xhr.send(obj.params);
}

function getData(){
    request({
        type:"GET",
        url:"http://en.280i.cn/Home/GetConfig?key="+id+"&callBack=invoke",
        jsonp:true,
        params:{},
        success:function(res){
            if(res){
                obj = res;
                $count.val(obj.count);
            }else{
                $count.val(def_count);
                obj.count = def_count;
                obj.status = 0;
            }
            $("#status").html(obj.status === 0?"停用":"启用");
        },
        fail:function(res){

        }
    });
}

$(document).ready(function(){
    getData();
});

function invoke(obj){
    console.log(obj);
}