const CMS_API = process.env.NEXT_PUBLIC_CMS_API

export default async function fetchCollectionItems(route) {
  try {
    const response = await fetch(`${CMS_API}/files?path=${route}`);

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
