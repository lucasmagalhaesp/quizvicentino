$("#form-contato").submit(function () {
    var url = 'contato/enviarContato';
    var dados = $(this).serialize();

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: dados,
        success: function (data) {
            if (!data.success) {
                if (data.errors) {
                    var erros = '';
                    $.each(data.errors, function (index, value) {
                        erros += "<li style='list-style: none'>" + value + "</li>";
                    });

                    $("#mensagem-retorno").html("<ul class='alert alert-danger'>" + erros + "</ul>");
                } else {
                    $("#mensagem-retorno").html("<p class='alert alert-danger'>" + data.msg + "</p>");
                }
            } else {
                $("#mensagem-retorno").html("<p class='alert alert-success'>" + data.msg + "</p>");
            }
        },
        error: function (data,dt2,dt3) {
            $("#mensagem-retorno").html("<p class='alert alert-danger'>Erro ao enviar a mensagem!</p>"+data);
        }
    });

    return false;
});
