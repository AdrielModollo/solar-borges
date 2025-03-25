document.getElementById('orcamentoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const dados = {
        titulo: encodeURIComponent("📊 NOVO ORÇAMENTO DE ENERGIA SOLAR"),
        nome: encodeURIComponent(document.getElementById('nome').value),
        cidade: encodeURIComponent(document.getElementById('cidade').value),
        info: encodeURIComponent(document.getElementById('informacoes').value)
    };

    const whatsappLink =
        `https://api.whatsapp.com/send/?phone=5516981790555` +
        `&text=` +
        `*${dados.titulo}*%0A%0A` +
        `*▪ Nome:* ${dados.nome}%0A` +
        `*▪ Cidade:* ${dados.cidade}%0A` +
        `*▪ Informações:* ${dados.info}%0A%0A` +
        encodeURIComponent("📎 Anexe sua conta de luz");

    window.open(whatsappLink, '_blank');
});

function calcular() {
    // Valores fixos atualizados
    const tarifaSP = 0.74; // R$/kWh
    const producaoMensalPorkWp = 122; // kWh/mês por kWp
    const potenciaModulo = 585; // Watts por módulo (Atualizado para 585W)
    const custoPorWatt = 2.98; // R$/W

    // Captura do valor da conta
    const contaMensal = parseFloat(document.getElementById('conta').value);

    if (isNaN(contaMensal) || contaMensal <= 0) {
        alert("Por favor, insira um valor válido para a conta.");
        return;
    }

    // Cálculos básicos
    const consumoMensal = contaMensal / tarifaSP;
    const potenciaNecessaria = parseFloat((consumoMensal / producaoMensalPorkWp).toFixed(2));

    // Cálculo do número de módulos (ajustado para 585W)
    const modulos = Math.ceil((potenciaNecessaria * 1000) / potenciaModulo);

    // Demais cálculos
    const areaNecessaria = Math.ceil(potenciaNecessaria * 6);
    const valorBase = potenciaNecessaria * 1000 * custoPorWatt;
    const valorSistemaMin = valorBase * 0.85;

    // Cálculo da produção e economia
    const producaoAnual = potenciaNecessaria * producaoMensalPorkWp * 12;
    const economiaAnual = producaoAnual * tarifaSP;
    const paybackMeses = Math.round(valorSistemaMin / (economiaAnual / 12));

    // Atualização dos resultados
    document.getElementById('economia').innerHTML = economiaAnual.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    document.getElementById('payback').innerHTML = `${paybackMeses} meses`;
    document.getElementById('area').innerHTML = `${areaNecessaria} m²`;
    document.getElementById('potencia').innerHTML = `${potenciaNecessaria} kWp`;
    document.getElementById('modulos').innerHTML = modulos;
    document.getElementById('producao').innerHTML =
        `${Math.round(potenciaNecessaria * producaoMensalPorkWp)} kWh/mês`;
    document.getElementById('valor').innerHTML =
        valorSistemaMin.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('resultado').style.display = "block";
}
