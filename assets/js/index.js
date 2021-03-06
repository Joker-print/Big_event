$(function () {
    getUserInfo();
    $("#btnLogout").on("click", function () {
        layer.confirm("确认退出登录？", { icon: 3, title: "提示" },
            function (index) {
                localStorage.removeItem("token");
                location.href = "/login.html";
                layer.close('index');
            })
    });


});
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.code !== 0) {
                return layer.msg("获取失败");
            }
            console.log(res);
            randerAvatar(res.data);
        },

    });
}
function randerAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        console.log(name);
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        console.log(first);
        $(".text-avatar").html(first).show();
    }
}
// $("btnLogout").on("click", function () {
//     layer.confirm("确认退出登录？", { icon: 3, title: "提示" }),
//         function (index) {
//             localStorage.removeItem("token");
//             location.href = "/login.html";
//             layer.close(index);
//         };
// });
