import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Required for [(ngModel)]
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    FormsModule // ✅ Fixes ngModel error
  ]
})
export class ProfileComponent implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  isEditing = false;

  userData: any = null;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) return;

    const docRef = doc(this.firestore, 'usuarios', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.userData = docSnap.data();
    }
  }

  toggleEdit(): void {
    this.isEditing = true;
  }

  async saveChanges(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user || !this.userData) return;

    const userRef = doc(this.firestore, 'usuarios', user.uid);
    await updateDoc(userRef, this.userData);
    this.isEditing = false;
  }
  

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      console.warn('⛔ No file selected');
      return;
    }

    this.selectedFile = file;
    this.uploadPhoto(); // ✅ Trigger upload
  }

  async uploadPhoto(): Promise<void> {
    console.log('📤 UploadPhoto called');
    const user = this.auth.currentUser;
    if (!user || !this.selectedFile) {
      console.warn('⛔ No user or file selected');
      return;
  }

    const fileRef = ref(this.storage, `profilePhotos/${user.uid}.jpg`);
    await uploadBytes(fileRef, this.selectedFile);
    const photoURL = await getDownloadURL(fileRef);

    const userRef = doc(this.firestore, 'usuarios', user.uid);
    await updateDoc(userRef, { photoURL });

    this.userData.photoURL = photoURL;
  }

  async removePhoto(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) return;

    const userRef = doc(this.firestore, 'usuarios', user.uid);
    await updateDoc(userRef, { photoURL: '' });

    this.userData.photoURL = '';
  }
}
