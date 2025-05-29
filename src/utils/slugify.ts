
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-'); // Remove hífens duplos
};

export const generateUniqueSlug = async (baseSlug: string, checkFunction: (slug: string) => Promise<boolean>): Promise<string> => {
  let slug = baseSlug;
  let counter = 1;

  while (await checkFunction(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};
