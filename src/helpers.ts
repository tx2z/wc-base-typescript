/**
 * Replace the variables in the template
 * @param {string} template - The html template
 * @param {object} variables - The variables that going to be replaced in the document
 * @param {string} [fallback=''] - A fallback to replace the variable in case it's not included in the variables parameter
 */
export default function prepareTemplate(
  template: string,
  variables: object,
  fallback = ''
): string {
  const regex = /\${[^{]+}/g;
  return template.replace(regex, match => {
    const path = match.slice(2, -1).trim();
    return path.split('.').reduce((res, key) => res[key] || fallback, variables);
  });
}
