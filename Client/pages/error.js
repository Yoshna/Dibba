import { useRouter } from "next/router";
const Error = () => {
  const router = useRouter();
  const error = router.query.message;
  return <div>{error}</div>;
};

export default Error;
