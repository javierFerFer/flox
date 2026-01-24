import { InjectionToken } from "@angular/core";

export interface VersionConfig {
    version: string
}

export const PROJECT_VERSION = new InjectionToken<VersionConfig>('0.0.0.0');