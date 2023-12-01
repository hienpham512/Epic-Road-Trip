import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signinWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const { email, uid, displayName } = res.user;
        getDocs(
          query(collection(db, "users"), where("email", "==", email))
        ).then((docs) =>
          docs.docs.length === 0
            ? setDoc(doc(db, "users", uid), {
                firstName: displayName?.split(" ")[0],
                lastName: displayName?.split(" ")[1],
                email: email,
              })
            : null
        );
        navigate("/home/main");
      })
      .catch((err) => console.log(err));
  };

  const signin = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/home/main"))
      .catch((e) => console.log(e));

  const signup = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword)
      alert("Password and Confirm Password do not match");
    else
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) =>
          setDoc(doc(db, "users", res.user.uid), {
            firstName,
            lastName,
            email,
          })
            .then(() => navigate("/home/main"))
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
  };

  const signout = () =>
    signOut(auth)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

  return { signin, signup, signout, signinWithGoogle };
};
