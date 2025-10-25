import conf from "../conf/conf"; // experimenting, might need fix later
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

const { appwriteUrl, appwriteProjectId, appwriteDatabaseId, appwriteTableId, appwriteBucketId } = conf;

export class DatabaseService {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteProjectId);

        this.database = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImg, status, userId }) {
        try {
            const post = await this.database.createRow({
                databaseId: appwriteDatabaseId,
                tableId: appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    slug,
                    content,
                    featuredImg,
                    status,
                    userId
                }
            });
            return post;
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async getPost(slug) {
        try {
            const post = await this.database.getRow({
                databaseId: appwriteDatabaseId,
                tableId: appwriteTableId,
                rowId: slug
            });
            return post;
        }
        catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) { // could have used enums
        try {
            const posts = await this.database.listRows({
                databaseId: appwriteDatabaseId,
                tableId: appwriteTableId,
                queries: queries // need to create 'indexes' on appwrite table for these queries to work
            });
            return posts;
        }
        catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredImg, status }) {
        try {
            const post = await this.database.updateRow({
                databaseId: appwriteDatabaseId,
                tableId: appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImg,
                    status
                },
            });
            return post;
        }
        catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteRow({
                databaseId: appwriteDatabaseId,
                tableId: appwriteTableId,
                rowId: slug,
            });
            return true;
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            const result = await this.storage.createFile({
                bucketId: appwriteBucketId,
                fileId: ID.unique(),
                file
            });
            return result;
        }
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    // file delete service
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: appwriteBucketId,
                fileId
            })
            return true;
        }
        catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            const preview = storage.getFileView({
                bucketId: appwriteBucketId,
                fileId: fileId
            });
            return preview;
        }
        catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return false;
        }
    }

}

const databaseService = new DatabaseService();

export default databaseService;