import * as React from 'react';
import './App.css';

interface KsenProps {

}

interface KsenState {
	isQuestions: boolean;
	isYes: boolean;
	activeTickIndex: number;
	questionIndex: number;
	cardIndex: number;
}

export class Ksen extends React.PureComponent<KsenProps, KsenState> {
	constructor(props: KsenProps) {
		super(props);
		this.state = {cardIndex: 0, isQuestions: false, isYes: true, questionIndex: 0, activeTickIndex: 0};
	}

	private _clearTimeout: number = 0;

	public componentDidMount() {
		this.tick();
	}

	private _cards: { text: string[] }[] = [
		{text: ['Я счастлив, что встретил тебя.', 'Ты именно тот человек, которого я вижу рядом с собой.']},
		{text: ['Если ты это читаешь и меня нет рядом', 'То мне очень жаль, что я потерял тебя.']},
		{text: ['В любом случае!', 'Извини, что заставил тебя выслушивать все это.']},
		{text: ['Мне было больно каждый раз, когда я тебе говорил про недоверие.', 'Очень хотел знать, что ты хочешь быть со мной.']},
		{text: ['Только если любишь хочешь остаться с человеком.', 'Очень надеюсь, что мы справимся.', 'Больно делать тебе не хочу.']},
		{text: ['Это эгоистично.', 'Но я слишком долго искал ту самую.', 'Одну.']},
		{text: ['Ты заслуживаешь счастья.', 'И я заслуживаю.']},
		{
			text: [
				'Нам нужно расстаться, чтобы ты поняла точно, что тебе нужно.',
				'Если все было не по-настоящему, то мы расстанемся и ты найдешь то, что ищешь.',
				'Извини, еще раз.',
			],
		},
		{
			text: [
				'Мы допустили много ошибок в прошлом и сейчас.',
				'Я думаю мы сделаем еще много ошибок, люди ошибаются, это так.',
				'Хочу тебе помочь справится с теми ошибками, что были и будут.',
			],
		},
		{
			text: [
				'Но у нас было столько хорошего, что я перечислю тебе все лично.',
				'И буду напоминать тебе зачем мы с тобой встретились.',
			],
		},
		{
			text: [
				'Хочу извиниться, за свою реакцию на то, что было.',
				'Обещаю такого больше не будет.',
				'Я давно уже решил, что хочу с тобой быть.',
			],
		},
		{
			text: [
				'Все что мне нужно было сделать - поставить себя на твое место.',
				'Все что ты сделала, от самого начала и до конца - все твои решения были верными.',
			],
		},
		{
			text: ['Я просил тебя действовать, когда начались сомнения.',
				'Ты начала действовать.',
				'Теперь действую сам, как ты этого и заслуживаешь.',
				'Я сделаю все возможное, чтобы ты была счастлива.'],
		},
		{
			text: ['Ты сказала, что если человек любит, он простит.',
				'Также он и будет рядом.',
				'Я буду рядом.',
			],
		},
		{
			text: ['Ты.',
				'Самая красивая.',
				'Самая веселая.',
				'Самая добрая.',
				'Самая нежная.'],
		},
	];

	private _questions: { text: string[] }[] = [
		{text: ['Заведем кошечку?']},
		{text: ['Купим шлем мандалорца?']},
		{text: ['Ты переедешь со мной в другую страну, когда это будет возможно?']},
		{text: ['Приготовим пиццу хотя-бы еще один раз?']},
		{text: ['Правда ли это романтично?))']},
		{text: ['Если я все еще не стою на коленях, то посмотри на меня, подмигни и улыбнись.', 'Улыбнулась?']},
		{text: ['Ты выйдешь за меня?']},
	];

	private _h = [
		['Родная.'],
		['Люблю.'],
		['Тебя.'],
		['Безвозвратно.'],
		['Очень.'],
		['Сильно.'],
	];

	private renderCards = () => this._cards[this.state.cardIndex].text.map(text => <div
		className={'text-row'}>{text}</div>);

	private renderQuestions = () => this._questions[this.state.questionIndex].text.map(text => <div
		className={'text-row'}>{text}</div>);

	private renderYes = () => {
		return <div className={'yes-text-box__frame'}>
			{this._h.map((arr, key) => {
					return (
						<div className={'yes-text-box' + (this.state.activeTickIndex === key ? ' active' :  '')} key={key}>
							{arr.map((text, key) => <div key={key} className={'text-row'}>{text}</div>)}
						</div>
					);
				})}
		</div>;
	};

	private tick = () => {
		console.log('tick, ', this.state.activeTickIndex)
		window.clearTimeout(this._clearTimeout)
		this._clearTimeout = window.setTimeout(() => {
			if (this.state.activeTickIndex === this._h.length - 1) {
				this.setState({activeTickIndex: 0}, this.tick);
			} else {
				this.setState({activeTickIndex: this.state.activeTickIndex + 1}, this.tick);
			}
		}, 500);
	};

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
										this.setState({isYes: true}, this.tick);
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