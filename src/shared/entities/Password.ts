import i18n from "../i18n";

export default class Password {
  constructor(private password: string) {
    this.validate(this.password);
  }

  get value(): string{
    return this.password;
  }
  
  private validate(password: string): void {
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push(i18n.t("password_error_min_length"));
    }   
    
    if (password.length > 71) {
      errors.push(i18n.t("password_error_max_length"));
    }
    
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
  }
}
