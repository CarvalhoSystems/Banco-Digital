class ContaBancaria {
  constructor(storageKey = "contaData") {
    this.storageKey = storageKey;
    const raw = localStorage.getItem(this.storageKey);
    const data = raw ? JSON.parse(raw) : { saldoCents: 0, transactions: [] };
    this.saldoCents = Number(data.saldoCents) || 0;
    this.transactions = Array.isArray(data.transactions) ? data.transactions : [];
  }

  atualizarStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify({
      saldoCents: this.saldoCents,
      transactions: this.transactions
    }));
  }

  formatCents(cents) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
  }

  parseToCents(valor) {
    if (!valor) return NaN;
    const str = String(valor).trim().replace(',', '.');
    const num = Number(str);
    if (isNaN(num)) return NaN;
    return Math.round(num * 100);
  }

  depositar(valor) {
    const cents = this.parseToCents(valor);
    if (isNaN(cents) || cents <= 0) return { ok:false, message:"Valor inválido para depósito." };
    if (cents > 10000 * 100) return { ok:false, message:"Valor máximo para depósito é R$10.000,00." };

    this.saldoCents += cents;
    this.transactions.push({ type: "Depósito", amountCents: cents, dateISO: new Date().toISOString() });
    this.atualizarStorage();
    return { ok:true, message:`Depósito de ${this.formatCents(cents)} realizado com sucesso!` };
  }

  sacar(valor) {
    const cents = this.parseToCents(valor);
    if (isNaN(cents) || cents <= 0) return { ok:false, message:"Valor inválido para saque." };
    if (cents > this.saldoCents) return { ok:false, message:"Saldo insuficiente para saque." };

    this.saldoCents -= cents;
    this.transactions.push({ type: "Saque", amountCents: cents, dateISO: new Date().toISOString() });
    this.atualizarStorage();
    return { ok:true, message:`Saque de ${this.formatCents(cents)} realizado com sucesso!` };
  }

  getSaldoFormatado() { return this.formatCents(this.saldoCents); }
  listarTransacoes(limit = 100) {
    return this.transactions.slice().reverse().slice(0, limit);
  }

  limparConta() {
    this.saldoCents = 0;
    this.transactions = [];
    this.atualizarStorage();
  }
}

// ===== UI =====
const conta = new ContaBancaria();
const valorInput = document.getElementById('valor');
const resultadoDiv = document.getElementById('resultado');
const historicoUl = document.getElementById('historico');

function mostrarMensagem(msg, destaque=false) {
  resultadoDiv.innerHTML = (destaque ? `<strong>${msg}</strong>` : msg) +
    `<div style="margin-top:6px">Saldo atual: <strong>${conta.getSaldoFormatado()}</strong></div>`;
}
function atualizarHistorico() {
  const txs = conta.listarTransacoes(50);
  historicoUl.innerHTML = "";
  if (txs.length === 0) {
    historicoUl.innerHTML = "<li class='small meta'>Sem transações</li>";
    return;
  }
  txs.forEach(t => {
    const li = document.createElement('li');
    const date = new Date(t.dateISO).toLocaleString('pt-BR');
    li.innerHTML = `<div><strong>${t.type}</strong> — ${conta.formatCents(t.amountCents)}</div>
                    <div class="meta">${date}</div>`;
    historicoUl.appendChild(li);
  });
}

// Botões
document.getElementById('deposito').addEventListener('click', () => {
  const res = conta.depositar(valorInput.value);
  mostrarMensagem(res.message, res.ok);
  atualizarHistorico();
  if (res.ok) valorInput.value = "";
});
document.getElementById('saque').addEventListener('click', () => {
  const res = conta.sacar(valorInput.value);
  mostrarMensagem(res.message, res.ok);
  atualizarHistorico();
  if (res.ok) valorInput.value = "";
});
document.getElementById('consultar').addEventListener('click', () => {
  mostrarMensagem("Consulta de saldo efetuada.");
  atualizarHistorico();
});
document.getElementById('limpar').addEventListener('click', () => {
  if (confirm("Deseja realmente zerar a conta e apagar histórico?")) {
    conta.limparConta();
    mostrarMensagem("Conta zerada.", true);
    atualizarHistorico();
  }
});
document.getElementById('sair').addEventListener('click', () => {
  resultadoDiv.innerHTML = "Sessão encerrada. Até logo!";
});

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  mostrarMensagem("Bem-vindo! Conta carregada.");
  atualizarHistorico();
});

document.getElementById('sair').addEventListener('click', () => {
  window.location.href = "./login.html";
});