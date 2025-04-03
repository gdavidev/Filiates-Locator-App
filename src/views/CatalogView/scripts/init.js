export default class FlipBook {
    static initialize() {
        $("#flipbook").turn({
            width: $(".container").width() * 0.8, // Ajusta ao tamanho da tela
            height: $(".container").height() * 0.9,
            autoCenter: true,
            display: "double",
            acceleration: true,
            gradients: true,
            turnCorners: "bl",
        });

        // Botões de navegação
        $("#prev").click(function() {
            $("#flipbook").turn("previous");
        });

        $("#next").click(function() {
            $("#flipbook").turn("next");
        });

        // Ajusta para responsividade
        $(window).resize(function() {
            $("#flipbook").turn("size", $(".container").width() * 0.8, $(".container").height() * 0.9);
        });
    }
}
