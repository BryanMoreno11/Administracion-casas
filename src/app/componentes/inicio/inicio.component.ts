import { Component,inject } from '@angular/core';
import { LocalizacionCasaComponent } from '../localizacion-casa/localizacion-casa.component';
import { CasaService } from '../../servicios/casa.service';
import { casa } from '../../entidades/casa';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,LocalizacionCasaComponent,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
    Lista:casa[]=[];
    ListaFiltrada: casa[] = [];
    CiudadFiltrada: string = '';
    noResults: boolean = false;
    oservice:CasaService=inject(CasaService);
    
    constructor(private cservice:CasaService)
    {
      this.Lista=this.oservice.getLista();
            
    }
    ngOnInit(): void {
      this.Lista = this.cservice.getLista();
      this.ListaFiltrada = this.Lista;
    }
    filtradoCiudad(): void {
      if (this.CiudadFiltrada.trim() === '') {
        this.ListaFiltrada = this.Lista;
        this.noResults = false;
      } else {
        this.ListaFiltrada = this.Lista.filter(casa =>
          casa.ciudad.toLowerCase().includes(this.CiudadFiltrada.toLowerCase())
        );
        this.noResults = this.ListaFiltrada.length === 0;
      }
    }
}
