document.getElementById("submitBtn").addEventListener("click", (event) => {
  // 1. Previne o envio padrão do formulário, que recarregaria a página.
  event.preventDefault();

  // 4. Obtém os valores atuais dos campos
  const agency = document.getElementById("agency").value;
  const account = document.getElementById("account").value;
  const cpf = document.getElementById("cpf").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("status");

  // 1. Pega a string JSON do localStorage
  const contasCadastradasString = localStorage.getItem("contasCadastradas");

  if (contasCadastradasString) {
    // 2. Converte a string JSON de volta para um objeto JavaScript
    const contas = JSON.parse(contasCadastradasString);

    const contaLogada = contas.find(
      (conta) =>
        conta.agencia === agency &&
        conta.conta === account &&
        conta.senha === password
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
//==================================================================
// --- Correção: Selecionar o botão pelo ID e adicionar o evento ---
//==================================================================
const openAccountBtn = document.getElementById("openAccount");
if (openAccountBtn) {
  openAccountBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "newconta.html";
  });
}
//======================
// Esqueci a senha
//=======================

const esqueciSenha = document.getElementById("forgotBtn");
if (esqueciSenha) {
  esqueciSenha.addEventListener("click", (event) => {
    event.preventDefault();
    // 1. Abre o modal pedindo o CPF
    Swal.fire({
      title: "Redefinir Senha",
      text: "Para redefinir, digite seu CPF cadastrado:",
      input: "text", // Tipo de input
      inputPlaceholder: "000.000.000-00",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Buscar Conta",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Você precisa digitar o CPF!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const cpfDigitado = result.value;

        // chama a função
        tentarRedefinirSenha(cpfDigitado);
      }
    });
  });
}

//==============================================
// Novo Codigo : Função para Buscar e redefinir
//==============================================

function tentarRedefinirSenha(cpf) {
  // Pega as contas cadastradas do LocalStorage
  const contasCadastradasString = localStorage.getItem("contasCadastradas");

  if (!contasCadastradasString) {
    // Se não houver contas
    Swal.fire("Erro!", "Nenhuma conta cadastrada encontrada.", "error");
    return;
  }

  // Converte a string JSON para um array JavaScript
  let contas = JSON.parse(contasCadastradasString);

  // Busca a conta pelo CPF
  const indexConta = contas.findIndex((conta) => conta.cpf === cpf);

  if (indexConta === -1) {
    // Se o CPF não foi encontrado
    Swal.fire(
      "Conta não encontrada",
      "O CPF digitado não corresponde a nenhuma conta cadastrada.",
      "error"
    );
    return;
  }

  // Conta encontrada! Agora pede a nova senha.
  Swal.fire({
    title: "Conta Encontrada!",
    text: "Digite a sua nova senha:",
    input: "password", // Input de senha
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Atualizar Senha",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
      if (!value || value.length < 6) {
        // Regra básica de senha
        return "A senha deve ter pelo menos 6 caracteres!";
      }
    },
  }).then((resultNovaSenha) => {
    if (resultNovaSenha.isConfirmed) {
      const novaSenha = resultNovaSenha.value;

      // 3. Atualiza o objeto da conta com a nova senha
      contas[indexConta].senha = novaSenha;

      // 4. Salva o array atualizado de volta no LocalStorage
      localStorage.setItem("contasCadastradas", JSON.stringify(contas));

      // Sucesso!
      Swal.fire({
        title: "Sucesso!",
        text: "Sua senha foi atualizada. Tente fazer login agora.",
        icon: "success",
      });
    }
  });
}

const sair = document.getElementById("sair");

sair.addEventListener("click", (e) => {
  e.preventDefault();
  Swal.fire({
    title: "Deseja realmente sair?",
    icon: "warning",
    confirmButtonText: "Sim, sair!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../index.html";
    }
  });
});
