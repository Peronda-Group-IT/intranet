const FTP_API = process.env.NEXT_PUBLIC_FTP_API
const FTP_API_KEY = process.env.NEXT_PUBLIC_FTP_API_KEY

export async function fetchCollectionItems(route) {

  try {
    const response = await fetch(`${FTP_API}/files?path=${route}`, {
      headers: {
        'x-api-key': FTP_API_KEY,
      },
    });

    if (!response.ok) {
      return null;
    }

    const items = await response.json();

    const filteredItems = items
      .filter((item) => item.type === 1 && item.name.endsWith(".tif"))
      .map((item) => item.name);

    return filteredItems;
    
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchImageWebP(route) {
  try {
    const response = await fetch(`${FTP_API}/render-png?path=${route}`, {
      headers: {
        'x-api-key': FTP_API_KEY,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const blob = await response.blob();
    return URL.createObjectURL(blob); // 👈 turn blob into usable URL
  } catch (error) {
    console.error(error);
    return null;
  }
}

