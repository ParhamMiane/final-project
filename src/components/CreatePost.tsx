import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { creatPostApi } from "../services/post-service";
import type { CreatePostForm } from "../types/posts";
import DsButton from "./design-system/DsButton";
import PageHeader from "./design-system/PageHeader";
import PagesLayout from "./design-system/PagesLayout";
import { useAuthStore } from "../stores/auth.store";


const CreatePost = ()=>{

      const { user } = useAuthStore();
      const navigate = useNavigate();
      const queryClient = useQueryClient();
      const {register, handleSubmit, formState: {errors}} = useForm<CreatePostForm>({
        defaultValues: {
          title: '',
          body: '',
          userId: undefined
        }
      })
      const {mutate, isPending} = useMutation({
        mutationFn : creatPostApi,
        onSuccess: () => {
          toast.success("Post Created :)")
          queryClient.invalidateQueries({queryKey: ['posts-list']})
          navigate("/app/posts")
        },

        onError: (error) => {
          toast.error(error.message)
        }
      })

       const onCreatePost = (formData: CreatePostForm) => {
        mutate({
          title: formData.title,
          body: formData.body,
          userId: user?.id
        })

        // toast.success("Post Created Succesfully")
    };


    return(
        <>
      <PagesLayout>
        <PageHeader>Create Post Page:</PageHeader>

        <form
          className="flex flex-col gap-4 w-120 h-80 my-28 mx-auto border-5 border-gray-700 p-4 rounded-2xl pt-5 shadow-2xl shadow-slate-600"
          onSubmit={handleSubmit(onCreatePost)}
        >
          <label className="flex justify-between items-center">
            Title
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register('title', {required: 'Title is required'})}
            className="p-2 rounded-md text-white bg-slate-800"
          />

          <label className="flex justify-between items-center">
            Body
            {errors.body && <span className="text-red-500">{errors.body.message}</span>}
          </label>

          <textarea
            placeholder="Share Your Story..."
            className="p-2 rounded-md text-white bg-slate-800"
            rows={5}
            {...register('body', {required: "Body is required", minLength: {value: 10, message: 'At Least 10 characters'}})}
          />

          <div className="grid grid-cols-6">
            <DsButton
              type="submit"
              classname="bg-blue-500 p-2 rounded-md text-center"
              onClick={() => handleSubmit}
              isLoading={isPending}
              >
              Creat
            </DsButton>
  
            <Link to="/app/posts" className="mx-auto">
              <DsButton type="button" classname="bg-gray-500 p-2 rounded-md" isDisabled={isPending}>
                  Cancel
              </DsButton>
            </Link>
          </div>
        </form>
      </PagesLayout>
    </>
  );
};
export default CreatePost