
$.get('/routes/25 de abril', (route) => {
    $("#PoI").append("<h4 id='title'></h4><section class=\"row\"><section class='container col-sm-12' id='PoI'></section></section>")
    $("#title").html(route.Nome);

    $.get("./partials/indexImage.html", (localsHtml) => {
        for (let i = 0; i < route.PoI.length; i++) {
            $("#PoI").append("<div>" + localsHtml +"</div>");
        }
    })
});


