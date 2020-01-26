import {Purchase} from './lib.js';

const rootEl = document.getElementById('root');
rootEl.innerHTML = `
	<form data-id="purchases-add-form">
	<label for="purchases-name">Введите сумму</label>
	<input id="purchases-name" data-id="purchases-summ" placeholder="Введите сумму" />

	<label for="purchases-name-category">Категория</label>
	<input id="purchases-name-category" data-id="purchases-category" placeholder="Категория" />
	
	<button data-action="add">Добавить</button>
	</form>
	<div>
		<button data-action="no-sort">Нет сортировки</button>
		<button data-action="sort-by-price-desc">По цене (по убыванию)</button>
		<button data-action="sort-by-price-asc">По цене (по возрастанию)</button>
	</div>
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
		<button data-action="remove">Удалить</button>
		<button data-action="up">↑</button>
		<button data-action="down">↓</button>
	`;

	purchaseEl._purchase = purchase; // сами в Dom элемент добавляем собственное свойство
	// _ - означает, что это свойтсво для служебных целей
	// __ - вообще не трогай

	const purchaseRemoveButtonEl = purchaseEl.querySelector('[data-action=remove]');
	purchaseRemoveButtonEl.onclick = () => {
		// purchaseEl.parentElement.removeChild(purchaseEl);

		purchaseEl.remove();
		purchasesTotal -= value;

		purchasesTotalEl.textContent = `Сумма: ${purchasesTotal}`;
	}

	purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstElementChild);

	purchasesSummEl.value = '';
	purchasesCategoryEl.value = '';
	purchasesSummEl.focus(); //браузер настолько умный =, что с другого элемента фокус уберет

	console.dir(purchasesListEl.children); // смотрим на детей
};

const noSortButtonEl = document.querySelector('[data-action=no-sort]');
const sortByPriceDescButtonEl = document.querySelector('[data-action=sort-by-price-desc]');
const sortByPriceAscButtonEl = document.querySelector('[data-action=sort-by-price-asc]');

noSortButtonEl.onclick = () => {

};

sortByPriceDescButtonEl.onclick = () => {
	// Ошибка: is not a function
	// sort ->  Array.prototype
	const purchases = Array.from(purchasesListEl.children);
	purchases.sort((a,b) => - (a._purchase.amount - b._purchase.amount));
	console.log(purchases);
	for (const purchase of purchases) {
		purchasesListEl.appendChild(purchase);
	}
};

sortByPriceAscButtonEl.onclick = () => {

	const purchases = Array.from(purchasesListEl.children);
	purchases.sort((a,b) => a._purchase.amount - b._purchase.amount);
	console.log(purchases);
	for (const purchase of purchases) {
		purchasesListEl.appendChild(purchase);
	}
}