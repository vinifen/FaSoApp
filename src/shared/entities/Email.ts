import i18n from "../i18n";

export default class Email {
  constructor(private email: string) {
    this.email.trim();
    this.validate(this.email);
  }
  
  get value(): string {
    return this.email;
  }
  
  private validate(email: string): void {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.length > 100) {
      errors.push(i18n.t("email_error_amount"));
    }
    
    if (!emailRegex.test(email)) {
      errors.push(i18n.t("email_error_format"));
    }
    
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  }
}
