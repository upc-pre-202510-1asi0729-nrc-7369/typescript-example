interface User{
    name: string;
    id: number;
}

class UserAccount{
     name: string;
     id: number;

     constructor(name: string, id: number){
        console.log(name);
        console.log(id);
     }
}

const user: User = new UserAccount("wilder", 1);