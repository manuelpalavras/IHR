$.get(`/city/${nome}`, (route) => {
    if (route.length == 0) {
        $("#imagens").append("<h1 style='text-align: center;' id='erro'></h1><hr>");
        $("#erro").text(`Não foi possivel encontrar as rotas da cidade "${nome}" , porém tem aqui rotas da cidade de Lisboa !`);
        $.get("/city/Lisboa" ,(routeLisbon) => {
            route = routeLisbon;
        })
    }
    $.get("./partials/filterRoutes.html", (routeHtml) => {
        for (let i = 0; i < route.length; i++) {
            console.log(route[i]._id);
            $("#imagens").append("<div class='row'>" + routeHtml + "</div>");
            $(".row > h4:eq(" + i + ")").html(route[i].Nome);
            $(".row > p:eq(" + i + ")").text(route[i].Descricao);
            $(".col-sm-2>p:eq(" + (i * 2) + ")").text(`${route[i].Classificacao} Classificações`);
            $(".col-sm-2>p:eq(" + (i * 2 + 1) + ")").text(`${route[i].Avaliacoes} Avaliações`);
            $(".col-sm-3>p:eq(" + (i * 2) + ")").text(`Tipo : ${route[i].Tipo}`);
            $(".col-sm-3>p:eq(" + (i * 2 + 1) + ")").text(`Dificuldade : ${route[i].Dificuldade}`);
            $("#imagens > .row:eq(" + i + ") > div > div > a > figure > img ").attr('src', `../image/imagens/${route[i].PoI[i].Img}`);
            $("#imagens > .row:eq(" + i + ") > div > div > a").attr('href', `/route=${route[i]._id}`);
        }
    });
});
