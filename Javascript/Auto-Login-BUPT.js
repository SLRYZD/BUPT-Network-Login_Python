// ==UserScript==
// @name         Auto-Login-BUPT
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动登录北邮网关、身份认证系统、教务管理系统
// @author       Seize
// @match        http://10.3.8.216/*
// @match        https://auth.bupt.edu.cn/*
// @match        https://jwgl.bupt.edu.cn/jsxsd/
// @grant        none
// ==/UserScript==

(function exec() {
    var _username = ""; //学号
    var _password = ""; //密码

    //以下内容无需修改

    function post(params) {
        var form = document.createElement("form");
        if(window.location.host.indexOf("jwgl") != -1) form.action = "https://jwgl.bupt.edu.cn/jsxsd/xk/LoginToXk";
        else form.action = window.location.href;
        form.method = "post";
        form.style.display = "none";

        for (var x in params) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = params[x];
            form.appendChild(opt);
        }

        document.body.appendChild(form);
        form.submit();
    }

    function loginNetwork() {
        var params = {
            "user": _username,
            "pass": _password
        };
        post(params);
    }

    function loginAuth() {
        var params = {
            "username": _username,
            "password": _password,
            "lt": document.getElementsByName("lt")[0].defaultValue,
            "execution": document.getElementsByName("execution")[0].defaultValue,
            "_eventId": document.getElementsByName("_eventId")[0].defaultValue,
            "rmShown": 1
        }
        post(params);
    }

    function loginJWGL() {
        var params = {
            "userAccount": _username,
            "userPassword": "",
            "encoded": window.btoa(_username) + "%%%" + window.btoa(_password) //base64
        }
        post(params);
    }

    if(window.location.host.indexOf("auth") != -1) {
        loginAuth();
    }
    else if(window.location.host.indexOf("10.3.8.216") != -1) {
        if(document.getElementsByClassName("center title")[0].innerText == "登录成功");
        else loginNetwork();
    }
    else if(window.location.host.indexOf("jwgl") != -1) {
        loginJWGL();
    }
}())