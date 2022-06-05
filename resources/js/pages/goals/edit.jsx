import Layout from "../../components/layout";
import Input from "../../components/input";
import NavLink from "../../components/nav-link";
import Button from "../../components/button";
import InputSelect from "../../components/input-select";
import { Head, useForm } from "@inertiajs/inertia-react";
import { TrashIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon } from "@heroicons/react/solid";

const cadenceOptions = ["daily", "weekly", "bi-weekly", "monthly"];
const lengthOptions = [7, 14, 31];

const Create = ({ goal }) => {
    const {
        data,
        setData,
        patch,
        delete: destroy,
        processing,
        errors,
    } = useForm({
        action: goal.action,
        cadence: goal.cadence,
        streak_goal: goal.streak_goal,
    });

    function submit(e) {
        e.preventDefault();
        patch(`/goals/${goal.id}`);
    }

    function remove(e) {
        e.preventDefault();
        destroy(`/goals/${goal.id}`);
    }

    function handleChange(e, key) {
        setData(key, e.target.value);
    }

    return (
        <Layout>
            <Head title="Edit Your Goal | Mates Motivate" />

            <NavLink href="/app">
                <div className="flex gap-1 items-center">
                    <ChevronLeftIcon className="h-4 w-auto text-gray-400" />
                    <span>Home</span>
                </div>
            </NavLink>

            <div className="flex items-center justify-between">
                <h2>Edit Your Goal</h2>
                <form onSubmit={remove}>
                    <Button>
                        <TrashIcon className="h-4 w-auto text-gray-400" />
                    </Button>
                </form>
            </div>

            <form onSubmit={submit} className="grid gap-3">
                <Input
                    label="What are you trying to achieve?"
                    name="action"
                    type="text"
                    placeholder="Your actions"
                    handleChange={(e) => handleChange(e, "action")}
                    defaultValue={data.action}
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
                    <Button>Save Goal</Button>
                </div>
            </form>
        </Layout>
    );
};

export default Create;
