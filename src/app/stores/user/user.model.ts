import { FIREBASE_USER_CONFIG } from '../../resolvers/user-config-modal.resolver';

export interface UserModel {
  email?: string;
  uid?: string;
  userConfig?: FIREBASE_USER_CONFIG;
}
