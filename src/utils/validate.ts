/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: any) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string) {
  // eslint-disable-next-line camelcase
  const valid_map: string[] = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
