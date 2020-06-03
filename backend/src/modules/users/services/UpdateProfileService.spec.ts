import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
   beforeEach(() => {
      fakeUsersRepository = new FakeUsersRepository();
      fakeHashProvider = new FakeHashProvider();
      updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
   })
   
   it('should be able to update the profile', async () => {
      const user = await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'john@gmail.com',
         password: '123456'
      });

      const updatedUser = await updateProfile.execute({
         user_id: user.id,
         name: 'John Doe Doe',
         email: 'johndoe@example.com'
      });

      expect(updatedUser.name).toBe('John Doe Doe');
      expect(updatedUser.email).toBe('johndoe@example.com');
   });

   it('should not be able to change to another user email', async () => {
      await fakeUsersRepository.create({
         name: 'John Doe',
         email: 'john@gmail.com',
         password: '123456'
      });

      const user = await fakeUsersRepository.create({
         name: 'Test',
         email: 'test@gmail.com',
         password: '123456'
      });

      await expect(updateProfile.execute({
         user_id: user.id,
         name: 'John Doe Doe',
         email: 'john@gmail.com'
      })).rejects.toBeInstanceOf(AppError)
   });

   it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
       name: 'John Doe',
       email: 'john@gmail.com',
       password: '123456'
    });

    const updatedUser = await updateProfile.execute({
        user_id: user.id,
        name: 'John Doe Doe',
        email: 'john@gmail.com',
        old_password: '123456',
        password: '123123'
    });

    expect(updatedUser.password).toBe('123123');
 });

   it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
       name: 'John Doe',
       email: 'john@gmail.com',
       password: '123456'
    });

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'John Doe Doe',
        email: 'john@gmail.com',
        password: '123123'
    })).rejects.toBeInstanceOf(AppError);
 });
 
   it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
       name: 'John Doe',
       email: 'john@gmail.com',
       password: '123456'
    });

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'John Doe Doe',
        email: 'john@gmail.com',
        old_password: '6543234',
        password: '123123'
    })).rejects.toBeInstanceOf(AppError);
 });

});
