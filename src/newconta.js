document.getElementById('submitCadastroBtn').addEventListener('click', (event) => {
    // 1. Previne o envio padrão do formulário, que recarregaria a página.
    event.preventDefault();

    const CadastroForm = document.getElementById('cadastroForm');
    const nome = document.getElementById('nomeCompleto').value;
    const cpf = document.getElementById('cpf').value;
    const agencia = document.getElementById('numeroAgencia').value;
    const conta = document.getElementById('numeroconta').value;
    const senha = document.getElementById('senhaCadastro').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;



    if (nome === "" || cpf === "" || conta === "" || agencia === "" || senha === "" || confirmaSenha === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Por favor, preencha todos os campos.',
            });
    } else if (senha !== confirmaSenha) {
        Swal.fire({
            icon: 'error',
            title: 'Erro de Senha',
            text: 'As senhas não coincidem. Tente novamente.',
        });
    } else {

        // Salva nome e outras variaveis no localStorange 
        // Se vc tiver um sistemas de nuktiplos acesso o ideal e usar um array

        const novaConta = {
            nome: nome,
            cpf: cpf,
            agencia: agencia,
            conta: conta,
            senha: senha,
        };

        localStorage.setItem('novaConta', JSON.stringify(novaConta));

        Swal.fire({
            icon: 'success',
            title: 'Cadastro Bem-Sucedido!',
            text: 'Você será redirecionado em breve.',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href ="./index.html";
        });
    }
});