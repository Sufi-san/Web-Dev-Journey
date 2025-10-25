import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

const { appwriteUrl, appwriteProjectId } = conf;

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                name: name,
                email: email,
                password: password
            });
            if (userAccount) {
                // log the user in if the account creation is successful, return the session
                return await this.login({ email, password });
            }
            else {
                // returning the value on failure
                return userAccount;
            }
        }
        catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            return null;
        }
    }

    async login({ email, password }) {
        try {
            return await account.createEmailPasswordSession({
                email: email,
                password: password
            });

        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
            return null;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        }
        catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
