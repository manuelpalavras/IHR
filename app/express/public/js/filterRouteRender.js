$.get(`/city/${nome}`, (route) => {
    if (route.length >= 1)
        render(nome, route);
    else $.get(`/routes/PoI/${nome}`, (routePoI) => {
        if (routePoI.length >= 1)
            render(nome, routePoI);
        else {


            // caso existam mais opções de filtragem, vindas da página inicial


            //erro caso nao recebermos nada da base de dados e alguem andar a brincar com o url

            $("#imagens").append("<h1 style='text-align: center;' id='erro'></h1><hr>");
            $("#erro").text(`Não foi possivel encontrar as rotas, porém tem aqui rotas da cidade de ${nome}!`);
            $.get("/city/Lisboa", (routeLisbon) => {
                render("Lisboa", routeLisbon);
            })
        }

    })
})
;


function render(nome, info) {

    // gera as rotas a serem mostradas

    $.get("./partials/filterRoutes.html", (routeHtml) => {
        for (let i = 0; i < info.length; i++) {
            $("#imagens").append("<div class='row'>" + routeHtml + "</div>");
            $(".row > h4:eq(" + i + ")").html(info[i].Nome);
            $(".row > p:eq(" + i + ")").text(info[i].Descricao);
            $(".col-sm-2>p:eq(" + (i * 2) + ")").text(() => {
                let star = "";
                let numero = info[i].Classificacao;
                for (let i = 0; i < Math.round(numero); i++) {
                    star += "★";
                }
                return `${numero} ${star}`
            });
            $(".col-sm-2>p:eq(" + (i * 2 + 1) + ")").text(`${info[i].Avaliacoes} Avaliações`);
            $(".col-sm-3>p:eq(" + (i * 2) + ")").text(`Tipo : ${info[i].Tipo}`);
            $(".col-sm-3>p:eq(" + (i * 2 + 1) + ")").text(`Dificuldade : ${info[i].Dificuldade}`);
            $("#imagens > .row:eq(" + i + ") > div > div > a > figure > img ").attr('src', `../image/imagens/${info[i].imagem}`);
            $("#imagens > .row:eq(" + i + ") > div > div > a").attr('href', `/route=${info[i]._id}`);
        }
    });


    // opções da filtragem de acordo com as rotas que estão a ser mostradas
    let valuesTipo = [];
    let valueDiff = [];
    let valueClass = [];
    //tipos da rota
    for (let i = 0; i < info.length; i++) {
        $.get(`/types/${info[i].Nome}`, (types) => {
            for (let j = 0; j < types.length; j++)
                if (!valuesTipo.includes(types[j])) {
                    valuesTipo.push(types[j]);
                    $("#tipos").append(`<tr><td>${valuesTipo[valuesTipo.length - 1]}</td><td><input type='checkbox' value="${valuesTipo[valuesTipo.length - 1]}"></td></tr>`);
                }
        });

        //dificuldade da rota
        $.get(`/difficulty/${info[i].Nome}`, (dificulties) => {
            for (let j = 0; j < dificulties.length; j++)
                if (!valueDiff.includes(dificulties[j])) {
                    valueDiff.push(dificulties[j]);
                    $("#dific").append(`<tr><td>${valueDiff[valueDiff.length - 1]}</td><td><input type='checkbox' value="${valueDiff[valueDiff.length - 1]}"></td></tr>`);
                }
        });

        //classificação da rota
        $.get(`/classification/${info[i].Nome}`, (classifications) => {
            for (let j = 0; j < classifications.length; j++)
                if (!valueClass.includes(Math.round(classifications[j]))) {
                    valueClass.push(Math.round(classifications[j]));
                    let star = ["★", "★★", "★★★", "★★★★", "★★★★★"];
                    if (Math.round(classifications[j]) < 1)
                        $("#classificacao").append(`<tr><td>${star[Math.round(classifications[j])]}</td><td><input type='radio' value="${valueClass[valueClass.length - 1]}"></td></tr>`);
                    else
                        $("#classificacao").append(`<tr><td>${star[Math.round(classifications[j]) - 1]}</td><td><input type='radio' value="${valueClass[valueClass.length - 1]}"></td></tr>`);
                }
        })
    }
}
