$.get(`/routes`, (routes) => {
    $.get("/cities", (cities) => {
        $.get("./partials/indexImage.html", (imageHtml) => {

            //variaveis auxiliares para o render da pagina
            let routesNumber;
            let poiNumber;
            let values = [];


            // ciclo que verifica se a rota a introduzir já existe na página
            for (let i = 0; i < routes.length; i++) {
                do {
                    routesNumber = randomNumberBetween(routes.length);
                    console.log(routesNumber)
                } while (!values.contains(routes[routesNumber].Nome, routes.length));

                $('#routes').append("<div class=\"container col-sm-3\">" + imageHtml + "</div>");
                $("#routes > div:eq(" + i + ") > a ").attr('href', `/route=${routes[routesNumber]._id}`);
                $("#routes > div:eq(" + i + ") > a > figure > img").attr('src', `../image/imagens/${routes[routesNumber].imagem}`);
                $("#routes > div:eq(" + i + ") > a > figure > img > figcaption").attr('value', `${routes[routesNumber].Nome}`);
                $("#routes > div:eq(" + i + ") > a > figure > figcaption > p").text(`${routes[routesNumber].Nome}`);

                // coloca o nome da rota adicionada à página
                values.push(routes[routesNumber].Nome);

            }

            // limpa o array iterado pelas rotas para passar a ser iterado com PoI's
            values = [];


            for (let i = 0; i < 4; i++) {

                // ciclo que verifica se o PoI a introduzir já existe na página
                do {
                    routesNumber = randomNumberBetween(routes.length);
                    poiNumber = randomNumberBetween(routes[routesNumber].PoI.length);
                } while (!values.contains(routes[routesNumber].PoI[poiNumber].Nome, 4));

                $('#PoI').append("<div class=\"container col-sm-3\">" + imageHtml + "</div>");
                $("#PoI > div:eq(" + (i) + ") > a ").attr('href', `/Poi=${routes[routesNumber].PoI[poiNumber].Nome}`);
                $("#PoI > div:eq(" + (i) + ") > a > figure > img").attr('src', `../image/imagens/${routes[routesNumber].PoI[poiNumber].Img}`);
                $("#PoI > div:eq(" + (i) + ") > a > figure > img > figcaption").attr('value', `${routes[routesNumber].PoI[poiNumber].Nome}`);
                $("#PoI > div:eq(" + (i) + ") > a > figure > figcaption > p").text(`${routes[routesNumber].PoI[poiNumber].Nome}`);

                //cola o novo PoI adicionado à página no array
                values.push(routes[routesNumber].PoI[poiNumber].Nome);

            }

            // coloca as cidades que existem na base de dados , de momento duas
            for (let i = 0; i < cities.length; i++) {
                $('#cidades').append("<div class=\"container col-sm-3\">" + imageHtml + "</div>");
                $("#cidades > div:eq(" + i + ") > a > figure > img").attr('src', `../image/imagens/${cities[i].Imagem}`);
                $("#cidades > div:eq(" + i + ") > a > figure > img > figcaption").attr('value', `${cities[i].Nome}`);
                $("#cidades > div:eq(" + i + ") > a > figure > figcaption > p").text(`${cities[i].Nome}`);
                $("#cidades > div:eq(" + i + ") > a").attr('href', `/city=${cities[i].Nome}`);
            }
        })
    });
});

// retorna um valor aleatorio de 0 a um valor maximo a ser passado como parametro
function randomNumberBetween(number) {
    return Math.floor(Math.random() * number)
}

// função que vê se o valor de uma variavel existe um array ou se o array tem um certo tamanho
Array.prototype.contains = function (val, length) {
    if (this.length !== length) {
        for (let i = 0; i < this.length; i++)
            if (this[i] === val) {
                return false;
            }
    }
    return true;
};
