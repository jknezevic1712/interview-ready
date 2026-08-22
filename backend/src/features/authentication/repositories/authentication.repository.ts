import { Injectable } from '@nestjs/common';
import { IAuthenticationRepository } from '../contracts/authentication.contract';

@Injectable()
export class AuthenticationRepository implements IAuthenticationRepository {}
