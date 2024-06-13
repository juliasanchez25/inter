export function transformNumberToPhone(value: string) {
  if (!value) return ''
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
}

export function transformPhoneToNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1$2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
}
