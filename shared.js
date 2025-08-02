import { app, db, storage, firebaseReady } from './firebase-config.js';
import {
  collection, addDoc, getDocs, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

export function assertFirebaseReady() {
  if (!firebaseReady) {
    alert("Please paste your Firebase config in firebase-config.js");
    throw new Error("Firebase config missing");
  }
}

export async function loadOptions(selectEl, collName, valueField='id', labelField='name') {
  assertFirebaseReady();
  selectEl.innerHTML = '<option value="">Loading...</option>';
  const snap = await getDocs(query(collection(db, collName), orderBy(labelField)));
  const options = ['<option value="">Select</option>'];
  snap.forEach(doc => {
    const d = doc.data();
    const value = d[valueField] ?? doc.id;
    const label = d[labelField] ?? doc.id;
    options.push(`<option value="${value}">${label}</option>`);
  });
  selectEl.innerHTML = options.join('');
}

export function toISODate(dateStr) {
  // Accepts yyyy-mm-dd; returns ISO string at 00:00 local
  try {
    const [y,m,d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m-1, d, 0, 0, 0);
    return dt.toISOString();
  } catch (e) {
    return null;
  }
}

export async function compressImage(file, maxSize=1280, quality=0.8) {
  // Returns a Blob
  const img = new Image();
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  img.src = dataUrl;
  await new Promise(res => img.onload = res);

  const canvas = document.createElement('canvas');
  let { width, height } = img;
  const ratio = Math.min(maxSize/width, maxSize/height, 1);
  width = Math.round(width * ratio);
  height = Math.round(height * ratio);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const blob = await new Promise(res => canvas.toBlob(res, outType, quality));
  return blob || file;
}

export async function uploadPhoto(file, pathPrefix='reports') {
  assertFirebaseReady();
  const fname = `${Date.now()}_${Math.random().toString(36).slice(2)}.${(file.type.split('/')[1]||'jpg')}`;
  const r = ref(storage, `${pathPrefix}/${fname}`);
  await uploadBytes(r, file);
  return await getDownloadURL(r);
}

export async function createDoc(collName, data) {
  assertFirebaseReady();
  data.createdAt = serverTimestamp();
  const refDoc = await addDoc(collection(db, collName), data);
  return refDoc.id;
}
