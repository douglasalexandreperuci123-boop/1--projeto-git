const convertButton = document.querySelector(".convert-Button");
const currencyDestinoSelect = document.querySelector(".currency-select");
const currencyOrigemSelect = document.querySelector(".currency-options");
const inputCurrency = document.querySelector(".input-currency");
const currencyValueConvert = document.querySelector(".currency-value");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyName = document.getElementById("currency-name");
const currencyImg = document.querySelector(".currency-img");

const TaxasBRL = {
  BRL: 1,
  USD: 5.2,
  EUR: 6.2,
  GBP: 7.2,
};

function getLocale(currency) {
  const locales = {
    BRL: "pt-BR",
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
  };
  return locales[currency] || "en-US";
}

 function convertValues  ()   {
  const valorInput = Number(inputCurrency.value);
  const moedaOrigem = currencyOrigemSelect.value.toUpperCase();
  const moedaDestino = currencyDestinoSelect.value.toUpperCase();

  if (!valorInput || valorInput <= 0) {
    currencyValueConvert.innerHTML = "Digite um valor válido";
    currencyValueToConvert.innerHTML = "";
    return;
  }
  
  
  const valorEmReal = valorInput * TaxasBRL[moedaOrigem];
  const valorConvertido = valorEmReal / TaxasBRL[moedaDestino];

  currencyValueToConvert.innerHTML = new Intl.NumberFormat(getLocale(moedaOrigem), {
    style: "currency",
    currency: moedaOrigem,
  }).format(valorInput);

  currencyValueConvert.innerHTML = new Intl.NumberFormat(getLocale(moedaDestino), {
    style: "currency",
    currency: moedaDestino,
  }).format(valorConvertido);
}

function changeCurrency() {
  const moedaDestino = currencyDestinoSelect.value.toUpperCase();

  if (moedaDestino === "USD") {
    currencyName.innerHTML = "Dólar Americano";
    currencyImg.src = "./assets/Dolar.png";
  } else if (moedaDestino === "EUR") {
    currencyName.innerHTML = "Euro";
    currencyImg.src = "./assets/Euro.png";
  } else if (moedaDestino === "GBP") {
    currencyName.innerHTML = "Libra";
    currencyImg.src = "./assets/Libra.png";
  } else if (moedaDestino === "BRL") {
    currencyName.innerHTML = "Real Brasileiro";
    currencyImg.src = "./assets/Real.png";
  }

  convertValues();
}

const currencyOrigemImg = document.querySelector(".Moeda");

function changeCurrencyOrigem() {
  const moedaOrigem = currencyOrigemSelect.value.toUpperCase();

  if (moedaOrigem === "USD") {
    currencyOrigemImg.src = "./assets/Dolar.png";
  } else if (moedaOrigem === "EUR") {
    currencyOrigemImg.src = "./assets/Euro.png";
  } else if (moedaOrigem === "GBP") {
    currencyOrigemImg.src = "./assets/Libra.png";
  } else if (moedaOrigem === "BRL") {
    currencyOrigemImg.src = "./assets/Real.png";
  }

  convertValues();
}

const optionsDestino = currencyDestinoSelect.querySelectorAll("option");

function bloquearOpcaoDestino() {
  const moedaOrigem = currencyOrigemSelect.value;

  optionsDestino.forEach(option => {
    option.disabled = (option.value === moedaOrigem);
  });

  if (currencyDestinoSelect.value === moedaOrigem) {
    const primeiraDisponivel = Array.from(optionsDestino).find(opt => !opt.disabled);
    if (primeiraDisponivel) {
      currencyDestinoSelect.value = primeiraDisponivel.value;
      changeCurrency();
      convertValues();
    }
  }
}

currencyOrigemSelect.addEventListener("change", () => {
  bloquearOpcaoDestino();
  changeCurrencyOrigem();
  convertValues();
});

currencyOrigemSelect.addEventListener("change", changeCurrencyOrigem);
convertButton.addEventListener("click", convertValues);
currencyDestinoSelect.addEventListener("change", changeCurrency);
currencyOrigemSelect.addEventListener("change", convertValues);
inputCurrency.addEventListener("input", convertValues);