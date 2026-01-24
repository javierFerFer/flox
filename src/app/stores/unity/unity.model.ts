export interface SessionModel {
  uuid: string;
  name: string;
  activities?: string;
  evaluation?: string;
  attentionOfDiversity?: string;
  observations?: string;
}

export interface UnityModel {
  uuid: string;
  name: string;
  summary?: string;
  sessions: SessionModel[];
}
