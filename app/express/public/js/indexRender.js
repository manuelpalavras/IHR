$.get(`/routes`, (route) => {
    $.get("/cities", (cities) => {
        $.get("./partials/indexImage.html", (imageHtml) => {
            for (let i = 0; i < route.length; i++) {
                $('#routes').append("<div class=\"container col-sm-3\">" + imageHtml + "</div>");
                $("#routes > div:eq(" + i + ") > a ").attr('href', `/route=${route[i]._id}`);
                $("#routes > div:eq(" + i + ") > a > figure > img").attr('src', `../image/imagens/${route[i].PoI[0].Img}`);
                $("#routes > div:eq(" + i + ") > a > figure > img > figcaption").attr('value', `${route[i].Nome}`)
                $("#routes > div:eq(" + i + ") > a > figure > figcaption > p").text(`${route[i].Nome}`);
            }
            for (let i = 0; i < route.length; i++) {
                let routesNumber = Math.floor(Math.random() * route.length);
                let poiNumber = Math.floor(Math.random() * route[routesNumber].PoI.length);
                do {
                    routesNumber = Math.floor(Math.random() * route.length);
                    poiNumber = Math.floor(Math.random() * route[routesNumber].PoI.length);
                } while (route[routesNumber].PoI[poiNumber] == $("#PoI > div:eq(" + (i) + ") > a > figure > img > figcaption").val)
                $('#PoI').append("<div class=\"container col-sm-3\">" + imageHtml + "</div>");
                $("#PoI > div:eq(" + (i) + ") > a ").attr('href', `/Poi=${route[routesNumber].PoI[poiNumber].Nome}`);
                $("#PoI > div:eq(" + (i) + ") > a > figure > img").attr('src', `../image/imagens/${route[routesNumber].PoI[poiNumber].Img}`);
                $("#PoI > div:eq(" + (i) + ") > a > figure > img > figcaption").attr('value', `${route[routesNumber].PoI[poiNumber].Nome}`);
                $("#PoI > div:eq(" + (i) + ") > a > figure > figcaption > p").text(`${route[routesNumber].PoI[poiNumber].Nome}`);
            }
            ;
            for (let i = 0; i < cities.length; i++) {
                $('#cidades').append("<div class=\"container col-sm-3\">" + imageHtml + "</div>");
                $("#cidades > div:eq(" + i + ") > a > figure > img").attr('src', `../image/imagens/${route[i].PoI[0].Img}`);
                $("#cidades > div:eq(" + i + ") > a > figure > img > figcaption").attr('value', `${cities[i]}`);
                $("#cidades > div:eq(" + i + ") > a > figure > figcaption > p").text(`${cities[i]}`);
                $("#cidades > div:eq(" + i + ") > a").attr('href', `/city=${cities[i]}`);
            }
        })
    });
});
