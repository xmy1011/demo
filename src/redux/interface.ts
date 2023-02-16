/* AuthState */
export interface AuthState {
	authButtons: {
		[propName: string]: any;
	};
}

export interface GlobalState {
	token: string;
	userInfo: any;
}