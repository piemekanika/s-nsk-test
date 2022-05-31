type FormatCurrency = (amount: number) => string;

const formatCurrency: FormatCurrency = amount => {
    return new Intl
        .NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB',
        })
        .format(amount);
};

export default formatCurrency;
