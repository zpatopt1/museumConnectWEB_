import { Injectable } from '@angular/core';
import { Coder } from './coder';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodersService {


  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) {

  }

  // Método para obter todos os documentos da coleção
  getAllCoders(): Observable<Coder[]> {

    return this.firestore.collection<Coder>('Coders').valueChanges({ idField: 'id' }).pipe(
      map((data: any[]) => {
        return data.map(element => {
          return {
            id: element.id,
            code: element['code'],
            firstName: element['first-name'],
            lastName: element['last-name'],
            email: element['email'],
            picture: element['picture']
          }
        })
      })
    );
  }

  // Método para adicionar um documento à coleção
  addCoder(coder: Coder): Promise<any> {

    // Mapeamento manual para os campos do Firestore
    var firestoreCoder: any = {
      'code': coder.code,
      'first-name': coder.firstName,
      'last-name': coder.lastName,
      'email': coder.email,
      'picture': coder.picture
      // ... outros campos do Firestore, se houver
    };

    return this.firestore.collection<Coder>('Coders').add(firestoreCoder);

  }

  deleteCoder(coder:Coder): Promise<void> {
    return this.firestore.collection<Coder>('Coders').doc(coder.id).delete();
  }

  updateCoder(coder: Coder): Promise<void> {
    
    var firestoreCoder: any = {
      'code': coder.code,
      'first-name': coder.firstName,
      'last-name': coder.lastName,
      'email': coder.email,
      'picture': coder.picture
      // ... outros campos do Firestore, se houver
    };
    return this.firestore.collection<Coder>('Coders').doc(coder.id).update(firestoreCoder);
  }

  getCoderById(id: string): Observable<Coder> {
    return this.firestore.collection<Coder>('Coders').doc<Coder>(id).valueChanges().pipe(
      map((data: any) => {
        
        return {
          id: data['id'],
          code: data['code'],
          firstName: data['first-name'],
          lastName: data['last-name'],
          email: data['email'],
          picture: data['picture']
        };
      })
    );
  }

  uploadFile(fileName:string, file: File): void {
    const filePath = `CodersPictures/${fileName}`;
    const task = this.storage.upload(filePath, file);
  }

  downloadFile(fileName: string): Observable<string> {
    const fileRef = this.storage.ref(`CodersPictures/${fileName}`);
    return fileRef.getDownloadURL();
  }
}
