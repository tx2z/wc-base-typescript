interface TemplateVariables {
  [key: string]: string | null | TemplateVariables;
}

/**
 * Replace the variables in the template
 * @param {string} template - The html template
 * @param {object} variables - The variables that going to be replaced in the document
 * @param {string} [fallback=''] - A fallback to replace the variable in case it's not included in the variables parameter
 */
export function prepareTemplate(
  template: string,
  variables: TemplateVariables,
  fallback = ''
): string {
  const regex = /\${[^{]+}/g;
  return template.replace(regex, (match) => {
    const path = match.slice(2, -1).trim();
    let result: string | null | TemplateVariables | undefined = variables;
    for (const key of path.split('.')) {
      if (typeof result !== 'object' || result === null) {
        return fallback;
      }
      result = result[key];
      if (result === undefined || result === null) {
        return fallback;
      }
    }
    return typeof result === 'string' ? result : fallback;
  });
}

/**
 * Conver an attribute (separated by -) to camel case string
 * @param {string} attr - The attribute to convert
 */
export function attrToCamel(attr: string): string {
  const attrParts = attr.split('-');
  const arrrPartsCapitalice = attrParts.map((part, i) => {
    if (i !== 0) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }
    return part;
  });
  return arrrPartsCapitalice.join('');
}
