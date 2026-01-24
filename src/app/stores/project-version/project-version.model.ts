import { LanguagesEnum } from '../../app.config';

export interface ProjectVersionModel {
  content?: {
    [key in LanguagesEnum]: string;
  };
}
