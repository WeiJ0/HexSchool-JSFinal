import { useRouter } from 'next/router';


export const changeRouter = (path) => {
    const router = useRouter();
    router.push(path);
}