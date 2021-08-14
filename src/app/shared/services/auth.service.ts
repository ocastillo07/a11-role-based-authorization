import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public userData: Observable<any>;
  public currentUser: any;
  public userStatus: string = null;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  constructor(private ngZone: NgZone, private auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
    this.userData = auth.authState;
  }

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  signUp(email:string, password:string){
  
    this.auth.createUserWithEmailAndPassword(email, password)
     .then((userResponse)=>{
       // add the user to the "users" database
       let user = {
        id: userResponse.user.uid,
        username: userResponse.user.email,
        role: "user",
       }
       
       //add the user to the database
       this.firestore.collection("users").add(user)
       .then(user => {
        user.get().then(x => {
          //return the user data
          console.log(x.data());
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
          this.router.navigate(["/"]);
        })
       }).catch(err => {
         console.log(err);
       })
     })
     .catch((err)=>{
        console.log("An error ocurred: ", err);
     })
 
  }

  login(user: User) {

    const {email, password} = user;
      
    this.auth.signInWithEmailAndPassword(email, password)
    .then((user)=>{
      this.firestore.collection("users").ref.where("username", "==", user.user.email).onSnapshot(snap =>{
        snap.forEach(userRef => {
          console.log("userRef =>", userRef.data());
          this.currentUser = userRef.data();
          localStorage.setItem('username', this.currentUser.username);
          localStorage.setItem('role', this.currentUser.role);
          //setUserStatus
          this.setUserStatus(this.currentUser)
          if(this.currentUser.role !== "admin") {
            this.router.navigate(["/"]);
          }else{
            this.router.navigate(["/admin"]);
          }
        })
      })
     
    }).catch(err => err)
  }

  logOut(){
    this.auth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      //set current user to null to be logged out
      this.currentUser = null;
      //set the listenener to be null, for the UI to react
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["/login"]));

    }).catch((err) => {
      console.log(err);
    })
  }


  // userChanges(){
  //   this.auth.onAuthStateChanged(currentUser => {
  //     if(currentUser){
  //       this.firestore.collection("users").ref.where("username", "==", currentUser.email).onSnapshot(snap =>{
  //         snap.forEach(userRef => {
  //           this.currentUser = userRef.data();
  //           //setUserStatus
  //           this.setUserStatus(this.currentUser);
  //           console.log(this.userStatus)
            
  //           if(userRef.data().role !== "admin") {
  //           this.ngZone.run(() => this.router.navigate(["/"]));
  //           }else{
  //           this.ngZone.run(() => this.router.navigate(["/admin"])); 
  //           }
  //         })
  //       })
  //     }else{
  //       //this is the error you where looking at the video that I wasn't able to fix
  //       //the function is running on refresh so its checking if the user is logged in or not
  //       //hence the redirect to the login
  //       this.ngZone.run(() => this.router.navigate(["/login"]));
  //     }
  //   })
  // }


}
