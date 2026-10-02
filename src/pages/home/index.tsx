export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      
      <div className="max-w-2xl">
    
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Welcome to My Project
        </h1>
        
    
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          A simple and clean application built with React and Tailwind CSS. 
          Manage your tasks and keep everything organized.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-blue-400 dark:bg-blue-600 text-black dark:text-white font-medium rounded-md hover:bg-blue-600 dark:hover:bg-blue-800">
            Go to List
          </button>
          
          <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-400 dark:hover:bg-slate-700">
            Learn More
          </button>
        </div>
      </div>
      
    </div>
  );
}