export function interpolate(str: string, params: object | null): string {
  let formattedString = str;

  if (!params || !Object.keys(params)) {
    return str;
  }

  for (const [key, value] of getObjectEntries(params)) {
    if (value === null || value === undefined) {
      continue;
    }

    formattedString = formattedString.replace(new RegExp('{' + key + '}', 'gi'), value.toString());
  }

  return formattedString;
}

export function getObjectEntries(object: object) {
  const ownProps = Object.keys(object);
  let i = ownProps.length;
  const resArray = new Array(i); // preallocate the Array

  while (i--) {
    resArray[i] = [ownProps[i], object[ownProps[i]]];
  }

  return resArray;
}
