import { Component, inject } from '@angular/core';
import { CasaService } from '../../servicios/casa.service';
import { CommonModule } from '@angular/common';
import { casa } from '../../entidades/casa';
import { ActivatedRoute } from '@angular/router';
import {  getDoc} from 'firebase/firestore';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent 
{
  route:ActivatedRoute=inject(ActivatedRoute);
  oservice=inject(CasaService);
  clocalizacion?: casa;
  currentSlide = 0;
  constructor(private cservice: CasaService)
  {
  }
  ngOnInit(): void {
    const id = + this.route.snapshot.paramMap.get('id')!;
    this.obtenerCasa(id);
  }
  prevSlide(): void {
    if (this.clocalizacion && this.clocalizacion.foto.length) {
      this.currentSlide = (this.currentSlide - 1 + this.clocalizacion.foto.length) % this.clocalizacion.foto.length;
    }
  }
  nextSlide(): void {
    if (this.clocalizacion && this.clocalizacion.foto.length) {
      this.currentSlide = (this.currentSlide + 1) % this.clocalizacion.foto.length;
    }
  }

  async obtenerCasa(id:number){
  this.clocalizacion=await this.cservice.obtenerCasa(id);

    
  }
}
