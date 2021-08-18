$(function () {
    initAtrCasteList();
    function initAtrCasteList() {
        $.ajax({
            method: "GET",
            url: "/my/cate/list",
            success: function (res) {
                console.log(res);
                var hrmlStr = template("tpl-table", res);
                $("tbody").html(hrmlStr);
            },
        });
    }
    var addInedx = null;
    $("#btnAddCate").on("click", function () {
        addInedx = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $("#dialog-add").html(),
        });
    });
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/cate/add",
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg("提交分类失败");
                }
                layer.msg("提交分类成功");
                layer.close(addInedx);
                initAtrCasteList();
            },
        });
    });
    var editInedx = null;
    var form = layui.form
    $("tbody").on("click", ".btn-edit", function () {
        editInedx = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        var id = $(this).attr("data-id");
        console.log(id);
        $.ajax({
            method: "GET",
            url: "/my/cate/info?id=" + id,
            success: function (res) {
                console.log(res);
                form.val("form-editer", res.data);
            },
        });
    });
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'put',
            url: '/my/cate/info',
            data: $(this).serialize(),
            success: function (res) {
                if (res.code !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新信息成功')
                layer.close(editInedx)
                initAtrCasteList()
            }
        })
    })
    $("body").on("click", ".btn-delete", function () {
        var id = $(this).attr("data-id");
        console.log(id);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'delete',
                url: '/my/cate/del?id=' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
});
