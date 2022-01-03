import { Injectable } from '@angular/core';
import { if_stats_object } from '../interfaces/if-stats';
import axios from 'axios';

@Injectable({
	providedIn: 'root',
})
export class StatsService {

	Scores: if_stats_object[] = [];

	constructor() {}

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

}
