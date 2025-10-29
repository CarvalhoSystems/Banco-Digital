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

// --- Correção: Selecionar o botão pelo ID e adicionar o evento ---
const openAccountBtn = document.getElementById("openAccount");
if (openAccountBtn) {
  openAccountBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "newconta.html";
  });
}
