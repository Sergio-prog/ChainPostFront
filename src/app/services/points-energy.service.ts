import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointsEnergyService {
  private pointsSubject = new BehaviorSubject<number>(0);
  public energySubject = new BehaviorSubject<number>(0);
  private clicksSubject = new BehaviorSubject<
    { id: number; x: number; y: number }[]
  >([]);

  points$ = this.pointsSubject.asObservable();
  energy$ = this.energySubject.asObservable();
  clicks$ = this.clicksSubject.asObservable();

  pointsToAdd = 12;
  energyToReduce = 12;
  maxEnergy = 6500;
  private energyInterval: any;

  constructor() {
    this.loadState();
  }

  private saveState() {
    localStorage.setItem('points', this.pointsSubject.value.toString());
    localStorage.setItem('energy', this.energySubject.value.toString());
  }

  private loadState() {
    const savedPoints = localStorage.getItem('points');
    const savedEnergy = localStorage.getItem('energy');

    if (savedPoints !== null) {
      this.pointsSubject.next(Number(savedPoints));
    }

    if (savedEnergy !== null) {
      this.energySubject.next(Number(savedEnergy));
    }
  }

  increasePoints() {
    this.pointsSubject.next(this.pointsSubject.value + this.pointsToAdd);
    this.saveState();
  }

  decreaseEnergy() {
    this.energySubject.next(
      Math.max(0, this.energySubject.value - this.energyToReduce),
    );
    this.saveState();
  }

  addClick(click: { id: number; x: number; y: number }) {
    this.clicksSubject.next([...this.clicksSubject.value, click]);
  }

  removeClick(id: number) {
    this.clicksSubject.next(
      this.clicksSubject.value.filter((click) => click.id !== id),
    );
  }

  startEnergyRestoration() {
    this.energyInterval = setInterval(() => {
      this.energySubject.next(
        Math.min(this.maxEnergy, this.energySubject.value + 1),
      );
      this.saveState();
    }, 100);
  }

  stopEnergyRestoration() {
    if (this.energyInterval) {
      clearInterval(this.energyInterval);
      this.energyInterval = null;
    }
  }

  addPoints(points: number) {
    this.pointsSubject.next(this.pointsSubject.value + points);
    this.saveState();
  }
}
