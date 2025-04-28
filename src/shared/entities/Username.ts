import i18n from "../i18n";

export default class Username {
  constructor(private username: string) {
    this.username.trim();
    this.validate(this.username);
  }
  
  get value(): string {
    return this.username;
  }
  
  private validate(username: string): void {
    const errors: string[] = [];
    
    if (username.length > 100) {
      errors.push(i18n.t('username_error_amount'));
    }
    
    const invalidCharactersRegex = /[^a-zA-Z0-9_.\-]/;
    if (invalidCharactersRegex.test(username)) {
      errors.push(i18n.t('username_error_invalid_characters'));
    }
    
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  }
}
