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
    try {
      const res = await axios.get('http://127.0.0.1:3000/cb-stats/ranking');
      console.log(res);
      return res.data;
    } catch(error) {
      console.log(typeof error);
      return error;
    //   console.log(error);
    //   let res2: if_error = {
    //     statusCode: 200,
    //     message: "",
    //     error: "",
    //   };
    //   res2.statusCode = error.statusCode;
    //   res2.message = error.message;
    //   res2.error = error.error;
    //   console.log(res2);
    //   return res2;
    }
  }
}
