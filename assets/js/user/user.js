$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1-6之间"
            }
        }
    })
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('formUserInfo', res.data)
                renderAvatar(res.data);
            }
        })
    }

    //  渲染用户信息
    function renderAvatar(params) {
        console.log(params);
        // 获取用户名称
        var name = params.nickname || params.username;
        //   设置用户名
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        if (params.user_pic != null) {
            //   渲染图片头像
            $('.layui-nav-img').attr('src', params.user_pic).show();
            $('.text-avatar').hide();
        } else {
            //   渲染文本头像
            $('.layui-nav-img').hide();
            var letter = name[0].toUpperCase();
            $('.text-avatar').html(letter).show();
        }
    }
    $("#btnReset").on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    });
    $('.layui-form').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "PUT",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg("更新用户信息失败")
                }
                layer.msg("更新用户信息成功")
                window.parent.getUserInfo()
            }
        })
    })
})
