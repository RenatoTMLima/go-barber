import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/iUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import {injectable, inject} from 'tsyringe';

interface IRequest {
   email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
   constructor(
      @inject('UsersRepository')
      private usersRepository: IUsersRepository,

      @inject('MailProvider')
      private mailProvider: IMailProvider,

      @inject('UserTokensRepository')
      private userTokensRepository: IUserTokensRepository
   ){}

   public async execute({ email }: IRequest): Promise<void> {
      const user = await this.usersRepository.findByEmail(email);

      if(!user){
         throw new AppError('User does not exists');
      }

      const token =  await this.userTokensRepository.generate(user.id);

      this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
   }
}
