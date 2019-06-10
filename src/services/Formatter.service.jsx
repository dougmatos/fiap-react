export class FormatterService{

    static formatPrice(price) {
        return price ? price.toLocaleString('pt-BR') : "não informado";
    }

    static formatSold(sold) {
        if (sold === 0) return "vendido: nenhum";
        if (sold === 1) return "vemdido: 1";
        return `vendidos: ${sold}`

    }

    static formatMercadoPago(acept) {
        return acept ? "aceita mercado pago" : "não aceita mercado pago: "
    }
}