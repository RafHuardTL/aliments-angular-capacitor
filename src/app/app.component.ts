import { Component } from '@angular/core';
import { ErplibreRestService } from './erplibre-rest.service';
import { DialogService } from './dialog.service';
import { AlimentModel } from 'src/models/aliment.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'aliments-angular-capacitor';
	aliments: AlimentModel[] = [];

	constructor(
		private erplibreRest: ErplibreRestService,
		private dialogService: DialogService
	) {}

	ngOnInit() {
		this.erplibreRest.getAliments().subscribe({
			next: (aliments: AlimentModel[]) => {
				this.aliments = aliments;
			},
		});
	}

	addAliment() {
		this.dialogService
			.showPrompt('Ajout', 'Donnez un nom au nouvel aliment.')
			.subscribe((promptResponse) => {
				if (!promptResponse.cancelled && promptResponse.value) {
					this.erplibreRest
						.addAliment(promptResponse.value)
						.subscribe({
							next: (addResponse: AlimentModel) => {
								this.aliments.push(addResponse);
							},
							error: (e) => {
								console.log(e);
							},
						});
				}
			});
	}

	editAliment(id: number) {
		const name = this.aliments.find((aliment) => aliment.id === id)?.name;
		this.dialogService
			.showPrompt(
				'Modifier',
				`Choisissez le nouveau nom de l'aliment.`,
				name
			)
			.subscribe((promptResponse) => {
				if (!promptResponse.cancelled) {
					this.erplibreRest
						.updateAliment(id, promptResponse.value)
						.subscribe({
							next: (editResponse) => {
								this.aliments.find(
									(aliment) => aliment.id === id
								)!.name = editResponse.name;
							},
							error: (e: any) => {
								console.error(e);
							},
						});
				}
			});
	}

	deleteAliment(id: number) {
		const name = this.aliments.find((aliment) => aliment.id === id)?.name;
		this.dialogService
			.showConfirm(
				'Suppression',
				`Voulez-vous vraiment supprimer l'aliment ${name}?`
			)
			.subscribe((confirmResponse) => {
				if (confirmResponse.value) {
					this.erplibreRest.deleteAliment(id).subscribe({
						next: (deleteResponse: any) => {
							console.log(deleteResponse);
							this.aliments = this.aliments.filter(
								(aliment) => aliment.id !== id
							);
						},
						error: (e: any) => {
							console.error(e);
						},
					});
				}
			});
	}
}
