import { Profile } from './profile.interfaces';

export type OpenRemoteUrl = (url: string) => void;
export type MinimizeWindow = () => void;
export type MaximizeWindow = () => void;
export type CloseWindow = () => void;
export type GetProfiles = () => Promise<Profile[]>;
export type SetProfiles = (profiles: Profile[]) => void;
