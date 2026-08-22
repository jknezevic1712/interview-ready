import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../contracts/users.contract';

@Injectable()
export class UsersRepository implements IUsersRepository {}
