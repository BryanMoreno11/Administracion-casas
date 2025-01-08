import { Injectable } from '@angular/core';
import { casa } from '../entidades/casa';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class CasaService {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  protected ListaCasas: casa[] = [
    {
      id: 0,
      nombre: 'Acme Fresh Start Housing',
      ciudad: 'Salinas',
      provincia: 'Santa elena',
      foto: [`${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`],
      unidades: 2,
      wifi: true,
      lavanderia: true,
    },
    {
      id: 1,
      nombre: 'A113 Transitional Housing',
      ciudad: 'Guayaquil',
      provincia: 'Guayas',
      foto: [
        'https://images.adsttc.com/media/images/623c/4fa0/3e4b/3145/3000/001b/newsletter/_d_ambrosio_07._copy.jpg?1648119692',
        `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
        'https://arqa.com/wp-content/uploads/2022/04/1649187090_@d_ambrosio-06-1024x1024-1-530x530.jpg',
        'https://images.adsttc.com/media/images/623b/9911/d395/0701/660b/a01b/medium_jpg/at-d-ambrosio-15.jpg?1648073043',
      ],
      unidades: 3,
      wifi: false,
      lavanderia: true,
    },
    {
      id: 2,
      nombre: 'Warm Beds Housing Support',
      ciudad: 'Salinas',
      provincia: 'Santa elena',
      foto: [
        'https://media.admagazine.com/photos/618a7f17a8ad6c5249a75d3f/master/pass/42931.jpg',
        'https://hips.hearstapps.com/es.h-cdn.co/mcres/images/mi-casa/ideas-decoracion/xx-claves-para-decorar-una-casa-de-campo/colores-y-tejidos/1056793-1-esl-ES/colores-y-tejidos.jpg',
        'https://i.pinimg.com/736x/2b/f5/e4/2bf5e41b7101d92ece65c97a4dfe01da.jpg',
        'https://i.pinimg.com/564x/ff/16/0a/ff160ab0e33f33897c275daabd96c0d7.jpg',
        'https://i.ytimg.com/vi/LxZqUYNg2W4/maxresdefault.jpg',
      ],
      unidades: 2,
      wifi: false,
      lavanderia: true,
    },
    {
      id: 3,
      nombre: 'Homesteady Housing',
      ciudad: 'Machala',
      provincia: 'El oro',
      foto: [
        'https://img10.naventcdn.com/avisos/9/01/43/60/43/54/360x266/1463251112.jpg?isFirstImage=true',
        'https://pics.nuroa.com/casa_en_alquiler_machala_para_oficinas_o_familia_7400086689426217774.jpg',
        `https://angular.io/assets/images/tutorials/faa/ian-macdonald-W8z6aiwfi1E-unsplash.jpg`,
        'https://static.tokkobroker.com/pictures/16815062748684008258342615654656582561184482539773351468608099788944419906804.jpg',
      ],
      unidades: 1,
      wifi: true,
      lavanderia: false,
    },
    {
      id: 4,
      nombre: 'Happy Homes Group',
      ciudad: 'Manta',
      provincia: 'Manabi',
      foto: [
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/481965516.jpg?k=2cda9b84fac017955463fd4dd67be7194cba3fe41802e7c3b7da1f79c9d6f2b3&o=&hp=1',
        'https://a0.muscache.com/im/pictures/107079611/62ae3b07_original.jpg?im_w=720',
        `${this.baseUrl}/krzysztof-hepner-978RAXoXnH4-unsplash.jpg`,
      ],
      unidades: 1,
      wifi: true,
      lavanderia: false,
    },
    {
      id: 5,
      nombre: 'Hopeful Apartment Group',
      ciudad: 'Crucitas',
      provincia: 'Manabi',
      foto: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsGwFnA-rxrjg88qJtSGgHpXmuUQ1Z9ViktA&s',
        `${this.baseUrl}/r-architecture-JvQ0Q5IkeMM-unsplash.jpg`,
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/481965481.jpg?k=5dd05099b9434fbc7b40029427853630b3fa464a4e7ab6f6845aca6e0f28f99c&o=&hp=1',
        'https://imganuncios.mitula.net/se_vende_casa_frente_al_mar_en_san_clemente_3930115688563674271.jpg',
      ],
      unidades: 1,
      wifi: true,
      lavanderia: false,
    },
    {
      id: 6,
      nombre: 'Seriously Safe Towns',
      ciudad: 'Canoas',
      provincia: 'Manabi',
      foto: [
        'https://img10.naventcdn.com/avisos/9/00/90/95/97/48/360x266/1110600784.jpg?isFirstImage=true',
        'https://img.properati.com/eyJidWNrZXQiOiJwcmQtbGlmdWxsY29ubmVjdC1wcm9qZWN0cy1hZG1pbi1pbWFnZXMiLCJrZXkiOiIzY2IyOWRkZi1kMmM1LTRmNzEtODY4ZS0yYTViYzg4OWNlMjEvM2NiMjlkZGYtZDJjNS00ZjcxLTg2OGUtMmE1YmM4ODljZTIxX2ZmN2FjNjdiLTAzZWMtNDFlZS1iNzllLWVjNzk2N2ZmMjhlYy5qcGVnIiwiYnJhbmQiOiJQUk9QRVJBVEkiLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo0ODAsImZpdCI6ImNvdmVyIn19fQ==',
        'https://pics.nuroa.com/terraza_santa_maria_circunvalacion_manta_vendo_casa_moderna_5240080717940375439.jpg',
        `${this.baseUrl}/phil-hearing-IYfp2Ixe9nM-unsplash.jpg`,
      ],
      unidades: 2,
      wifi: true,
      lavanderia: false,
    },
  ];
  getLista(): casa[] {
    return this.ListaCasas;
  }

  insertCasa(casa: casa) {
    if (this.verificarCodigoRepetido(casa.id)) {
      this.mostrarMensaje('Error',"error",'El codigo ya existe', );
      return;
    }

    if(this.validaciones(casa)==false){
      this.mostrarMensaje('Error',"error",'Ingrese datos validos' );
      return;
    }

    this.ListaCasas.push(casa);
    this.mostrarMensaje('Exito',"success",'Casa agregada correctamente');
  }

  updateCasa(casa: casa) {

    if(this.validaciones(casa)==false){
      this.mostrarMensaje('Error',"error",'Ingrese datos validos' );
      return;
    }

    let casaobj = this.getCasaId(casa.id);
    if (casaobj ) {
      let index = this.ListaCasas.indexOf(casaobj);
      this.ListaCasas[index] = casa;
      this.mostrarMensaje('Exito',"success",'Casa actualizada correctamente', );
    } else {
      this.mostrarMensaje('Error',"error",'No se encontro la casa');
    }
  }

  deleteCasa(id: number) {
    const casa = this.getCasaId(id);
    if (casa) {
      this.ListaCasas.splice(this.ListaCasas.indexOf(casa), 1);
    } else {
      this.mostrarMensaje('Error',"error",'No se encontro la casa');
    }
  }

  getCasaId(id: number): casa | undefined {
    return this.ListaCasas.find((c) => c.id === id);
  }
  submitApplication(nombre: string, apellido: string, mail: string) {
    console.log(
      `aplicacion de casa recibida recibida: Nombre: ${nombre}, Apellido: ${apellido}, Email: ${mail}.`
    );
  }

  verificarCodigoRepetido(codigo: number, index?: number) {
    let elementoRepetido = this.ListaCasas.find(
      (casa: casa) => casa.id == codigo
    );

    if (elementoRepetido) {
      return true;
    }
    return false;
  }

  validaciones(casa:casa):boolean{
    if(casa.unidades<1 || casa.unidades%1!=0){
      return false;
    }
    return true;
  }

  mostrarMensaje(title:string,icon:any,mensaje?:string): void {
    Swal.fire({
      title: title,
      text: mensaje,
      icon: icon,
      confirmButtonText: 'Aceptar'
    });
  }

  constructor() {}
}
