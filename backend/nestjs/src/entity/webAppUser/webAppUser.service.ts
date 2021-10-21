import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebAppUser } from './webAppUser.entity';

@Injectable()
export class webAppUserService {
  constructor(
    @InjectRepository(WebAppUser)
    private users: Repository<WebAppUser>,
  ) {}


  async create(user: WebAppUser): Promise<any> {
    console.log('creation');
    return (await this.users.insert(user));
    // return ('ok');
    // return 'This action adds a new entity';
  }

  findAll() {
    return (this.users.find());
    // return `This action returns all entity`;
  }

  findOne(id: number) {
    return this.users.findOne(id);
    // return `This action returns a #${id} entity`;
  }

  update(id: number, newUser: WebAppUser) {
    return this.users.update("test", newUser);
  }

  async remove(user: WebAppUser) {
    console.log('deletion');
    return (await this.users.delete(user));
    // return `This action removes a #${id} entity`;
  }

}
