
$(document).ready(function() {
	class Calculator {
		constructor(el) {
			this.el = el;
			console.log('initialised');
			this.displayPanel = $(this.el).find('.display-sum');
			this.displaySum = $(this.el).find('.display-sum span');
			this.displayAnswer = $(this.el).find('.display-answer span');
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
				const formattedOperator = ` ${operatorEntered} `;
				this.displayNumber(formattedOperator);
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
			$(this.displaySum).text('0');
			$(this.displayAnswer).empty();
			this.number1 = '';
			this.number2 = '';
			this.operator = '';
			this.total = '';
			this.displaySum.removeAttr('style');
			this.displayAnswer.removeAttr('style');
			console.log('clear');
		}
	
		displayNumber(number) {
			if (this.number1 === '') {
				$(this.displaySum).empty();
			}
			$(this.displaySum).append(number);
			this.ManageDisplayFont(this.displaySum);
		}
	
		displayResult(result) {
			console.log('total:', this.total);
			$(this.displaySum).empty();
			$(this.displayAnswer).text(result);
			this.displayAnswer.removeAttr('style');
			this.ManageDisplayFont(this.displayAnswer);
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

		ManageDisplayFont(display) {
			let displayPanelWidth = this.displayPanel.innerWidth();
			let sumWidth = display.innerWidth();
			let sumFontSize = parseInt(display.css('fontSize'));

			while (sumWidth >= displayPanelWidth) {
				sumFontSize--;
				display.css('fontSize', `${sumFontSize}.px`);
				sumWidth = display.innerWidth();
			}
		}
	}

	const calculator = new Calculator($('.calculator').get(0));
});
