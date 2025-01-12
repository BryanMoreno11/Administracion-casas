import { Component, inject } from '@angular/core';
import { casa } from '../../entidades/casa';
import { CasaService } from '../../servicios/casa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './administrar.component.html',
  styleUrl: './administrar.component.css'
})
export class AdministrarComponent {

  //regiona variables

  casas: casa[] = [];
  _casaService = inject(CasaService);
  isOpen: boolean = false;
  editing=false;
  oCasa:casa={
    id:0,
    nombre:'',
    ciudad:'',
    provincia:'',
    foto:[],
    unidades:0,
    wifi:false,
    lavanderia:false,
  }

  limiteImagenes = 5; // Límite configurable de imágenes
  currentImageIndex = 0; // Índice de la imagen actual
  tempUrl = ''; // Almacena la URL temporal para agregar o modificar
  imagenes:string[]=[] //Arreglo de imagenes

  constructor() {

  }

  ngOnInit(): void {
   this.cargarCasas();

  }

  reiniciarFormulario(){
    this.oCasa={
      id:0,
      nombre:'',
      ciudad:'',
      provincia:'',
      foto:[],
      unidades:0,
      wifi:false,
      lavanderia:false,
    }
    this.currentImageIndex=0;
    this.imagenes=[];
  }

 llenarFormulario(casa:casa){
  if(this.editing){
    console.log("la casa es",casa); 
    this.oCasa={...casa};
    this.imagenes = [...casa.foto];
  }

 }

  guardarCasa(){
    let casa={...this.oCasa};
    casa.foto=[...this.imagenes];
    if(this.editing){
      this._casaService.updateCasa(casa).then(()=>{
        this.cerrarModal();
     this.cargarCasas();
      });
      }else{
        this._casaService.insertCasa(casa).then(()=>{
          this.cerrarModal();
          this.cargarCasas();
        });
      }
     
  }

  abrirModal(casa?:casa){
    this.isOpen = true;
    this.reiniciarFormulario();
    if(casa){
      this.editing=true;
      this.llenarFormulario(casa);
    }
   
  }

  cerrarModal(){
    this.isOpen = false;
    this.editing=false;
    this.reiniciarFormulario();
  } 

  eliminarCasa(casa: casa) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._casaService.deleteCasa(casa.id)
          Swal.fire(
            'Eliminado',
            'La casa ha sido eliminada.',
            'success'
          );
          this.cargarCasas();
      }
    });
  }
  


  
  agregarImagen() {
    if (this.tempUrl && this.imagenes.length < this.limiteImagenes) {
      this.imagenes.push(this.tempUrl);
      this.tempUrl = '';
      this.currentImageIndex = this.imagenes.length - 1;
    }
  }
  
  eliminarImagen() {
    if (this.imagenes.length) {
      this.imagenes.splice(this.currentImageIndex, 1);
      this.currentImageIndex = Math.max(0, this.currentImageIndex - 1);
    }
  }
  
  anteriorImagen() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
  
  siguienteImagen() {
    if (this.currentImageIndex < this.imagenes.length - 1) {
      this.currentImageIndex++;
    }
  }
  
  async cargarCasas() {
    try {
      this.casas = await this._casaService.getLista();
    } catch (error) {
      console.error('Error al cargar las casas:', error);
    }
  }



  



}

