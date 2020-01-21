const rootEl = document.getElementById('root');
rootEl.innerHTML = `
	<form data-id="purchases-add-form">
	<label for="purchases-name">Введите сумму</label>
	<input id="purchases-name" data-id="purchases-summ" placeholder="Введите сумму" />

	<label for="purchases-name-category">Категория</label>
	<input id="purchases-name-category" data-id="purchases-category" placeholder="Категория" />
	
	<button data-action="add">Добавить</button>
	</form>
	<ul data-id="purchases-list"></ul>
	<div id="purchases-total"></div>
`;

const purchasesAddFormEl = rootEl.querySelector('[data-id=purchases-add-form]');

const purchasesTotalEl = rootEl.querySelector('[id=purchases-total]');

const purchasesAddButtonEl = purchasesAddFormEl.querySelector('[data-action=add]');

const purchasesCategoryEl = purchasesAddFormEl.querySelector('[data-id=purchases-category]');

const purchasesSummEl = purchasesAddFormEl.querySelector('[data-id=purchases-summ]');

const purchasesListEl = rootEl.querySelector('[id=purchases-total]');

let purchasesTotal = 0;
purchasesAddButtonEl.onclick = evt => {
	evt.preventDefault();

	// itemEl.innerHTML = `${purchasesCategoryEl.value}`;
	const value = purchasesSummEl.value;
	const category = purchasesCategoryEl.value;
	purchasesTotal +=parseInt(value, 10);
	purchasesTotalEl.textContent = `Сумма: ${purchasesTotal}`;

	const purchaseEl = document.createElement('li');
	purchaseEl.innerHTML = `
		Покупка на сумму ${value}, в категории ${category}
	`;

	purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstElementChild);

	purchasesSummEl.value = '';
	purchasesCategoryEl.value = '';
	purchasesSummEl.focus(); //браузер настолько умный =, что с другого элемента фокус уберет
};






