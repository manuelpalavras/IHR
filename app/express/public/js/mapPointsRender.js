
$.get(`/route/${id}`, (route) => {
    console.log(route);
    $("#PoI").append("<h4 id='title'></h4><section class=\"row\"><section class='container col-sm-12' id='PoI'></section></section>")
    $("#title").html(route.Nome);

    $.get("./partials/indexImage.html", (localsHtml) => {
        for (let i = 0; i < route.PoI.length; i++) {
            $("#PoI").append("<div>" + localsHtml +"</div>");
            $("#PoI > div:eq(" + i + ") > a > figure > img").attr('src', `../image/imagens/${route.PoI[i].Img}`);
            $("#PoI > div:eq(" + i + ") > a > figure > img > figcaption").attr('value', `${route.PoI[i].Nome}`);
            $("#PoI > div:eq(" + i + ") > a > figure > figcaption > p").text(`${route.PoI[i].Nome}`);
        }
    })
});


