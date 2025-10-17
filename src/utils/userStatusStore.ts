export class userStatusStore{
    private static instance : userStatusStore;
    private userStatuses : Record<string, boolean>;
    private constructor(){
        this.userStatuses = {}
    }

    public static getInstance() : userStatusStore{
        if(!userStatusStore.instance){
            userStatusStore.instance = new userStatusStore();
        }

        return userStatusStore.instance;
    }

    setUserOnline(userid : string){
        this.userStatuses[userid] = true;
    }

    setUserOffline(userid : string){
        this.userStatuses[userid] = false;
    }
    
    isUserOnline(userId: string): boolean {
        return !!this.userStatuses[userId];
    }

}