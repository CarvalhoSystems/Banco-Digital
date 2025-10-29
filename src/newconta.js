document
  .getElementById("submitCadastroBtn")
  .addEventListener("click", (event) => {
    // 1. Previne o envio padrão do formulário, que recarregaria a página.
    event.preventDefault();

    const CadastroForm = document.getElementById("cadastroForm");
    const nome = document.getElementById("nomeCompleto").value.trim(); // Adicionei .trim()
    const cpf = document.getElementById("cpf").value.trim();
    const agencia = document.getElementById("numeroAgencia").value.trim();
    const conta = document.getElementById("numeroconta").value.trim();
    const senha = document.getElementById("senhaCadastro").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;

    if (
      nome === "" ||
      cpf === "" ||
      conta === "" ||
      agencia === "" ||
      senha === "" ||
      confirmaSenha === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Atenção!",
        text: "Por favor, preencha todos os campos.",
      });
    } else if (senha !== confirmaSenha) {
      Swal.fire({
        icon: "error",
        title: "Erro de Senha",
        text: "As senhas não coincidem. Tente novamente.",
      });
    } else {
      // 1. TENTA OBTER A LISTA DE CONTAS EXISTENTES (usando a chave 'contasCadastradas')
      // Se não existir, retorna uma string vazia para o JSON.parse
      const contasString = localStorage.getItem("contasCadastradas");

      // 2. CONVERTE para um Array (ou inicia um array vazio se for a primeira conta)
      let contas = [];
      try {
        contas = contasString ? JSON.parse(contasString) : [];
      } catch (e) {
        console.error("Erro ao ler contas do localStorage:", e);
        // Em caso de erro de leitura, começa com uma lista vazia para evitar travamentos
        contas = [];
      }

      // 3. Verifica se a conta (número + agência) já existe para evitar duplicidade
      const contaExistente = contas.find(
        (c) => c.conta === conta && c.agencia === agencia
      );
      if (contaExistente) {
        Swal.fire({
          icon: "error",
          title: "Erro de Cadastro",
          text: "Esta conta e agência já estão cadastradas.",
        });
        return; // Sai da função para não cadastrar
      }

      // 4. Cria o objeto da nova conta (incluindo saldo inicial, que é crucial)
      const novaConta = {
        nome: nome.trim(),
        cpf: cpf.trim(),
        agencia: agencia.trim(),
        conta: conta.trim(),
        senha: senha.trim(),
        saldo: 0, // CRUCIAL: Adicione um saldo inicial!
      };

      // 5. ADICIONA A NOVA CONTA à lista
      contas.push(novaConta);

      // 6. SALVA A LISTA COMPLETA de volta no localStorage
      localStorage.setItem("contasCadastradas", JSON.stringify(contas));

      // REMOVIDO: localStorage.setItem("novaConta", JSON.stringify(novaConta)); // Esta linha não é mais necessária

      Swal.fire({
        icon: "success",
        title: "Cadastro Bem-Sucedido!",
        text: "Você será redirecionado em breve.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "index.html";
      });
    }
  });
