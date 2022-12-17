import { useRouter } from "next/router";
import EngineerPage from "../../src/pages/EngineerPage";

const Case = () => {
    const router = useRouter();
    const { id } = router.query;
    
    return (
        <>
            <EngineerPage id={id} />
        </>
    )
}

export default Case;