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


const purchases = [];

purchasesAddButtonEl.onclick = evt => {
	evt.preventDefault();

	// itemEl.innerHTML = `${purchasesCategoryEl.value}`;
	const value = parseInt(purchasesSummEl.value, 10);
	const category = purchasesCategoryEl.value;

	const purchase = new Purchase (value, category);

	purchases.push(purchase); // add object to massive

	rebuildList();

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
	purchases.sort((a,b) => - (a.amount - b.amount));
	rebuildList();
};

sortByPriceAscButtonEl.onclick = () => {

	purchases.sort((a,b) => a.amount - b.amount);
	rebuildList();
}

function rebuildList() {
	//  0 -> x -> map

	purchases.map(o => {
		const el = document.createElement('li');
		el.innerHTML = `
		Покупка на сумму ${o.amount}, в категории ${o.category} 
		<button data-action="remove">Удалить</button>
		<button data-action="up">↑</button>
		<button data-action="down">↓</button>
		`;
		return el;
	}).forEach(o => purchasesListEl.appendChild(o));
}