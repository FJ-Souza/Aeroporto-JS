describe("Testes para a função getEstacaoNome", function() {
    it("deve retornar 'Santa Maria - SE' quando o código for 'SBAR'", function() {
        expect(getEstacaoNome('SBAR')).toBe('Santa Maria - SE');
    });

    it("deve retornar 'Guarulhos - SP' quando o código for 'SBGR'", function() {
        expect(getEstacaoNome('SBGR')).toBe('Guarulhos - SP');
    });

    it("deve retornar 'Uberlândia - MG' quando o código for 'SBUL'", function() {
        expect(getEstacaoNome('SBUL')).toBe('Uberlândia - MG');
    });

    it("deve retornar 'Pampulha - MG' quando o código for 'SBBH'", function() {
        expect(getEstacaoNome('SBBH')).toBe('Pampulha - MG');
    });

    it("deve retornar 'Cabo Frio - RJ' quando o código for 'SBCB'", function() {
        expect(getEstacaoNome('SBCB')).toBe('Cabo Frio - RJ');
    });

    it("deve retornar 'Estação Desconhecida' para um código desconhecido", function() {
        expect(getEstacaoNome('XXXX')).toBe('Estação Desconhecida');
    });
});
