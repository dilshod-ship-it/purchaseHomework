import {Purchase} from './lib.js';

const rootEl = document.getElementById('root');
rootEl.innerHTML = `
	<form data-id="purchases-add-form">
	<label for="purchases-name">Введите сумму</label>
	<input id="purchases-name" data-id="purchases-summ" placeholder="Введите сумму" />

	<label for="purchases-name-category">Категория</label>
	<input id="purchases-name-category" data-id="purchases-category" placeholder="Категория" />
	
	<button id="add" data-action="add">Добавить</button>
	</form>
	<ul data-id="purchases-list"></ul>
	<div data-id="purchases-total"></div>
`;

const purchasesAddFormEl = rootEl.querySelector('[data-id=purchases-add-form]');

const purchasesTotalEl = rootEl.querySelector('[data-id=purchases-total]');

const purchasesAddButtonEl = purchasesAddFormEl.querySelector('[data-action=add]');

const purchasesCategoryEl = purchasesAddFormEl.querySelector('[data-id=purchases-category]');

const purchasesSummEl = purchasesAddFormEl.querySelector('[data-id=purchases-summ]');

const purchasesListEl = rootEl.querySelector('[data-id=purchases-list]');

let purchasesTotal = 0;
purchasesAddButtonEl.onclick = evt => {
	evt.preventDefault();

	// itemEl.innerHTML = `${purchasesCategoryEl.value}`;
	const value = purchasesSummEl.value;
	const category = purchasesCategoryEl.value;

	const purchase = new Purchase (value, category);

	purchasesTotal +=parseInt(value, 10);
	purchasesTotalEl.textContent = `Сумма: ${purchasesTotal}`;

	const purchaseEl = document.createElement('li');
	purchaseEl.innerHTML = `
		Покупка на сумму ${value}, в категории ${category} 
		<button data-action="remove">x</button>
		<button data-action="up">↑</button>
		<button data-action="down">↓</button>
	`;

	purchaseEl._purchase = purchase; 

	const purchaseRemoveButtonEl = purchaseEl.querySelector('[data-action=remove]');
	purchaseRemoveButtonEl.onclick = () => {

		purchaseEl.remove();
		purchasesTotal -= value;

	}

	const purchaseUpButtonEl = purchaseEl.querySelector('[data-action=up]');
	purchaseUpButtonEl.onclick= () =>
	{
		if(purchaseEl == purchaseEl.parentNode.firstChild) {
			purchasesListEl.insertBefore(purchaseEl, null);
		} else {
			purchasesListEl.insertBefore(purchaseEl, purchaseEl.previousSibling);
		};
	}

	 const purchaseDownButtonE1 = purchaseEl.querySelector('[data-action=down]');
    purchaseDownButtonE1.onclick = () => 
    {
        if(purchaseEl == purchaseEl.parentNode.lastChild)
        {
            purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstElementChild);
        }
        else
        {
            purchasesListEl.insertBefore(purchaseEl.nextSibling,purchaseEl);
        }
    };

	purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstElementChild);

	purchasesSummEl.value = '';
	purchasesCategoryEl.value = '';
	purchasesSummEl.focus(); 

	console.dir(purchasesListEl.children);
};
