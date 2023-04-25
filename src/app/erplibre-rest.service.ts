import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CapacitorHttp } from '@capacitor/core';
import { env } from '../environments/environment';
import { Observable, Subject, from } from 'rxjs';
import { AlimentModel } from 'src/models/aliment.model';

@Injectable({
	providedIn: 'root',
})
export class ErplibreRestService {
	constructor() {}

	auth(): Observable<any> {
		const subject = new Subject();
		from(
			CapacitorHttp.get({
				url: env.apiUrl + '/api/auth/token',
				params: {
					db: 'test_rhuard_demo_full',
					login: 'admin',
					password: 'admin',
				},
			})
		).subscribe({
			next: (v) => {
				subject.next(v);
				subject.complete();
			},
		});
		return subject.asObservable();
	}

	getAliments(): Observable<AlimentModel[]> {
		const subject = new Subject<AlimentModel[]>();
		this.auth().subscribe({
			next: (v: any) => {
				from(
					CapacitorHttp.get({
						url: env.apiUrl + '/api/xmlrpc_base.aliment',
						headers: {
							access_token: v.data.access_token,
						},
					})
				).subscribe({
					next: (v: any) => {
						const aliments: AlimentModel[] = [];
						for (const aliment of v.data.data) {
							aliments.push(
								new AlimentModel(aliment.id, aliment.name)
							);
						}
						subject.next(aliments);
						subject.complete();
					},
				});
			},
			error: (e: any) => {
				console.error(e);
			},
		});
		return subject.asObservable();
	}

	addAliment(name: string): Observable<AlimentModel> {
		const subject = new Subject<AlimentModel>();
		this.auth().subscribe({
			next: (v: any) => {
				from(
					CapacitorHttp.post({
						url: env.apiUrl + '/api/xmlrpc_base.aliment/',
						data: {
							name,
						},
						headers: {
							'Content-Type': 'application/jsonp',
							access_token: v.data.access_token,
						},
					})
				).subscribe({
					next: (v: any) => {
						subject.next(
							new AlimentModel(
								v.data.data[0].id,
								v.data.data[0].name
							)
						);
						subject.complete();
					},
				});
			},
			error: (e: any) => {
				console.error(e);
			},
		});
		return subject.asObservable();
	}

	deleteAliment(id: number): Observable<AlimentModel> {
		const subject = new Subject<AlimentModel>();
		this.auth().subscribe({
			next: (v: any) => {
				from(
					CapacitorHttp.delete({
						url: env.apiUrl + '/api/xmlrpc_base.aliment/' + id,
						headers: {
							'Content-Type': 'application/jsonp',
							access_token: v.data.access_token,
						},
					})
				).subscribe({
					next: (v: any) => {
						subject.next(v.data.data);
						subject.complete();
					},
				});
			},
			error: (e: any) => {
				console.error(e);
			},
		});
		return subject.asObservable();
	}

	updateAliment(id: number, newName: string): Observable<AlimentModel> {
		const subject = new Subject<AlimentModel>();
		this.auth().subscribe({
			next: (v: any) => {
				from(
					CapacitorHttp.put({
						url: env.apiUrl + '/api/xmlrpc_base.aliment/' + id,
						data: {
							name: newName,
						},
						headers: {
							'Content-Type': 'application/jsonp',
							access_token: v.data.access_token,
						},
					})
				).subscribe({
					next: (v: any) => {
						subject.next(
							new AlimentModel(
								v.data.data[0].id,
								v.data.data[0].name
							)
						);
						subject.complete();
					},
				});
			},
			error: (e: any) => {
				console.error(e);
			},
		});
		return subject.asObservable();
	}
}
