import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, updateDoc, deleteDoc, query, where, doc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword, signOut, deleteUser } from '@angular/fire/auth';
import { usuario } from '../entidades/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosCollection = collection(this.firestore, 'usuarios');

  constructor(private firestore: Firestore, private auth: Auth, private _route:Router) {

  }

  async register(user: usuario) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, user.email, user.password);
      const uid = userCredential.user.uid;

      await addDoc(this.usuariosCollection, {
        uid,
        nombres: user.nombres,
        apellidos: user.apellidos,
        telefono: user.telefono,
        imagen: user.imagen || '',
        email: user.email,
        password: user.password,
      });

      this.mostrarMensaje('Éxito', 'success', 'Usuario registrado correctamente');
      console.log('Usuario registrado y guardado en Firestore');
    } catch (error) {
      this.mostrarMensaje('Error', 'error', 'Error al registrar usuario');
      console.error('Error al registrar usuario:', error);
    }
  }

  // **Método de inicio de sesión**
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Sesión iniciada:', userCredential.user);
      this.mostrarMensaje('Éxito', 'success', 'Inicio de sesión exitoso');
      this._route.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.mostrarMensaje('Error', 'error', 'Error al iniciar sesión');
    }
  }


  async loginUsuario(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Sesión iniciada:', userCredential.user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }


  // **Método para verificar sesión**
  checkSession(): boolean {
    return !!this.auth.currentUser;
  }

  async getUsuarioActual(): Promise<usuario | null> {
    try {
      const user = this.auth.currentUser; 
      if (!user) {
        console.log('No hay usuario autenticado');
        return null;
      }
  
      const uid = user.uid;
      const userCollectionRef = collection(this.firestore, 'usuarios');
      const q = query(userCollectionRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].data() as usuario;
      return docRef;
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  
    return null;
  }
  

  // **Cerrar sesión**
  async logout() {
    try {
      await signOut(this.auth);
      console.log('Sesión cerrada');
      this.mostrarMensaje('Éxito', 'success', 'Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      this.mostrarMensaje('Error', 'error', 'Error al cerrar sesión');
    }
  }

  // **Obtener lista de usuarios**
  async getUsuarios(): Promise<usuario[]> {
    const snapshot = await getDocs(this.usuariosCollection);
    return snapshot.docs.map((doc) => doc.data() as usuario);
  }

  // **Actualizar usuario**
  async updateUsuario(uid: string, user:usuario) {
    try {
      let email= await this.updateEmail(user.email);
      let password= await this.updatePassword(user.password);
      if(email==false || password==false){
        return;
      }

      const userCollectionRef = collection(this.firestore, 'usuarios');
      const q = query(userCollectionRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, { ...user });
      console.log('Usuario actualizado correctamente');
      this.mostrarMensaje('Éxito', 'success', 'Usuario actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      this.mostrarMensaje('Error', 'error', 'Error al actualizar usuario');
    }
  }

  // **Actualizar email (requiere autenticación)**
  async updateEmail(newEmail: string) {
    try {
      if (this.auth.currentUser) {
        await updateEmail(this.auth.currentUser, newEmail);
        console.log('Email actualizado correctamente');
        return true;
        
      }
    } catch (error:any) {
      this.mostrarMensaje('Error', 'error', error.message);
      return false;
    }
    return false;
  }
  // **Actualizar contraseña**
  async updatePassword(newPassword: string) {
    try {
      if (this.auth.currentUser) {
        await updatePassword(this.auth.currentUser, newPassword);
        console.log('Contraseña actualizada correctamente');
        return true;
      }
    } catch (error:any) {
      console.error('Error al actualizar contraseña:', error);
      this.mostrarMensaje('Error', 'error', error.message);
      return false;

    }
    return false;
  }

  // **Eliminar usuario**
  async deleteUsuario(uid: string) {
    try {
      let deleteUser= await this.deleteCurrentUser();
      if(deleteUser==false){
        return;
      }
      const userCollectionRef = collection(this.firestore, 'usuarios');
      const q = query(userCollectionRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
      console.log('Usuario eliminado correctamente');
      this.mostrarMensaje('Éxito', 'success', 'Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }

  // **Eliminar usuario autenticado**
  async deleteCurrentUser() {
    try {
      if (this.auth.currentUser) {
        await deleteUser(this.auth.currentUser);
        console.log('Usuario autenticado eliminado y sesión cerrada');
        return true;
      }
    } catch (error:any) {
      console.error('Error al eliminar usuario autenticado:', error);
      this.mostrarMensaje('Error', 'error', error.message);
      return false;
    }
    return false;
  }

  mostrarMensaje(title: string, icon: any, mensaje?: string): void {
    Swal.fire({
      title: title,
      text: mensaje,
      icon: icon,
      confirmButtonText: 'Aceptar',
    });
  }


}
