function pergunta(idPergunta){
	var url = 'perguntas/retornaPergunta/'+idPergunta;

	$('#exibePergunta').modal('show');

	$.ajax({
            url: url,
            success: function(data) {
                var data = JSON.parse(data);
                $("#lista-pergunta").html(data.pergunta.id+" - "+data.pergunta.descricao);

                var respostas = data.respostas;
                var respostaCerta;
                var alt = ["a","b","c","d"];
                var i = 0;
                $.each(respostas, function(indice, valor){
                    $("#lista-resposta-"+alt[i]).html(alt[i]+") "+valor.descricao);
                    if(data.respostaCerta == valor.id)
                        respostaCerta = alt[i];
                    i++;
                });

                $("#lista-resposta-certa").html(respostaCerta);

            },
            error: function() {
                  alert('Erro ao selecionar pergunta');
            }
	});
}

function excluirPergunta(idPergunta){
	var linkExclusao = 'perguntas/remover/'+idPergunta;
	$('#removerPergunta #btn-excluir').attr('onclick', 'window.location = \''+linkExclusao+'\'');
	$('#removerPergunta').modal('show');
	//alert('excluir a pergunta '+idPergunta);
}