$.get(`/city/${nome}`, (route) => {
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
    })
});
