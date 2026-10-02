import PageHeader from "../../components/design-system/PageHeader";
import type { User } from "../../types/user";
import Parent from "./components/Parent";


 function dropDrilling() {
  
    const user: User = {
      id: 1,
      firstName: 'ALi',
      lastName: 'ALavi',
    }

  return (
    <>
      <PageHeader>Drop-drilling Page:</PageHeader>
      <Parent user={user}/>
    </>
  )
}
export default dropDrilling;