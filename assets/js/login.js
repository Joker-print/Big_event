$(function () {
    $("#link-reg").on("click", function () {
        $(".reg-box").show();
        $(".login-box").hide();
    });
    $("#link-login").on("click", function () {
        $(".reg-box").hide();
        $(".login-box").show();
    });

    var form = layui.form
    // 用于表单验证
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次密码不一致";
            }
            console.log('注册成功，请登录');
        }
    });
    // 监听注册表单
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val(),
            repassword: $("#form_reg [name=repassword]").val()
        };
        $.ajax({
            method: "post",
            url: "/api/reg",
            data: data,
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功,请登录');
                $('#link-login').click();
            }
        })

    })
    // 监听登录表单
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg("登陆成功")
                localStorage.setItem('token', res.token)
                location.href = "/index.html"
            }
        })
    })
});
