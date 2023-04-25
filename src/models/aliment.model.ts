import { Aliment } from './aliment.interface';

export class AlimentModel implements Aliment {
	id: number;
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
