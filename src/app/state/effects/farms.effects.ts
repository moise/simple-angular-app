import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FarmService} from "../../services/farm.service";
import {fetchFarmReadings, fetchFarmReadingSuccess, fetchFarms, fetchFarmsSuccess} from "../actions/farms.actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {EMPTY, of} from "rxjs";
import {Store} from "@ngrx/store";
import {Farm, Reading} from "../../models/types";

@Injectable()
export class FarmsEffects {

	loadFarms$ = createEffect(() => this.actions$.pipe(
			ofType(fetchFarms),
			mergeMap(() =>
					this.farmService.getFarms()
							.pipe(
									map((farms: Farm[]) => (fetchFarmsSuccess({farms}))),
									catchError(() => EMPTY)
							))
			), {dispatch: true, resubscribeOnError: false}
	);

	loadFarmReadings$ = createEffect(() => this.actions$.pipe(
			ofType(fetchFarmReadings),
			mergeMap(() =>
					this.farmService.getReadings()
							.pipe(
									tap(res => console.log(res)),
									map((readings: Reading[]) => (fetchFarmReadingSuccess({readings}))),
									catchError(() => EMPTY)
							))
			), {dispatch: true, resubscribeOnError: false}
	);


	constructor(
			private actions$: Actions,
			private farmService: FarmService
	) {
	}
}
