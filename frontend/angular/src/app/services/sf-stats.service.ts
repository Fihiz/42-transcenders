import { Injectable } from '@angular/core';
import { if_stats_object } from '../interfaces/if-stats';
import axios from 'axios';
import { GlobalService } from './sf-global.service';
import { if_game_object } from '../interfaces/if-game';

@Injectable({
	providedIn: 'root',
})
export class StatsService {

	Scores: if_stats_object[] = [];
	History: if_game_object[] = [];
	Statistic?: if_stats_object;

	constructor(private global: GlobalService) {}

	async getScores() {
		const url = `http://${window.location.host}:3000/cb-stats/ranking`;
		return axios.get(url)
		.then((response: any) => {
			this.Scores = response.data;
			return this.Scores;
		})
		.catch((error: any) => {
			// console.error(error.response.data);
			return undefined;
		})
	}

	async getHistory() {
		const login = this.global.login;
		const url = `http://${window.location.host}:3000/cb-game/history/${login}`;
		return axios.get(url)
		.then((response: any) => {
			this.History = response.data;
			return this.History;
		})
		.catch((error: any) => {
			// console.error(error.response.data);
			return undefined;
		})
	}

	async getStatistic() {
		const login = this.global.login;
		const url = `http://${window.location.host}:3000/cb-stats/statistic/${login}`;
		return axios.get(url)
		.then((response: any) => {
			this.Statistic = response.data;
			return this.Statistic;
		})
		.catch((error: any) => {
			// console.error(error.response.data);
			return undefined;
		})
	}

}
