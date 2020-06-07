// import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/iAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
   provider_id: string;
   day: number;
   month: number;
   year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
   constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppointmentsRepository,
   ) {}

   public async execute({
      provider_id,
      year,
      month,
      day,
   }: IRequest): Promise<Appointment[]> {
      const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
         {
            provider_id,
            day,
            month,
            year,
         },
      );

      return appointments;
   }
}
