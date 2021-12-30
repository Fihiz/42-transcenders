import { Injectable } from '@angular/core';
import { if_game_object } from '../interfaces/if-game';
import axios from 'axios';
import { GlobalService } from './sf-global.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  constructor(private globalService: GlobalService) {}

  // PLAY PARTS
  async getTypesOfParty() {
    const url = `http://127.0.0.1:3000/cb-game/types`;
    return axios.get(url)
    .then((response: any) => {
      const types = response.data;
      return types;
    })
    .catch((error: any) => {
      // console.error(error.response.data);
      return undefined;
    })
  }

  // LIVE PARTS
  async getPartiesInProgress() {
    const url = `http://127.0.0.1:3000/cb-game/parties`;
    return axios.get(url)
    .then((response: any) => {
      const parties = response.data;
      return parties;
    })
    .catch((error: any) => {
      // console.log(error.response.data);
      return undefined;
    })
  }

  async setParty(type: string) {
    const login = this.globalService.login;
    const url = `http://127.0.0.1:3000/cb-game/party/play`;
    const data = {
      login: login,
      map_type: type
    }
    return axios.post(url, data)
    .then((response: any) => {
      const party = response.data;
      return party;
    })
    .catch((error: any) => {
      return undefined;
    });
  }

  async getPartyById(id: number) {
    const url = `http://127.0.0.1:3000/cb-game/party/id/${id}`;
    return axios.get(url)
    .then((response: any) => {
      const party = response.data;
      return party;
    })
    .catch((error: any) => {
      return undefined;
    })
  }

  async deletePartyById(id: number) {
    const url = `http://127.0.0.1:3000/cb-game/party/id/${id}`;
    return axios.delete(url)
    .then((response: any) => {
      return true;
    })
    .catch((error: any) => {
      return false;
    })
  }

  async getPartyByLogin() {
    const login = this.globalService.login;
    const url = `http://127.0.0.1:3000/cb-game/party/login/${login}`;
    return axios.get(url)
    .then((response: any) => {
      const party = response.data;
      return party;
    })
    .catch((error: any) => {
      console.log("pass");
      return undefined;
    })
  }

}
