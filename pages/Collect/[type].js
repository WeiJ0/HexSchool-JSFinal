import { useRouter } from "next/router";

import CollectList from "../../src/pages/CollectList";

const Collect= () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      <CollectList type={type} />
    </>
  );
};

export default Collect;
