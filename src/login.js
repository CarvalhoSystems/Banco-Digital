document.getElementById('submitBtn').addEventListener('click', (event) => {
    // 1. Previne o envio padrão do formulário, que recarregaria a página.
    event.preventDefault();

    // 2. Elementos do HTML
    const loginForm = document.getElementById('loginForm');
    const status = document.getElementById('status');
    const mensagemLogin = document.getElementById('mensagemLogin');

    // 3. Dados de login corretos (Como strings, o que é CORRETO para inputs.value)
    const agencyLogin = "1234";
    const accountLogin = "98765432";
    const cpfLogin = "1234567890";
    const passwordLogin = "123456";

    // 4. Obtém os valores atuais dos campos
    const agency = document.getElementById('agency').value;
    const account = document.getElementById('account').value;
    const cpf = document.getElementById('cpf').value;
    const password = document.getElementById('password').value;



    // 5. Validação (Ordem CORRETA: Vazio -> Sucesso -> Incorreto)

    if (agency === "" || account === "" || cpf === "" || password === "") {
        // Exemplo SweetAlert para campos vazios
        Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Por favor, preencha todos os campos.',
        });

        } else if (agency === agencyLogin && account === accountLogin && cpf === cpfLogin && password === passwordLogin) {
        // Login Bem-Sucedido
        Swal.fire({
            icon: 'success', // Ícone de sucesso (verde)
            title: 'Login Bem-Sucedido!',
            text: 'Você será redirecionado em breve.',
            showConfirmButton: false, // Não mostra o botão, pois vai redirecionar
            timer: 1500 // Fecha automaticamente em 1.5 segundos
            }).then(() => {

            window.location.href = "/pages/conta.html";

            });
        } else {
            // Exemplo SweetAlert para credenciais incorretas
            Swal.fire({
                icon: 'error', // Ícone de erro 
                title: 'Erro de Login',
                text: 'Credenciais incorretas. Tente novamente.',
            });
        }
        });

        // --- Correção: Selecionar o botão pelo ID e adicionar o evento ---
        const openAccountBtn = document.getElementById('openAccount');
        if (openAccountBtn) {
            openAccountBtn.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = "pages/newconta.html"; // Caminho para a página de cadastro
            });
        }