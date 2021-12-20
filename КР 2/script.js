const totalCost = document.getElementById('total-cost'),
      anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

const totalCostRange = document.getElementById('total-cost-range'),
      anInitialFeeRange = document.getElementById('an-initial-fee-range'),
      creditTermRange = document.getElementById('credit-term-range');

    
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
      totalMothlyPayment = document.getElementById('monthly-payment'),
      totalRecommendedIncome = document.getElementById('recommended-income');

const inputsRange = document.querySelectorAll('.input-range');

const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
  totalCost.value = totalCostRange.value;
  anInitialFee.value = anInitialFeeRange.value;
  creditTerm.value = creditTermRange.value;
}

assignValue();

const banks = [
  {
    name: 'alfa',
    precents: 8.7
  },
  {
    name: 'sberbank',
    precents: 8.4
  },
  {
    name: 'pochta',
    precents: 7.9
  },
  {
    name: 'tincoff',
    precents: 9.2
  }
];

let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
  bank.addEventListener('click', ()=> {
    for (let item of bankBtns) {
      item.classList.remove('active');
    }
    bank.classList.add('active');
    takeActiveBank(bank);
  })
}

const takeActiveBank = currentActive => {
  const dataAttrValue = currentActive.dataset.name;
  const currentBank = banks.find( bank => bank.name === dataAttrValue);
  currentPrecent = currentBank.precents;
  calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

for (let input of inputsRange) {
  input.addEventListener('input', ()=> {
    assignValue();
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
  })
}

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
  let monthlyPayment;
  let lounAmount = totalCost - anInitialFee;
  let interestRate = currentPrecent;
  let numberOfYears = creditTerm;
  let numberOfMonths = 12 * numberOfYears;

  monthlyPayment = (lounAmount + (((lounAmount/100)*interestRate) / 12) * numberOfMonths) / numberOfMonths;

  const monthlyPaymentRounded = Math.round(monthlyPayment);
  if (monthlyPaymentRounded < 0) {
    return false;
  }
  else {
    totalAmountOfCredit.innerHTML = `${lounAmount} p`;
    totalMothlyPayment.innerHTML = `${monthlyPaymentRounded} p`;
    totalRecommendedIncome.innerHTML = `${monthlyPaymentRounded + ((monthlyPaymentRounded / 100) * 35)}p`;
  }
}
