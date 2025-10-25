import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../";
import databaseService from "../../appwrite/config";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function PostForm({ post }) {

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.userData);

    const submit = async (data) => { // react-hook-form will provide the 'data' here

        if (post) { // if we are editing an old post (update operation)

            /*
                We are using the 'storage' service to store files. 
                So in case of images, they too will be stored there.
                We then use this stored image's id for the 'featuredImg' field of our post in the table
                So a separate operation is needed to first upload the image file
            */
            const file = data.image[0] ? databaseService.uploadFile(data.image[0]) : null // checking for a new image file and uploading it to storage

            if (file) { // delete old image if new one is to be used
                databaseService.deleteFile(post.featuredImg);
            }

            // update the post in our database table, with current data
            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImg: file ? file.$id : undefined
            });

            if (dbPost) {
                navigate(`/post/${dbPost.id}`);
            }

        }
        else {
            const file = await databaseService.uploadFile(data.image[0]); // We don't need to check for the presence of image file here. It is a required field in the form and for new posts, user must upload the image before submitting.

            const dbPost = await databaseService.createPost({
                ...data,
                featuredImg: file?.$id,
                userId: userData.$id // as this is a new post that is being created by the logged in user
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, "") // remove everything from the title except alphabets, digits and spaces
                .replace(/\s/g, "-"); // replace all spaces with '-'
        }

        return "";
    }, []);

    useEffect(() => {
        const subscriptions = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscriptions.unsubscribe(); // optimization, unsubscribe when form not in use
        }
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title: "
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", {
                        required: true
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image: "
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {
                    post && (
                        <div className="w-full mb-4">
                            <img
                                src={databaseService.getFilePreview(post.featuredImg)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )
                }
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {
                    ...register("status", {
                        required: true
                    })
                    }
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update": "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
