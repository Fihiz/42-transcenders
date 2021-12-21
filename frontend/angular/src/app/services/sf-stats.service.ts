import { Injectable } from '@angular/core';
import { if_stats, if_stats_object  } from '../interfaces/if-stats';
import axios from 'axios';

@Injectable({
	providedIn: 'root',
})
export class StatsService {

	Scores: if_stats_object[] = [];

	constructor() {}

	async getScores() {
		const url = 'http://127.0.0.1:3000/cb-stats/ranking';
		// try {
			const response = await axios.get(url);
			return response.data;
		// } catch(error) {
			// console.error("FRONT: ", error.response);
		// }
	}
}
