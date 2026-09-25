export class InvalidShortUrlHandleError extends Error {
  constructor() {
    super(
      'Link encurtado inválido. Use apenas letras, números, hífens e underlines, entre 2 e 15 caracteres.'
    )
  }
}
