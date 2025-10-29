document.getElementById("submitBtn").addEventListener("click", (event) => {
  // 1. Previne o envio padrão do formulário, que recarregaria a página.
  event.preventDefault();

  // 2. Elementos do HTML
  const loginForm = document.getElementById("loginForm");
  const status = document.getElementById("status");
  const mensagemLogin = document.getElementById("mensagemLogin");

  // 3. Dados de login corretos (Como strings, o que é CORRETO para inputs.value)
  const agencyLogin = "0123";
  const accountLogin = "543219";
  const cpfLogin = "11122233344";
  const passwordLogin = "102030";

  // 4. Obtém os valores atuais dos campos
  const agency = document.getElementById("agency").value;
  const account = document.getElementById("account").value;
  const cpf = document.getElementById("cpf").value;
  const password = document.getElementById("password").value;

  // 5. Validação (Ordem CORRETA: Vazio -> Sucesso -> Incorreto)

  if (agency === "" || account === "" || cpf === "" || password === "") {
    // Exemplo SweetAlert para campos vazios
    Swal.fire({
      icon: "warning",
      title: "Atenção!",
      text: "Por favor, preencha todos os campos.",
    });
  } else if (
    agency === agencyLogin &&
    account === accountLogin &&
    cpf === cpfLogin &&
    password === passwordLogin
  ) {
    // Login Bem-Sucedido
    Swal.fire({
      icon: "success", // Ícone de sucesso (verde)
      title: "Login Bem-Sucedido!",
      text: "Você será redirecionado em breve.",
      showConfirmButton: false, // Não mostra o botão, pois vai redirecionar
      timer: 1500, // Fecha automaticamente em 1.5 segundos
    }).then(() => {
      window.location.href = "../conta.html";
    });
  } else {
    // Exemplo SweetAlert para credenciais incorretas
    Swal.fire({
      icon: "error", // Ícone de erro
      title: "Erro de Login",
      text: "Credenciais incorretas. Tente novamente.",
    });
  }
});

// --- Correção: Selecionar o botão pelo ID e adicionar o evento ---
const openAccountBtn = document.getElementById("openAccount");
if (openAccountBtn) {
  openAccountBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../newconta.html";
  });
}

// ... na sua função de login em index.html
document.getElementById("submitLoginBtn").addEventListener("click", (event) => {
  event.preventDefault();

  const loginAgencia = document.getElementById("agenciaLogin").value;
  const loginConta = document.getElementById("contaLogin").value;
  const loginSenha = document.getElementById("senhaLogin").value;

  // 1. Pega a string JSON do localStorage
  const contasCadastradasString = localStorage.getItem("contasCadastradas");

  if (contasCadastradasString) {
    // 2. Converte a string JSON de volta para um objeto JavaScript
    const contas = JSON.parse(contasCadastradasString);

    const contaLogada = contas.find(
      (conta) =>
        conta.agencia === loginAgencia &&
        conta.conta === loginConta &&
        conta.senha === loginSenha
    );

    if (contaLogada) {
      // Sucesso no Login!
      localStorage.setItem("usuarioLogado", JSON.stringify(contaLogada));

      Swal.fire({
        icon: "success",
        title: "Login Bem-Sucedido!",
        text: "Acesso liberado.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Redireciona para a página principal (ex: dashboard)
        window.location.href = "conta.html";
      });
    } else {
      // Falha no Login
      Swal.fire({
        icon: "error",
        title: "Erro de Login",
        text: "Agência, Conta ou Senha inválidos.",
      });
    }
  } else {
    // Nenhum usuário cadastrado encontrado
    Swal.fire({
      icon: "error",
      title: "Erro de Login",
      text: "Nenhuma conta encontrada. Cadastre-se primeiro.",
    });
  }
});
