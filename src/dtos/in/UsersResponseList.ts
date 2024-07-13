export interface UsersResponseList {
    users: UserInDto[];
}

export interface UserInDto {
    id: string;
    name: string;
    email: string;
    nif: string;
    roleName: string;
    phoneNumber: string;
    iamId: string;
  }