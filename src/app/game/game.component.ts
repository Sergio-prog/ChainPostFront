import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PointsEnergyService } from '../services/points-energy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, OnDestroy {
  points$: Observable<number>;
  energy$: Observable<number>;
  clicks$: Observable<{ id: number; x: number; y: number }[]>;

  constructor(
    private pointsEnergyService: PointsEnergyService,
    private location: Location,
  ) {
    this.points$ = this.pointsEnergyService.points$;
    this.energy$ = this.pointsEnergyService.energy$;
    this.clicks$ = this.pointsEnergyService.clicks$;
  }
  ngOnInit() {
    this.pointsEnergyService.startEnergyRestoration();
  }

  ngOnDestroy() {
    this.pointsEnergyService.stopEnergyRestoration();
  }

  handleClick(event: MouseEvent) {
    this.pointsEnergyService.increasePoints();
    this.pointsEnergyService.decreaseEnergy();
    const click = { id: Date.now(), x: event.clientX, y: event.clientY };
    this.pointsEnergyService.addClick(click);
  }
  goBack(): void {
    this.location.back();
  }

  handleAnimationEnd(id: number) {
    this.pointsEnergyService.removeClick(id);
  }
}
