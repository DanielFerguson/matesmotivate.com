import Layout from "../components/layout";
import NavButton from "../components/nav-button";

const App = () => {
    // const taskArray = [...Array(30).keys()];
    // const mentors = [1, 2];

    return (
        <Layout>
            <h2 className="text-3xl">Your Goals</h2>

            {/* Goals */}
            {/* <div className="grid gap-3">
                    <h3 className="text-lg">Daily Erg Sessions</h3>
                    <div className="flex flex-wrap gap-3">
                        {taskArray.map((item, index) => (
                            <div key={item} className="w-1/12">
                                <div className="h-7 w-full bg-gray-200 rounded-full flex items-center justify-center">
                                    {index == taskArray.length - 1 && (
                                        <CheckIcon className="h-4 w-4" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <h4 className="">Mentors</h4>
                    <div className="flex flex-wrap gap-3">
                        {mentors.map((mentor, index) => (
                            <div key={index} className="w-1/12">
                                <div className="h-7 w-full bg-gray-200 rounded-full flex items-center justify-center"></div>
                            </div>
                        ))}
                    </div>
                </div> */}

            <NavButton href="/goals/create">Create Goal</NavButton>
        </Layout>
    );
};

export default App;
