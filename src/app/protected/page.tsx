import {auth as getServerSession} from "@/auth";


const ProtectedPage = () => {
  const {data: session} = getServerSession();
  return (
    <div>
      <h1>Protected Page</h1>
      <p>{
        session ? `Hello, ${session.user.name}!` : 'You are not signed in.'
      }</p>
    </div>
    );
}

export default ProtectedPage;