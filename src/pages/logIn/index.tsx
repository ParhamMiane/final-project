import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import DsButton from "../../components/design-system/DsButton";
import PageHeader from "../../components/design-system/PageHeader";
import PagesLayout from "../../components/design-system/PagesLayout";
import { loginApi } from "../../services/login-service";

export type LoginFormData = {
  username: string;
  password: string;
};



const Login = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<LoginFormData>()
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      sessionStorage.setItem('token', data.accessToken); 
      toast.success("You Logged In Successfully");
      navigate('/app/home');
    },
    onError:(error) => {
      toast.error(error.message);
    }
  })
  

 const onLogin = (formData: LoginFormData) => {
  login({
    username: formData.username,
    password: formData.password
  })

};

  useEffect(() => {
    if(sessionStorage.getItem("token")) {
      navigate("/app/home")
    }
  }, [])

  return (
    <>
      <PagesLayout>
  <PageHeader>Login Page:</PageHeader>

  <form
    className="grid grid-cols-2 gap-6 w-175 min-h-105 my-12 mx-auto border border-slate-700/70 bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl"
    onSubmit={handleSubmit(onLogin)}
  >
    <div>
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          UserName
          {errors.username && (
            <span className="ml-2 text-xs text-red-400">
              UserName is requird
            </span>
          )}
        </label>

        <input
          type="text"
          placeholder="Username:"
          {...register('username', {required: true})}
          className="w-full p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-200 mb-2">
        PassWord
        {errors.password && (
          <span className="ml-2 text-xs text-red-400">
            PassWord is requird
          </span>
        )}
      </label>

      <input
        type="password"
        placeholder="Password:"
        {...register('password', {required: true})}
        className="w-full p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>

    <div className="col-span-2 mt-4">
      <DsButton
        type="submit"
        classname="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 p-3 rounded-lg text-center text-white font-medium transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
        isLoading={isPending}
      >
        Login
      </DsButton>

      <Link to="/recoveryPass" className="block mt-3">
        <DsButton
          type="button"
          classname="w-full bg-slate-700/80 hover:bg-slate-600 p-3 rounded-lg text-white font-medium transition-all duration-200"
          isDisabled={isPending}
        >
          Recover password
        </DsButton>
      </Link>

      <span className="block text-center text-sm text-slate-400 mt-5">
        Don't have an account?
        <span className="ml-1 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
          sign up
        </span>
      </span>
    </div>
  </form>
</PagesLayout>
    </>
  );
};
export default Login;