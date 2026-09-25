export class UrlNotFoundError extends Error {
  constructor() {
    super('URL não encontrada.')
  }
}
