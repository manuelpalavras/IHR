

$.get(`/city/${nome}`, (route) => {

    $.get("./partials/filterRoutes.html", (routeHtml)=> {
        for (let i = 0; i < route.length; i++) {
            let row = i;
            $("#imagens").append("<div class='row'>"+routeHtml+"</div>");
            $(".row > h4:eq(" + row + ")").html(route[row].Nome);
            $(".row > p:eq(" + row + ")").text(route[row].Descricao);
            $(".col-sm-2>p:eq(" + (row * 2) + ")").text(`${route[row].Classificacao} Classificações`);
            $(".col-sm-2>p:eq(" + (row * 2 + 1) + ")").text(`${route[row].Avaliacoes} Avaliações`);
            $(".col-sm-3>p:eq(" + (row * 2) + ")").text(`Tipo : ${route[row].Tipo}`);
            $(".col-sm-3>p:eq(" + (row * 2 + 1) + ")").text(`Dificuldade : ${route[row].Dificuldade}`)
        }});
});