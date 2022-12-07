import { useRouter } from "next/router";
import CasePage from "../../src/components/CasePage";

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