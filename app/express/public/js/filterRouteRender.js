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
            $("#erro").text(`Não foi possivel encontrar as rotas, porém tem aqui rotas da cidade de Lisboa !`);
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
            $("#imagens > .row:eq(" + i + ") > div > div > a > figure > img ").attr('src', `../image/imagens/${info[i].PoI[i].Img}`);
            $("#imagens > .row:eq(" + i + ") > div > div > a").attr('href', `/route=${info[i]._id}`);
        }
    });


    // opções da filtragem de acordo com as rotas que estão a ser mostradas

    //tipos da rota
    for (let i = 0; i < info.length; i++) {
        $.get(`/types/${info[i].Nome}`, (types) => {
            let values = [];
            for (let i = 0; i < types.length; i++)
                if (!values.contains(types[i]))
                    values.push(types[i]);


            for (let i = 0; i < types.length; i++) {
                $("#tipos").append(`<tr><td>${types[i]}</td><td><input type='checkbox' value="${types[i]}" name="${values[i]}"></td></tr>`);
            }
        });

        //dificuldade da rota
        $.get(`/difficulty/${info[i].Nome}`, (dificulties) => {
            let values = [];
            for (let i = 0; i < dificulties.length; i++)
                if (!values.contains(dificulties[i]))
                    values.push(dificulties[i]);
            for (let i = 0; i < dificulties.length; i++) {
                $("#dific").append(`<tr><td>${dificulties[i]}</td><td><input type='checkbox' value="${dificulties[i]}" name="${dificulties[i]}"></td></tr>`);
            }
        });

        //classificação da rota
        $.get(`/classification/${info[i].Nome}`, (classifications) => {
            let values = [];
            for (let i = 0; i < classifications.length; i++)
                if (!values.contains(classifications[i]))
                    values.push(classifications[i]);
            for (let i = 0; i < classifications.length; i++) {
                let star = "";
                for (let j = 0; j < Math.round(classifications[i]); j++) {
                    star += "★";
                }
                $("#classificacao").append(`<tr><td>${star}</td><td><input type='radio' value="${classifications[i]}"></td></tr>`);
            }
        })
    }
}


Array.prototype.contains = function (val, length) {
    if (this.length !== length) {
        for (let i = 0; i < this.length; i++)
            if (this[i] === val) {
                return false;
            }
    }
    return true;
};