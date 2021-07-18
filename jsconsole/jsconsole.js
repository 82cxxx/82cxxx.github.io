    print = {
        log : function(text){
            var new_element = document.createElement('div');
            new_element.innerHTML = "> "+text.toString().replace(/\n/g,"<br>");
            document.getElementById("view").appendChild(new_element);
            var element = document.documentElement;
            var bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        },
        alert : function(text){
            var new_element = document.createElement('div');
            new_element.innerHTML = "> \\ "+text.toString().replace(/\n/g,"<br>")+" /";
            new_element.style.fontSize = "22px"
            document.getElementById("view").appendChild(new_element);
            var element = document.documentElement;
            var bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        },
        warn : function(text){
            var new_element = document.createElement('div');
            new_element.innerHTML = "> "+text.toString().replace(/\n/g,"<br>");
            new_element.style.color = "rgb(255,236,71)"
            document.getElementById("view").appendChild(new_element);
            var element = document.documentElement;
            var bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        },
        adv : function(text){
            var new_element = document.createElement('div');
            new_element.innerHTML = "! "+text.toString().replace(/\n/g,"<br>");
            document.getElementById("view").appendChild(new_element);
            var element = document.documentElement;
            var bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        },
        link : function(url){
            var new_element = document.createElement('div');
            new_element.innerHTML = "> <a href="+url+">"+url+"</a>";
            document.getElementById("view").appendChild(new_element);
            var element = document.documentElement;
            var bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        },
        embed : function(url){
            var new_element = document.createElement('iframe');
            new_element.src = url;
            document.getElementById("view").appendChild(new_element);
            var element = document.documentElement;
            var bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        },
        clear : function(){
            document.getElementById("view").innerHTML = "";
            start();
        },
    }
    {
        log = print.log;
        go = function(url){location.href=url};
        reload = function(){location.reload()};
    }
    function run(){
        var command = document.getElementById("inputarea").value;
        before = command;
        setTimeout(command);
    }