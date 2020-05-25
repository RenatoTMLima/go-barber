import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/iUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import {injectable, inject} from 'tsyringe';

interface IRequest {
   user_id: string;
   avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
   constructor(
      @inject('UsersRepository')
      private usersRepository: IUsersRepository,

      @inject('StorageProvider')
      private storageProvider: IStorageProvider
   ){}

   public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
         throw new AppError('Only authenticated users can change avatar', 401);
      }

      if (user.avatar) {
         await this.storageProvider.deleteFile(user.avatar);
      }

      const fileName = await this.storageProvider.saveFile(avatarFileName);

      user.avatar = fileName;

      await this.usersRepository.save(user);

      return user;
   }
}
