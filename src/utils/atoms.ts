// atoms.ts
import {atom} from 'recoil';
import {Models} from 'appwrite';

export const userAtom = atom<Models.User<Models.Preferences> | null>({
	key: 'user',
	default: null,
});

export const loadingAtom = atom<boolean>({
	key: 'loading',
	default: true,
});
