import * as mongoose from 'mongoose';
import { RoleSchemaManager } from '../../role/schemas/role.schema';
import { UserAddressSchemaManager } from '../../user-address/schemas/user-address.schemas';
import { IConnectionConfig } from '../../../../../utils/utils';
import { User } from '../interfaces/user.interface';
import { LDVDetailSchemaManager } from '../../../../../entities/ldv/schemas/ldv-detail.schema';
import { from } from 'rxjs';
import { GiftCardSchemaManager } from '../../../../../entities/gift-card/schemas/gift-card.schemas';

export class UserSchemaManager {
  /*   config: IConnectionConfig;
    UserModel: mongoose.Model<User>;
    dbConection: any;
    constructor(config: IConnectionConfig, dbConection: any) {
      this.config = config;
      this.dbConection = dbConection;
    } */

  static getModel(config, dbConection): mongoose.Model<User> {
    let UserModel: mongoose.Model<User>;
    const exists = mongoose[dbConection].modelNames().find(value => {
      return value === config.tenant + 'User';
    });

    if (!exists) {
      const LdvDetailModel = LDVDetailSchemaManager.getModel(
        config,
        dbConection,
      );
      const RoleModel = RoleSchemaManager.getModel(config, dbConection);
      const UserAddresModel = UserAddressSchemaManager.getModel(config, dbConection);
      const GiftCardModel = GiftCardSchemaManager.getModel(config, dbConection);
      /*  const ProductModel = ProductSchemaManager.getModel(config, dbConection); */

      const UserSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        tenant: String,
        first_time: Boolean,
        state: { type: String, default: 'H', enum: ['H', 'B'] },
        verified_email: { type: Boolean, default: false },
        deleted: { type: Boolean, default: false },
        create_date: { type: Date, default: Date.now },
        role_id: { type: mongoose.Schema.Types.ObjectId, ref: RoleModel },
        type_document: {
          type: mongoose.Schema.Types.ObjectId,
          ref: LdvDetailModel,
        },
        address: [
          { type: mongoose.Schema.Types.ObjectId, ref: UserAddresModel },
        ],
        is_customer_admin: { type: Number, default: false },
        entity_type: { type: String },
        entity_id: { type: String },
        update_date: Date,
        code_ERP: { type: String },
        error_erp: { type: String },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: config.tenant + 'Product' }],
        // To save additionals use .markModified('additionals')
        additionals: {
          name: { type: String, required: true },
          last_name_father: { type: String, required: true },
          last_name_mother: { type: String, required: true },
          dni: { type: String },
          type_document: {
            type: mongoose.Schema.Types.ObjectId,
            ref: LdvDetailModel,
          },
          birth_date: { type: Date },
          number_card: { type: String },
          number_document: { type: String, required: true },
          credit_cards: [
            {
              maskedNumber: { type: String },
              tokenizedId: { type: String },
              paymentMethod: { type: String },
              expirationDate: { type: String },
              holderName: { type: String },
              identificationNumber: { type: String }
            }
          ],
          phone: { type: String },
          suffix: { type: String },
          expiration_date: { type: Date },
        },
        giftCard: [{ type: mongoose.Schema.Types.ObjectId, ref: GiftCardModel }],
        totalWallet: { type: Number },
        wallet: [{
          amount: { type: Number },
          operation: { type: String },
          reason: { type: Number },
          date: Date
        }]
      });
      UserSchema.add({
        create_by: {
          type: mongoose.Schema.Types.ObjectId /* , ref: UserSchema */,
        },
        update_by: {
          type: mongoose.Schema.Types.ObjectId /* , ref: UserSchema */,
        },
      });
      UserModel = mongoose[dbConection].model<User>(
        config.tenant + 'User',
        UserSchema,
        config.tenant + '__User',
      );
    } else {
      UserModel = mongoose[dbConection].model<User>(config.tenant + 'User');
    }
    return UserModel;
  }
}
