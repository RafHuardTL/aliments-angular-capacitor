import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Dialog } from '@capacitor/dialog';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	constructor() {}

	showAlert(title: string, message: string): Observable<any> {
		return from(
			Dialog.alert({
				title,
				message,
			})
		);
	}

	showConfirm(title: string, message: string): Observable<any> {
		return from(
			Dialog.confirm({
				title,
				message,
			})
		);
	}

	showPrompt(
		title: string,
		message: string,
		inputText: string = ''
	): Observable<any> {
		return from(
			Dialog.prompt({
				title,
				message,
				inputText,
			})
		);
	}
}
