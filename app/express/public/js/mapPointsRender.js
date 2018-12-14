$.get(`/route/${id}`, (route) => {
    console.log(route);
    $("#PoI").append("<h4 id='title'></h4>")
    $("#title").html(route.Nome);

    $.get("./partials/indexImage.html", (localsHtml) => {
        for (let i = 0; i < route.PoI.length; i++) {
            $("#PoI").append("<div>" + localsHtml + "</div>");
            $("#PoI > div:eq(" + i + ") > a > figure > img").attr('src', `../image/imagens/${route.PoI[i].Img}`);
            $("#PoI > div:eq(" + i + ") > a > figure > img > figcaption").attr('value', `${route.PoI[i].Nome}`);
            $("#PoI > div:eq(" + i + ") > a > figure > figcaption > p").text(`${route.PoI[i].Nome}`);
        }
    })
});


function initmap() {
    $.get('/getJSONFile/locationInfo.json', (coords) => {
        let center = JSON.parse(coords);
        L.mapquest.key = 'DaaGkPe6Uv6Zs2PmYaGpXLGpGDPBr1w9'
        var map = L.mapquest.map('map', {
            center: [center.Latitude, center.Longitude],
            layers: L.mapquest.tileLayer('map'),
            zoom: 60
        });
        map.addControl(L.mapquest.control());

        $.get(`/route/${id}`, (rota) => {
            let waypointL = [];
            for (let i = 0; i < rota.PoI.length - 1; i++) {
                waypointL.push(rota.PoI[i].coordenadas.coordinates)
            }
            L.mapquest.directions().route({
                start: [center.Latitude, center.Longitude],
                end: `${rota.PoI[rota.PoI.length - 1].coordenadas.coordinates}`,
                waypoints: waypointL,

                options: {
                    routeType: 'pedestrian'
                }
            })
        })
    })
}

