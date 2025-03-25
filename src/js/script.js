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