import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function formatDate(date) {
  
    if (!date) return '';
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';
    
    // Format: DD/MM/YYYY
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
}

export function dateNowMinuteZero() {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  return format(now, "dd/MM/yyyy");
}

export function dateNowPlusOneHourMinuteZero() {
  const now = new Date();
  now.setHours(now.getHours() + 1, 0, 0, 0);
  return format(now, "dd/MM/yyyy");
}

export function timeNowMinuteZero() {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  return format(now, "HH:mm");
}

export function timeNowPlusOneHourMinuteZero() {
  const now = new Date();
  now.setHours(now.getHours() + 1, 0, 0, 0);
  return format(now, "HH:mm");
}

export function parseDateEU(dateString) {
  // Assumes format "DD/MM/YYYY HH:mm"
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes); // JS months are 0-based
}

export function formatLoadDate(isoString) {
  const date = new Date(isoString);

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

export function normalizeText(text) {
  if (!text) return '';
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export async function cmsFetch(url){
  const PERONDA_CMS_API_KEY = process.env.PERONDA_CMS_API_KEY;
  const PERONDA_CMS_URL = process.env.PERONDA_CMS_URL;
  const ORIGIN = process.env.NEXT_PUBLIC_URL;

    const response = await fetch(
      `${PERONDA_CMS_URL}${url}`,
      {
        method: "GET",
        headers: {
          Authorization: PERONDA_CMS_API_KEY,
          Origin: ORIGIN,
        },
        next: { revalidate: 3600 },
      },
    );
  
    const items = await response.json();

    

    return items?.length > 0 ? items : []
}