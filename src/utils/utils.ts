/**
 * Hace una petición a una serie de URLs y devuelve una lista de objetos formateados.
 * @param {string[]} url - Una lista de URLs a las que hacer la petición
 * @returns {Object[]} Una lista de objetos con dos propiedades: "name" y "sprite".
 */

export const fetchAndFormatData = async (url: string[]) => {
  const fetchDataResult = await Promise.all(
    url.map(async (urlItem: string) => (await fetch(urlItem)).json())
  );
  const formatResult = fetchDataResult.map((u) => ({
    name: u.name,
    url: u.sprites.default,
  }));
  return formatResult;
};
