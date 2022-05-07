import * as React from 'react';
import './App.css';

interface KsenProps {

}

interface KsenState {
	isQuestions: boolean;
	isYes: boolean;
	questionIndex: number;
	cardIndex: number;
}

export class Ksen extends React.PureComponent<KsenProps, KsenState> {
	constructor(props: KsenProps) {
		super(props);
		this.state = {cardIndex: 0, isQuestions: false, isYes: false, questionIndex: 0};
	}

	private _cards: {text: string[]}[] = [
		{text: ['Я счастлив, что встретил тебя.', 'Ты именно тот человек, которого я вижу рядом с собой.', 'Безвозвратно.']},
		{text: ['Мы допустили много ошибок в прошлом и сейчас.',
				'Я думаю мы сделаем еще много ошибок, люди ошибаются, это так.',
				'Хочу тебе помочь справится с теми ошибками, что были и будут.']},
		{text: ['Хочу извиниться, за свою реакцию на то, что было.',
				'Обещаю такого больше не будет.',
				'Я проверил уже, что не будет.']},
		{text: ['Все что мне нужно было сделать - поставить себя на твое место.',
				'Все что ты сделала, от самого начала и до конца - все было правильным решением.']},
		{text: ['Я просил тебя действовать, когда начались сомнения.',
				'Ты начала действовать.',
				'Теперь действую сам, как ты этого и заслуживаешь.',
				'Я сделаю все возможное, чтобы ты была счастлива.']},
		{text: ['Ты сказала, что если человек любит, он простит.',
				'Также он и будет рядом.',
				'Я буду рядом.']},
		{text: ['Ты.',
				'Самая красивая.',
				'Самая веселая.',
				'Самая добрая.',
				'Самая нежная.']},
	];

	private _questions: {text: string[]}[] = [
		{text: ['Заведем кошечку?']},
		{text: ['Купим шлем мандалорца?']},
		{text: ['Ты переедешь со мной в другую страну, когда это будет возможно?']},
		{text: ['Приготовим пиццу хотя-бы еще один раз?']},
		{text: ['Правда ли это романтично?))']},
		{text: ['Если я все еще не стою на коленях, то посмотри на меня, подмигни и улыбнись.', 'Улыбнулась?']},
		{text: ['Ты выйдешь за меня?']},
	];


	private renderCards = () => this._cards[this.state.cardIndex].text.map(text => <div className={'text-row'}>{text}</div>);

	private renderQuestions = () => this._questions[this.state.questionIndex].text.map(text => <div className={'text-row'}>{text}</div>);

	private renderYes = () => <div style={{opacity: '0.5'}}>{['Родная.', 'Люблю.', 'Безвозвратно.', 'Очень.', 'Сильно.'].map(text => <div className={'text-row'}>{text}</div>)}</div>;

	render() {
		return (
			<div>
				{this.state.isYes ? this.renderYes() : <>
					<div className={'text-box'}>
						{this.state.isQuestions ? this.renderQuestions() : this.renderCards()}
					</div>
					<div className={'action-box'}>
						{this.state.isQuestions ? <>
								{this.state.questionIndex !== this._questions.length - 1 && <button onClick={() => {
									if (this.state.questionIndex === this._questions.length - 1) {
										this.setState({isYes: true});
									} else {
										this.setState({questionIndex: this.state.questionIndex + 1});
									}
								}} className={'btn no'}>Нет
								</button>}
								<button onClick={() => {
									if (this.state.questionIndex === this._questions.length - 1) {
										this.setState({isYes: true});
									} else {
										this.setState({questionIndex: this.state.questionIndex + 1});
									}
								}} className={'btn yes'}>Да
								</button>
							</>
							: <button onClick={() => {
								if (this.state.cardIndex === this._cards.length - 1) {
									this.setState({isQuestions: true});
								} else {
									this.setState({cardIndex: this.state.cardIndex + 1});
								}
							}
							} className={'btn yes'}>Дальше</button>}
					</div>
				</>}
			</div>
		);
	}
}