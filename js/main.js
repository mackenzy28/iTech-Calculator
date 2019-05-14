
class Calculator {
	constructor(el) {
		this.el = el;
		console.log('initialised');
		this.displaySum = $(this.el).find('.display-sum');
		this.displayAnswer = $(this.el).find('.display-answer');
		this.number1 = '';
		this.number2 = '';
		this.operator = '';
		this.total = '';

		$('[data-action="clear"]').on("click", () => {
				this.clearDisplay();
		});

		$('[data-action="enter-number"]').on("click", (event) => {
				const numberEntered = event.target.textContent;
				this.displayNumber(event.target.textContent);
				if (this.operator === '') {
						this.number1 += numberEntered;
						console.log('number1:', this.number1);
				}
				else {
						this.number2 += numberEntered;
						console.log('number2:', this.number2);
				}
		});

		$('[data-action="enter-operator"]').on("click", (event) => {
			const operatorEntered = event.target.textContent;
			this.displayNumber(operatorEntered);
			if (this.operator != '') {
				this.calculateAnswer();
			}
			this.operator = operatorEntered;
			console.log('operator:', this.operator);
		});

		$('[data-action="calculate"]').on("click", (event) => {
			this.calculateAnswer();
		});
	}

	clearDisplay() {
		$(this.displaySum).empty();
		$(this.displayAnswer).empty();
		this.number1 = '';
		this.number2 = '';
		this.operator = '';
		this.total = '';
		console.log('clear');
	}

	displayNumber(number) {
		$(this.displaySum).append(number);
	}

	displayResult(result) {
		console.log('total:', this.total);
		$(this.displaySum).empty();
		$(this.displayAnswer).text(result);
	}

	updateVariables() {
		this.number1 = this.total;
		this.number2 = '';
		this.total = '';
	}

	calculateAnswer() {
		if (this.number1 != '' && this.number2 != '') {
			switch (this.operator) {
				case '+':
					this.total = +this.number1 + +this.number2;
					this.displayResult(this.total);
					break;
				case '-':
					this.total = +this.number1 - +this.number2;
					this.displayResult(this.total);
					break;
				case '×':
					this.total = +this.number1 * +this.number2;
					this.displayResult(this.total);
					break;
				case '÷':
					this.total = +this.number1 / +this.number2;
					this.displayResult(this.total);
					break;
			}
			this.updateVariables();
		}
	}
}

const calculator = new Calculator($('.calculator').get(0));