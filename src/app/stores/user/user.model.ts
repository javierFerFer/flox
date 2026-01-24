import { FirebaseUserConfig } from '../../resolvers/user-config-modal.resolver';

export interface UserModel {
  email?: string;
  uid?: string;
  userConfig?: FirebaseUserConfig;
}
