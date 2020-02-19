$('document').ready(function (){
    cronometro();
});

var segundos = 60;
var tempoResposta;

function verificaResposta(){
    var respostaUsuario = $("input:radio[name=resposta_usuario]:checked").val();
    var respostaCerta = $("#resposta_certa").val();
    
   // alert('Resposta Usuário: '+respostaUsuario+', Resposta Certa: '+respostaCerta);

    pararCronometro();
    //tempoResposta = 60 - $("#cronometro").html();
    tempoResposta = 60 - (parseInt($(".progress-label > .pull-right").html()));
    var numPergunta = $("#num-pergunta").html();

    $("#btn_confirmar").attr("disabled", "disabled");
    $("#div_btn_confirmar").css("display", "none");

    $("#btn_proxima").attr("disabled", false);
    $("#div_btn_proxima").css("display", "block");

    if (respostaUsuario == respostaCerta){
        var resultado = {mensagem: "<span type='span' class='label label-success'>RESPOSTA CERTA!!!</span>", acertou: 'true', tempoResposta: tempoResposta};
    }else{
        var resultado = {mensagem: "<span type='span' class='label label-danger'>RESPOSTA ERRADA!!!</span>", acertou: 'false', tempoResposta: tempoResposta};
    }

    var url = 'resposta/'+resultado.acertou+'/'+resultado.tempoResposta+'/'+respostaUsuario+'/'+numPergunta;

    $.ajax({
        url: url,
        success: function(data) {
            var data = JSON.parse(data);
            $("#num-acertos").html(data.acertos);
            $("#tempo-resposta").html(data.tempoResposta);
        },
        error: function(xhr,status,error) {
            alert(error);
        }
    });

    $("#resultado").html(resultado.mensagem);
}


function cronometro(){
    interval = setInterval("contador()", 1000);
}

function contador(){
    if (segundos == 0){
        pararCronometro();
        $("#tempoEsgotado").modal();
        $("input:radio[name=resposta_usuario]").attr("disabled", "disabled");
        $("#btn_confirmar").attr("disabled", "disabled");
        $("#btn_proxima").attr("disabled", false);
        $(".progress > .progress-bar").css("width", "0");
    }else{
        if(segundos == 60){
            larguraInicial = $(".progress > .progress-bar").css("width");
            larguraPorSegundo = parseFloat(parseFloat(larguraInicial) / 60);
        }
        //$("#cronometro").html(--segundos);
        $(".progress-label > .pull-right").html(--segundos);
        var larguraAtual = $(".progress > .progress-bar").css("width");
        var novaLargura = (parseFloat(larguraAtual)) - (parseFloat(larguraPorSegundo));
        $(".progress > .progress-bar").css("width", novaLargura);
    }
}

function pararCronometro(){
    clearInterval(interval);
}