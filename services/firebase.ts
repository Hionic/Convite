import type { FirebaseError } from "firebase/app";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getBlob,
  list,
} from "firebase/storage";
import swal from "sweetalert2";
import { firebaseErrorsTranslation } from "~~/utils/firebase";
import { swalError, swalSuccess } from "~~/utils/swalAlerts";

export const app = initializeApp({
  apiKey: "AIzaSyCpJi_o7zgAFpbrvlHjK8tN9vO8V5hp580",
  authDomain: "conviteaniversario-ead9e.firebaseapp.com",
  projectId: "conviteaniversario-ead9e",
  storageBucket: "conviteaniversario-ead9e.firebasestorage.app",
  messagingSenderId: "519902234628",
  appId: "1:519902234628:web:8f79361fe53e197b2e4d51",
  measurementId: "G-2JJFJWTFN6",
});

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const fbRef = ref;

export const storage = getStorage(app);

let authReady = false;

export const isAuthenticated = async () => {
  if (authReady) {
    return !!auth.currentUser;
  }

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (authUser) => {
      authReady = true;
      resolve(!!authUser);
    });
  });
};

export const getToken = async (forceRefresh = false) => {
  const user = auth.currentUser;

  if (!user) {
    return "";
  }

  return user.getIdToken(forceRefresh);
};

export const singIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    swalError("Erro ao efetuar o login", "Atenção, usuário ou senha inválidos");
    console.log(error);
    throw Error(error.message);
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("token");
    await auth.signOut();
  } catch (error: any) {
    console.log(error);
    throw Error(error.message);
  }
};

export const recoveryPassword = async (email: string) => {
  if (!email) {
    swalError("Erro ao recuperar senha", "Email não informado.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    swalSuccess(
      "Email enviado",
      "Caso email seja válido, você receberá um link para redefinir sua senha."
    );
  } catch (error: any) {
    swalError(
      "Erro ao recuperar senha",
      error.message === "Firebase: Error (auth/invalid-email)." &&
        "Email inválido"
    );

    console.log(error);
    throw Error(error.message);
  }
};

export const uploadPdfToStorage = async (
  file: any,
  name: string,
  cnpj: string
) => {
  try {
    const storageRef = ref(storage, `${cnpj}/${name}.pdf`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    console.log(error);
    throw Error(error.message);
  }
};

export const uploadFilesToStorage = async (
  cnpj: string,
  name: string,
  file: any
) => {
  try {
    const storageRef = ref(storage, `${cnpj}/${name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    console.log(error);
    throw Error(error.message);
  }
};

type UploadFileToStorage = {
  path: string;
  file: File;
};

export const uploadFileToStorage = async ({
  path,
  file,
}: UploadFileToStorage) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const deleteFile = async (cnpj: string, name: string) => {
  try {
    const storageRef = ref(storage, `${cnpj}/${name}`);
    await deleteObject(storageRef);
    console.log("Arquivo excluído com sucesso.");
  } catch (error) {
    console.error("Erro ao excluir o arquivo:", error);
  }
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const downloadFile = async (cnpj: string) => {
  try {
    const folderRef = ref(storage, `${cnpj}/retificacoes`);
    const folderItems = await list(folderRef);
    console.log("folderItems", folderItems);
    const downloadPromises = folderItems.items.map(async (item) => {
      const blob = await getBlob(item);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    await Promise.all(downloadPromises);
  } catch (error) {
    console.error("Erro ao listar itens da pasta:", error);
  }
};

type SignUpInput = {
  email: string;
  password: string;
};

export const signUpWithEmail = async ({ email, password }: SignUpInput) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      uid: userCredentials.user.uid,
      email: userCredentials.user.email as string,
      displayName: userCredentials.user.email as string,
      photoURL: userCredentials.user.photoURL ?? undefined,
      emailVerified: userCredentials.user.emailVerified,
    };
  } catch (error) {
    const firebaseError = error as FirebaseError;

    throw new Error(
      firebaseErrorsTranslation[firebaseError.code] || firebaseError.message
    );
  }
};
