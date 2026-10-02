import DsButton from "../../components/design-system/DsButton";
import PageHeader from "../../components/design-system/PageHeader";
import PagesLayout from "../../components/design-system/PagesLayout";
import { Link } from "react-router";

const RecoveryPass = () => {
  return (
    <>
      <PagesLayout>
        <PageHeader>Recover Your PassWord:</PageHeader>
        <Link to="/login">
        <DsButton color="blue" classname="mx-auto my-10" size="2xl">Back</DsButton>
        </Link>
      </PagesLayout>
    </>
  );
};
export default RecoveryPass;
