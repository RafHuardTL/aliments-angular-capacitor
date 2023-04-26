import { Injectable } from '@angular/core';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { from } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ActionSheetService {
	constructor() {}

	showActions(title: string, message: string, options: any) {
		return from(
			ActionSheet.showActions({
				title,
				message,
				options,
			})
		);
	}
}
