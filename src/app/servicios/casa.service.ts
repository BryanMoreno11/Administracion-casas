import { Injectable } from '@angular/core';
import { casa } from '../entidades/casa';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc, query, where
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CasaService {
  firestore = inject(Firestore);
  private casasCollection = collection(this.firestore, 'casas');

  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
 
  async getLista(): Promise<casa[]> {
    const snapshot = await getDocs(this.casasCollection);
    return snapshot.docs.map(
      (doc) => ({ id: Number(doc.id), ...doc.data() } as casa)
    ).sort((a, b) => a.id - b.id);
  }

  async insertCasa(casa: casa) {
    if ( await this.getCasa(casa.id)) {
      this.mostrarMensaje('Error', 'error', 'El codigo ya existe');
      return;
    }

    if (this.validaciones(casa) == false) {
      this.mostrarMensaje('Error', 'error', 'Ingrese datos validos');
      return;
    }

    try {
      await addDoc(this.casasCollection, casa);
      this.mostrarMensaje('Éxito', 'success', 'Casa agregada correctamente');
    } catch (error) {
      this.mostrarMensaje('Error', 'error', 'Error al agregar la casa');
      console.error(error);
    }
  }

  async updateCasa(casa: casa) {
    if (this.validaciones(casa) == false) {
      this.mostrarMensaje('Error', 'error', 'Ingrese datos validos');
      return;
    }

    try {
      const docRef = await this.getCasa(casa.id);
      if(docRef){
        await updateDoc(docRef, { ...casa });
        this.mostrarMensaje('Éxito', 'success', 'Casa actualizada correctamente');
      }
    } catch (error) {
      this.mostrarMensaje('Error', 'error', 'Error al actualizar la casa');
      console.error(error);
    }
  }

  async deleteCasa(id: number) {
   const casaRef= await this.getCasa(id);
   if(casaRef){
    await deleteDoc(casaRef);
    this.mostrarMensaje('Éxito', 'success', 'Casa eliminada correctamente');
   }
  }

  
  
  submitApplication(nombre: string, apellido: string, mail: string) {
    console.log(
      `aplicacion de casa recibida recibida: Nombre: ${nombre}, Apellido: ${apellido}, Email: ${mail}.`
    );
  }

 
  async getCasa(id: number): Promise<any> {
    const collectionRef = collection(this.firestore, 'casas');
    const q = query(collectionRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return undefined;
    }
    const docRef = querySnapshot.docs[0].ref;
   return docRef;
  }


  async obtenerCasa(id: number): Promise<any> {
    const collectionRef = collection(this.firestore, 'casas');
    const q = query(collectionRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return undefined;
    }
    const docRef = querySnapshot.docs[0].data() as casa;
   return docRef;
  }

  validaciones(casa: casa): boolean {
    if (casa.unidades < 1 || casa.unidades % 1 != 0) {
      return false;
    }
    return true;
  }

  mostrarMensaje(title: string, icon: any, mensaje?: string): void {
    Swal.fire({
      title: title,
      text: mensaje,
      icon: icon,
      confirmButtonText: 'Aceptar',
    });
  }

  constructor() {}
}
