import { ChevronLeftIcon } from "@heroicons/react/solid";
import { Head, useForm } from "@inertiajs/inertia-react";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import NavLink from "../../components/nav-link";
import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";

const AddMentor = ({ goal, message = null }) => {
    const { data, setData, post, processing, errors } = useForm({
        handle: "",
    });

    function submit(e) {
        e.preventDefault();
        post(`/goals/${goal.id}/mentors`);
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

            <h2>Add A Mentor</h2>

            <form onSubmit={submit} className="grid gap-3">
                <Input
                    label="Your mate's Twitter handle"
                    name="handle"
                    type="text"
                    placeholder="@thedannyferg"
                    handleChange={(e) => handleChange(e, "handle")}
                    icon={true}
                />
                {}
                <p className="text-gray-900 font-medium text-sm">{message}</p>
                <div className="flex justify-end">
                    <Button>Add Mate</Button>
                </div>
            </form>
        </Layout>
    );
};

export default AddMentor;
