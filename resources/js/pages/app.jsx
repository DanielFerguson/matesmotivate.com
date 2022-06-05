import Layout from "../components/layout";
import NavButton from "../components/nav-button";
import Button from "../components/button";
import Card from "../components/card";
import { FireIcon, LogoutIcon, PencilAltIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { Head, Link, usePage, useForm } from "@inertiajs/inertia-react";
import { classNames } from "../utils";
import Confetti from "react-confetti";

function calculateCheckInClasses(event) {
    if (event.passed && !event.checked_in) {
        return "border-2 border-red-500";
    }

    if (!event.passed && event.checked_in) {
        return "bg-green-500";
    }

    if (event.date == new Date().toISOString().split("T")[0]) {
        return "bg-gray-200";
    }

    return "border-2 border-gray-200";
}

const Avatar = ({ avatar }) => {
    return (
        <img
            key={avatar.name}
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src={avatar.avatar}
        />
    );
};

const AvatarStack = ({ avatars }) => {
    return (
        <div className="flex -space-x-2 overflow-hidden">
            {avatars.map((avatar, index) => (
                <Avatar key={index} avatar={avatar.user} />
            ))}
        </div>
    );
};

const Goal = ({ goal, owner = false }) => {
    const { post } = useForm({});
    const { user_id } = usePage().props;

    function encourage() {
        console.log("hello");
        post(`/goals/${goal.id}/encourage`);
    }

    function leave() {
        post(`/goals/${goal.id}/leave`);
    }

    return (
        <div className="grid gap-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {!owner && (
                        <img
                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                            src={goal.user.avatar}
                        />
                    )}
                    <h3>{goal.action}</h3>
                </div>
                {!owner ? (
                    <button type="submit" onClick={leave}>
                        <LogoutIcon className="h-4 w-auto text-gray-500" />
                    </button>
                ) : (
                    <Link href={`/goals/${goal.id}/edit`}>
                        <PencilAltIcon className="h-4 w-auto text-gray-500" />
                    </Link>
                )}
            </div>
            {owner && (
                <div className="flex -space-x-2 overflow-hidden">
                    {goal.mates.map((mate, index) => (
                        <Avatar key={index} avatar={mate} />
                    ))}
                    <Link href={`/goals/${goal.id}/mentors/add`}>
                        <div
                            className="h-10 w-10 rounded-full bg-white bg-opacity-75 flex items-center justify-center"
                            alt=""
                        >
                            <PlusIcon className="h-5 w-5 text-gray-900" />
                        </div>
                    </Link>
                </div>
            )}
            <div className="flex flex-wrap gap-3 mt-3">
                {goal.track_record.map((checkin) => (
                    <div
                        key={checkin.date}
                        className={classNames(
                            "w-1/12 h-7 rounded-full flex items-center justify-center",
                            calculateCheckInClasses(checkin)
                        )}
                    ></div>
                ))}
            </div>
            {owner && goal.todays_encouragement.length > 0 && (
                <div className="mt-3">
                    <div className="rounded-md bg-amber-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AvatarStack
                                    avatars={goal.todays_encouragement.slice(
                                        0,
                                        3
                                    )}
                                />
                            </div>
                            <div className="ml-3 flex-1 flex justify-between items-center">
                                <p className="text-sm text-amber-700">
                                    👏 Your mates are encouraging you!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-3 flex">
                {owner && goal.check_in_today && (
                    <NavButton href={`/goals/${goal.id}/checkin`}>
                        Check in
                    </NavButton>
                )}
                {!owner &&
                    goal.todays_encouragement.filter(
                        (event) =>
                            event.user_id == user_id &&
                            event.date == new Date().toISOString().split("T")[0]
                    ).length == 0 && (
                        <Button onClick={() => encourage()}>Encourage</Button>
                    )}
            </div>
        </div>
    );
};

const App = ({ goals = [], responsibilities = [] }) => {
    const { flash } = usePage().props;

    return (
        <Layout>
            {flash.message && <Confetti numberOfPieces={200} recycle={false} />}

            <Head title="Mates Motivate" />

            <div>
                <h2>Achievements</h2>
                <div className="flex item-center mt-6 -space-x-2 overflow-hidden">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="h-10 w-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center"
                        >
                            <FireIcon className="h-6 w-6 text-gray-300" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <h2>Goals</h2>
                <NavButton href="/goals/create">
                    <PlusIcon className="h-4 w-auto text-gray-400" />
                </NavButton>
            </div>

            {/* Goals */}
            {goals.length > 0 ? (
                goals.map((goal, index) => (
                    <Goal key={index} goal={goal} owner={true} />
                ))
            ) : (
                <Card>Create a goal to get started!</Card>
            )}

            {responsibilities.length > 0 && (
                <div className="my-4">
                    <div className="relative">
                        <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                        >
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-start">
                            <span className="pr-2 bg-white text-sm text-gray-500">
                                Your mates
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Responsibities */}
            {responsibilities.map((responsibility, index) => (
                <Goal key={index} goal={responsibility} owner={false} />
            ))}
        </Layout>
    );
};

export default App;
