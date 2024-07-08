import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointsEnergyService {
  constructor() {}

  private pointsSubject = new BehaviorSubject<number>(29857775);
  public energySubject = new BehaviorSubject<number>(2532);
  private clicksSubject = new BehaviorSubject<
    { id: number; x: number; y: number }[]
  >([]);

  points$ = this.pointsSubject.asObservable();
  energy$ = this.energySubject.asObservable();
  clicks$ = this.clicksSubject.asObservable();

  pointsToAdd = 12;
  energyToReduce = 12;
  maxEnergy = 6500;

  increasePoints() {
    this.pointsSubject.next(this.pointsSubject.value + this.pointsToAdd);
  }

  decreaseEnergy() {
    this.energySubject.next(
      Math.max(0, this.energySubject.value - this.energyToReduce),
    );
  }

  addClick(click: { id: number; x: number; y: number }) {
    this.clicksSubject.next([...this.clicksSubject.value, click]);
  }

  removeClick(id: number) {
    this.clicksSubject.next(
      this.clicksSubject.value.filter((click) => click.id !== id),
    );
  }

  restoreEnergy() {
    this.energySubject.next(
      Math.min(this.maxEnergy, this.energySubject.value + 1),
    );
  }
}
