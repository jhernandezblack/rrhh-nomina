import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendEmailVerification,
  User 
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { DocumentSnapshot,Firestore, doc, setDoc, getDoc, docData } from '@angular/fire/firestore';
import {from, of, switchMap, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firestore = inject(Firestore);
  private auth = inject(Auth) as Auth;
  private router = inject(Router);
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.userSubject.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.userSubject.next(null);
      this.router.navigate(['/login']);
    });
  }

  isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
  // save usuario extra data

  async saveUserProfile(uid: string, data: any): Promise<void> {
    const userRef = doc(this.firestore, 'usuarios', uid);
    await setDoc(userRef, data);
  }

  async sendEmailVerification(user: User): Promise<void> {
    await sendEmailVerification(user);
  }

  getUserRole$(): Observable<string | null> {
    return this.user$.pipe(
      switchMap((user: User | null) => {
        if (!user) return of(null);
        const ref = doc(this.firestore, 'usuarios', user.uid);
        return from(getDoc(ref)).pipe(
          map((snapshot: DocumentSnapshot<any>) => {
            return snapshot.exists() ? snapshot.data()?.['role'] || null : null;
          })
        );
      })
    );
  }


  getFirebaseAuthState(): Observable<User | null> {
    return new Observable(subscriber => {
      return onAuthStateChanged(this.auth, user => {
        this.userSubject.next(user); // actualiza el observable interno
        subscriber.next(user);
        subscriber.complete(); // ✅ se completa después de obtener el estado actual
      });
    });
  }

  // profile
  getUserProfile$() {
    const user = this.auth.currentUser;
    if (!user) return of(null);
    const userDoc = doc(this.firestore, 'usuarios', user.uid);
    return docData(userDoc); // Returns Observable<{ name: string; lastName: string; ... }>
  }

}
