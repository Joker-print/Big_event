$.ajaxPrefilter(function (options) {
    options.url = "http://www.liulongbin.top:3008" + options.url;
    if (options.url.indexOf("/my") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || "",
        };
    }
    options.complete = function (res) {
        if (res.responseJSON.code === 1) {
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    };

});
