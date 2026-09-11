// // import { UserModel } from "../../DB/model/user.model"
// import { UserModel } from "../../DB/model/user.model.js";
// // import { UserModel } from "../../DB/model.js";
// export const signup =  async({email,password,username}) => {
//     const  duplicatedAccount= await UserModel.findOne({email})
//     if (duplicatedAccount) 

//         throw new Error("Email Exist", { cause: { status: 409 } })
//     const  account = await UserModel.create({email,password,username})
//     return account
// }

// export const login = (inputs) => {
//     // throw new Error("not Exist", { cause: { status: 404 } })

//     return []
// }



import { ConflictException,  NotfoundException } from "../../common/exceptions/error.exception.js";
import {  createOne,findOne } from "../../common/repository/index.js";
import { encryption } from "../../common/security/encryption.security.js";
import { hash } from "../../common/security/index.js";
import { UserModel } from "../../DB/model/user.model.js";
import bcrypt from'bcrypt'


export const signup = async ({ email, password, username,phone }) => {
    const duplicatedAccount = await findOne({ 
        model: UserModel,
        filter:{email},
        options:{select:"email"}

     });

    if (duplicatedAccount) throw ConflictException();
    
    const [firstName, lastName] = username.split(" ");

    
    const account = await createOne({
        model: UserModel,
         data: {
            email,
            password:await hash( password),
            phone:await encryption(phone),
            username,
            firstName,
            lastName
        }
    });

    return account;
};

export const login = async({email,password}) => {
      const account =  await findOne({ 
        model: UserModel,
        filter:{email},

     });

    if (!account) throw NotfoundException("Invalid email or password");
    const match = await bcrypt.compare(password , account.password ,)
    
    
    if (!match) throw NotfoundException("Invalid email or password");

    return account;
};
