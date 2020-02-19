function verificaUser(){
    
    var dados = $('#form-login').serialize();
    var url = 'login/verificaUser';

    $.ajax({
        url: url,
        data: dados,
        dataType: "json",
        success: function(data) {
            //var data = JSON.parse(data);
            if (data.erro != undefined){
                $('#cadastrarEmail').modal('show');
                //seta o campo hidden com o valor do login atual do usuário, que será trocado pelo e-mail informado
                $('#login-atual').val(data.email);
                return false;
            }else{ 
                $('#form-login').submit();
            }
        },
        error: function(a,b,c) {
            alert('Erro ao validar usuário: '+c);
        }
    });

    return false;
}

function cadastrarEmail(){
    var dados = $('#informa-email').serialize();
    var url = 'login/cadastrarEmail';
    
    $.ajax({
        url: url,
        data: dados,
        dataType: "json",
        success: function(data) {
            if (data == 'email incorreto'){
                $('#msg-form').show().attr('class','alert alert-danger').html("Favor informar um e-mail válido!");
            } else if(data == false){
                $('#msg-form').show().attr('class','alert alert-danger').html("Erro ao cadastrar o e-mail. Tente novamente!");
            }else{
                $('#msg-form').show().attr('class','alert alert-success').html('E-mail cadastrado com sucesso! Utilize-o para acessar o sistema.');
            }
        },
        error: function(a,b,c) {
            alert('Erro ao cadastrar e-mail: '+b);
        }
    });

    return false;
}