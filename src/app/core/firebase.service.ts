import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore, private ngZone: NgZone) {}

  // Función para importar movimientos a Firestore
  async addMovements() {
    const movements = [
      { name: "Destructor", type: "Normal", power: 60, accuracy: 95, powerPoints: 25, effect: "Strikes the target with limbs, tail or the like." },
      { name: "Whiplash", type: "Grass", power: 45, accuracy: 100, powerPoints: 25, effect: "Lashes the target with vine-like appendages." },
      { name: "Embers", type: "Fire", power: 40, accuracy: 100, powerPoints: 25, effect: "The target is attacked with small flames. It may leave a burn." },
      { name: "Water Gun", type: "Water", power: 40, accuracy: 100, powerPoints: 25, effect: "Squirts water to attack the target." },
      { name: "Canto", type: "Normal", power: 0, accuracy: 55, powerPoints: 15, effect: "A soothing lullaby lulls the target into sleep." }
    ];

    const movementsCollection = this.firestore.collection('movements');

    // Ejecutar las llamadas a Firebase dentro del contexto de Angular
    await this.ngZone.runOutsideAngular(async () => {
      for (const move of movements) {
        await movementsCollection.add(move);
        console.log(`Movimiento agregado: ${move.name}`);
      }
    });
  }
}