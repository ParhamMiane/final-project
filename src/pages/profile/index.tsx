import PageHeader from "../../components/design-system/PageHeader";
import { useAuthStore } from "../../stores/auth.store";

 const Profile = () => {
  
  const { user } = useAuthStore()

  return (
    <>
      <PageHeader>Profile Page:</PageHeader>
      <div className="flex flex-col gap-6 border-3 pt-0 mx-auto my-3 border-slate-700 bg-slate-800 justify-center text-center w-150 min-h-100 rounded-3xl">
         
         <figure className="size-25 p-2 mx-auto justify-center bg-gray-700 rounded-full overflow-hidden">
          <img src={user?.image} alt="Avatar" />
         </figure>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{user?.firstName + ' ' + user?.lastName}</h1>
          <h2 className="text-3xl">{user?.email}</h2>
          <h3 className="text-3xl">{user?.gender}</h3>
        </div>
      </div>
    </>
  )
}
export default Profile;