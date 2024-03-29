import Layout from "../../components/layout";
import Input from "../../components/input";
import NavLink from "../../components/nav-link";
import Button from "../../components/button";
import InputSelect from "../../components/input-select";
import { useForm, Head } from "@inertiajs/inertia-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const cadenceOptions = ["daily", "weekly", "bi-weekly", "monthly"];
const lengthOptions = [7, 14, 31];

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        action: "",
        cadence: cadenceOptions[0],
        streak_goal: lengthOptions[0],
    });

    function submit(e) {
        e.preventDefault();
        post("/goals");
    }

    function handleChange(e, key) {
        setData(key, e.target.value);
    }

    return (
        <Layout>
            <Head title="Create A Goal | Mates Motivate" />

            <NavLink href="/app">
                <div className="flex gap-1 items-center">
                    <ChevronLeftIcon className="h-4 w-auto text-gray-400" />
                    <span>Home</span>
                </div>
            </NavLink>

            <h2>Create a Goal</h2>

            <form onSubmit={submit} className="grid gap-3">
                <Input
                    label="What are you trying to achieve?"
                    name="action"
                    type="text"
                    placeholder="Your actions"
                    handleChange={(e) => handleChange(e, "action")}
                />
                <InputSelect
                    label="How often will you check in?"
                    name="cadence"
                    options={cadenceOptions}
                    selectedOptionValue={cadenceOptions[0]}
                    handleChange={(e) => handleChange(e, "cadence")}
                />
                <InputSelect
                    label="For how many days?"
                    name="streak_goal"
                    options={lengthOptions}
                    selectedOptionValue={lengthOptions[0]}
                    handleChange={(e) => handleChange(e, "streak_goal")}
                />
                <div className="flex justify-end">
                    <Button>Create Goal</Button>
                </div>
            </form>
        </Layout>
    );
};

export default Create;
