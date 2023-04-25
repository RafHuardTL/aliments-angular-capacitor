import { Component } from '@angular/core';
import { ErplibreRestService } from './erplibre-rest.service';
import { AlimentModel } from 'src/models/aliment.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'aliments-angular-capacitor';
	aliments: AlimentModel[] = [];

	constructor(private erplibreRest: ErplibreRestService) {}

	ngOnInit() {
		this.erplibreRest.getAliments().subscribe({
			next: (aliments: AlimentModel[]) => {
				this.aliments = aliments;
			},
		});
	}
}
