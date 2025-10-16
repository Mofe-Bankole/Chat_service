export type AuthRequest = {
    user : User;
    receiverId: string;
    message: string;
};

export type User = {
    id : string;
    name : string;
    email : string;
    password : string;
}