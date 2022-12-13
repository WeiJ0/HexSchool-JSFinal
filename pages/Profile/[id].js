import { useRouter } from "next/router";
import ProfileEditPage from "../../src/components/ProfileEditPage";

const Profile = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <ProfileEditPage id={id} />
        </>
    )
}

export default Profile;