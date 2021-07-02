import { ArrayConectService } from './array-conect.service';
import * as mongoose from 'mongoose';
import * as uuid from 'uuid';
export class Connect {
  static async bdConnect(conectionUrl): Promise<any> {
    const connectExist = await ArrayConectService.searchConection(conectionUrl);
    if (!connectExist) {
      const randomName = uuid.v1();
      mongoose[randomName.toString()] = await mongoose.createConnection(
        conectionUrl,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
        },
      );
      await ArrayConectService.addConection(conectionUrl, randomName);
      return randomName;
    } else {
      return connectExist.conection;
    }
  }
}
