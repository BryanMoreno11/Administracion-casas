import { Component,Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { casa } from '../../entidades/casa';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-localizacion-casa',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './localizacion-casa.component.html',
  styleUrl: './localizacion-casa.component.css'
})
export class LocalizacionCasaComponent 
{
  @Input() ocasa!:casa;
  
}
