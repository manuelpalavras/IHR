

$.get(`/city/${nome}`, (route) => {

    $.get("./partials/filterRoutes.html", (routeHtml)=> {
        for (let i = 0; i < route.length; i++) {
            let row = i;
            $("#imagens").append("<div class='row'>"+routeHtml+"</div>");
            $(".row > h4:eq(" + row + ")").html(route[row].Nome);
            $(".row > p:eq(" + row + ")").text(route[row].Descrição);
            $(".col-sm-2>p:eq(" + (row * 2) + ")").text(route[row].Classificação);
            $(".col-sm-2>p:eq(" + (row * 2 + 1) + ")").text(`555 Avaliações`);
            $(".col-sm-3>p:eq(" + (row * 2) + ")").text("Tipo : Histórica, Cultural");
            $(".col-sm-3>p:eq(" + (row * 2 + 1) + ")").text("Dificuldade : Baixa")
        }});
});