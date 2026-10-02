import PageHeader from "../../components/design-system/PageHeader";

const AboutUs = () => {
  return (
    <>
      <PageHeader>About Us:</PageHeader>
      <div className="flex justify-between">
        <div className="text-center font-bold rounded-xl overflow-hidden w-75 h-70 border-4 border-slate-400 dark:border-slate-600 bg-slate-300 dark:bg-slate-700">
            <img src="https://placehold.co/600x400/orange/white?text=team1" alt="" />
            <h2 className="mt-4">person 1</h2>
        </div>
        <div className="text-center font-bold rounded-xl overflow-hidden w-75 h-70 border-4 border-slate-400 dark:border-slate-600 bg-slate-300 dark:bg-slate-700">
            <img src="https://placehold.co/600x400/red/white?text=team2" alt="" />
            <h2 className="mt-4">person 2</h2>
        </div>
        <div className="text-center font-bold rounded-xl overflow-hidden w-75 h-70 border-4 border-slate-400 dark:border-slate-600 bg-slate-300 dark:bg-slate-700">
            <img src="https://placehold.co/600x400/brown/white?text=team3" alt="" />
            <h2 className="mt-4">person 3</h2>
        </div>
        <div className="text-center font-bold rounded-xl overflow-hidden w-75 h-70 border-4 border-slate-400 dark:border-slate-600 bg-slate-300 dark:bg-slate-700">
            <img src="https://placehold.co/600x400/blue/white?text=team4" alt="" />
            <h2 className="mt-4">person 4</h2> 
        </div>
      </div>
    </>
  );
};
export default AboutUs;
