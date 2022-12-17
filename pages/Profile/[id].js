import { useRouter } from "next/router";
import ProfilePage from "../../src/pages/ProfilePage";

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