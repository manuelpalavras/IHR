$.get(`/city/${nome}`, (route) => {
    if (route.length == null || undefined || 0) {
        $("#imagens").append("<h1 style='text-align: center;' id='erro'></h1><hr>");
        $("#erro").text(`Não foi possivel encontrar as rotas da cidade "${nome}" , porém tem aqui rotas da cidade de Lisboa !`);
        $.get("/city/Lisboa", (routeLisbon) => {
            route = routeLisbon;
        })
    }
    $.get("./partials/filterRoutes.html", (routeHtml) => {
        for (let i = 0; i < route.length; i++) {
            $("#imagens").append("<div class='row'>" + routeHtml + "</div>");
            $(".row > h4:eq(" + i + ")").html(route[i].Nome);
            $(".row > p:eq(" + i + ")").text(route[i].Descricao);
            $(".col-sm-2>p:eq(" + (i * 2) + ")").text(() => {
                let star = "";
                let numero = route[i].Classificacao;
                for (let i = 0; i < Math.round(numero); i++) {
                    star += "★";
                }
                return `${numero} ${star}`
            });
            $(".col-sm-2>p:eq(" + (i * 2 + 1) + ")").text(`${route[i].Avaliacoes} Avaliações`);
            $(".col-sm-3>p:eq(" + (i * 2) + ")").text(`Tipo : ${route[i].Tipo}`);
            $(".col-sm-3>p:eq(" + (i * 2 + 1) + ")").text(`Dificuldade : ${route[i].Dificuldade}`);
            $("#imagens > .row:eq(" + i + ") > div > div > a > figure > img ").attr('src', `../image/imagens/${route[i].PoI[i].Img}`);
            $("#imagens > .row:eq(" + i + ") > div > div > a").attr('href', `/route=${route[i]._id}`);
        }
    });

    $.get(`/types/${nome}`, (types) => {
        for (let i = 0; i < types.length; i++) {
            $("#tipos").append(`<tr><td>${types[i]}</td><td><input type='checkbox' value="${types[i]}" name="${types[i]}"></td></tr>`);
        }
    });
    $.get(`/dificulty/${nome}`, (dificulties) => {
        for (let i = 0; i < dificulties.length; i++) {
            $("#dific").append(`<tr><td>${dificulties[i]}</td><td><input type='checkbox' value="${dificulties[i]}" name="${dificulties[i]}"></td></tr>`);
        }
    });

    $.get(`/classification/${nome}`, (classifications) => {

        for (let i = 0; i < classifications.length; i++) {
            let star = "";
            for (let j = 0; j < Math.round(classifications[i]); j++) {
                star += "★";
            }
            $("#classificacao").append(`<tr><td>${star}</td><td><input type='radio' value="${classifications[i]}"></td></tr>`);
        }
    })


});
