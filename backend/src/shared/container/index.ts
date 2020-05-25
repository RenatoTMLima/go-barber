import {container} from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/iUsersRepository';

// import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

// container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
