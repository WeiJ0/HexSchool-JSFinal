import { useRouter } from "next/router";
import ProfilePage from "../../src/components/ProfilePage";

const Profile = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <ProfilePage id={id} />
        </>
    )
}

export default Profile;