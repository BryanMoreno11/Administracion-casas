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
    
    constructor(private cservice:CasaService, private _casaService:CasaService)
    {
      this.cargarCasas();            
    }
    ngOnInit(): void {
      this.cargarCasas().then(() => {
        this.ListaFiltrada = this.Lista;
      });
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

    async cargarCasas() {
      try {
        this.Lista = await this._casaService.getLista();
        console.log("La lista es ", this.Lista);
      } catch (error) {
        console.error('Error al cargar las casas:', error);
      }
    }
}
