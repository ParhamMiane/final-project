import { createContext } from "react";
import PageHeader from "../../components/design-system/PageHeader";
import type { User } from "../../types/user";
import Parent from "./components/Parent";

export const UserContext = createContext<User | null>(null)

 function TestContext() {
  
    const user: User = {
      id: 1,
      firstName: 'ALi',
      lastName: 'ALavi',
    }

  return (
    <>
      <PageHeader>Drop-drilling Page:</PageHeader>
      <UserContext.Provider value={user}>

        <Parent/>
      
      </UserContext.Provider>
    </>
  )
}
export default TestContext;