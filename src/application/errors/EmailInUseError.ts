

export class EmailInUseError extends Error {
    constructor() {
        super('Email In Use ');
        this.name = 'EmailInUseError'
      }
}