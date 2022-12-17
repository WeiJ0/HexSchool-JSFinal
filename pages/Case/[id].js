import { useRouter } from "next/router";
import CasePage from "../../src/pages/CasePage";

const Case = () => {
    const router = useRouter();
    const { id } = router.query;
    
    return (
        <>
            <CasePage id={id} />
        </>
    )
}

export default Case;