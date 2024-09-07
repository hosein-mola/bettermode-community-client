export const flattenCollection = (collection) => {
  const flattened: any = [];

  for (const item of collection) {
    if (item.submenu) {
      flattened.push(item);
      flattened.push(...flattenCollection(item.submenu));
    } else {
      flattened.push(item);
    }
  }

  return flattened;
};