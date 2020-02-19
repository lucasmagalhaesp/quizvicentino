function exibeDados(posicao){
    let dataHora = $("#data_hora_"+posicao).html();
    let pontuacao = $("#pontuacao_"+posicao).html();
    let tempo = $("#tempo_"+posicao).html();
    
    $("#md_data_hora").html(dataHora);
    $("#md_pontuacao").html(pontuacao);
    $("#md_tempo").html(tempo);
    
    $("#info_ranking").modal();
}