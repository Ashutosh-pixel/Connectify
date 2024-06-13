import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";
import useUsers from "../hooks/useUsers";

const Home = () => {
  const { users, error, loading } = useUsers();

  //   console.log(users);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <Sidebar />
          <MessageContainer />
        </>
      )}
    </div>
  );
};
export default Home;
