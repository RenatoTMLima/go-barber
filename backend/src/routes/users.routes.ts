import { Router } from 'express';
import multer from 'multer';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
   try {
      const { name, email, password } = request.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
         name,
         email,
         password,
      });

      delete user.password;

      return response.json(user);
   } catch (err) {
      return response.status(400).json({ error: err.message });
   }
});

usersRouter.patch(
   '/avatar',
   ensureAuthenticated,
   upload.single('avatar'),
   async (request, response) => {
      try {
         const updateUserAvatar = new UpdateUserAvatarService();

         const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
         });

         delete user.password;

         return response.json(user);
      } catch (err) {
         return response.status(400).json({ error: err.message });
      }
   },
);

export default usersRouter;
