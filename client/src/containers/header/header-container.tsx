import { useRouter } from "next/router";
import Header from "../../components/header/header";

const HeaderContainer = () => {
  const router = useRouter();
  return <Header currentPath={router.pathname} />;
};

export default HeaderContainer;
