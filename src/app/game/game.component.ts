import { Component, OnInit } from '@angular/core';
import { PointsEnergyService } from '../services/points-energy.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
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

  ngOnInit(): void {
    setInterval(() => {
      this.pointsEnergyService.restoreEnergy();
    }, 100);
  }

  handleClick(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (
      this.pointsEnergyService.energySubject.value -
        this.pointsEnergyService.energyToReduce <
      0
    ) {
      return;
    }

    this.pointsEnergyService.increasePoints();
    this.pointsEnergyService.decreaseEnergy();
    this.pointsEnergyService.addClick({ id: Date.now(), x, y });
  }

  handleAnimationEnd(id: number): void {
    this.pointsEnergyService.removeClick(id);
  }

  goBack(): void {
    this.location.back();
  }
}
