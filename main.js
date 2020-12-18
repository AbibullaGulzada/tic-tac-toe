var area = document.getElementById('area');
// 1присваиваем блок ареа по айди 
var cell = document.getElementsByClassName('cell');
// 2дальше у нас будет ячейки в ареа
var currentPlayer = document.getElementById('curPlyr');
//3 создаем  текущего игрока
var player = "x";
// записываем логику статистики
var stat = {
	'x': 0,
	'o': 0,
	'd': 0
}

// 6 находим выиграшные позиции
var winIndex = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7]
];
// 4 присваеваем в ареа ячейки через фор и вставляем внутренную html дивки
for (var i = 1; i <= 9; i++) {
	area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}
//5добавляем в каждом ячейке клик 
for (var i = 0; i < cell.length; i++) {
	cell[i].addEventListener('click', cellClick, false);
}
//5,1 и через функцию клилсел проверяем
function cellClick() {

	var data = [];
	//  проверяем заняты ли ячейка или нет 
	if (!this.innerHTML) {
		this.innerHTML = player;
	} else {
		alert("Ячейка занята");
		return;
	}
	//  в массив дата вводим играка
	for (var i in cell) {
		if (cell[i].innerHTML == player) {
			data.push(parseInt(cell[i].getAttribute('pos')));
		}
	}
	// проверяем выиграшные позиции игрока
	if (checkWin(data)) {
		stat[player] += 1;
		restart("Выграл: " + player);
	} else { //   проверяем логику положении ничьи
		var draw = true;
		for (var i in cell) {
			if (cell[i].innerHTML == '') draw = false;
		}  // после нам нужно очистить нашу клетку чтобы начать новую игру
		if (draw) {
			stat.d += 1;
			restart("Ничья");
		}
	}
	//  проверяем кто ходит х или 0?
	player = player == "x" ? "o" : "x";

	currentPlayer.innerHTML = player.toUpperCase();
}
// проверяем выиграшные позиции игрока
function checkWin(data) {
	for (var i in winIndex) {
		var win = true;
		for (var j in winIndex[i]) {
			var id = winIndex[i][j];
			var ind = data.indexOf(id);

			if (ind == -1) {
				win = false
			}
		}

		if (win) return true;
	}
	return false;
}

function restart(text) {

	alert(text);
	for (var i = 0; i < cell.length; i++) {
		cell[i].innerHTML = '';
	}
	//  выводим статистику в интерфейс
	updateStat();
}
// функция статистики
function updateStat() {
	document.getElementById('sX').innerHTML = stat.x;
	document.getElementById('sO').innerHTML = stat.o;
	document.getElementById('sD').innerHTML = stat.d;
}