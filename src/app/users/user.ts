export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  userName: string;
  profile: string;

  constructor(id?: number, name?: string, email?: string, password?: string, userName?: string, profile?: string){
    this.id = id
    this.name = name;
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.profile = profile;
  }
}
