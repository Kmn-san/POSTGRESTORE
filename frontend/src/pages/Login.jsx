import { ArrowLeftIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const {setAccount, account,fetchUser,loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const user = await fetchUser(account.email,account.password);
    if (!user) return;
    console.log("User logged in:",user);

  }
  if(loading) {
    return(
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"/>
      </div>
    )
  }
  return  (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/main")}
          className="btn btn-ghost flex items-center text-gray-700 hover:text-gray-900"
        >
          <ArrowLeftIcon className="size-4 mr-2" />
          Back
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-5">
        <h1 className="text-2xl font-bold">Login</h1>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          {/*  Email Field */}
          <div className="w-full">
            <label className="input validator w-full flex items-center gap-2">
              <svg className="h-[1.2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full"
                value={account.email}
                onChange={(e) => setAccount({ ...account, email: e.target.value })}
              />
            </label>
          </div>

          {/* Password Field */}
          <div className="w-full">
            <label className="input validator w-full flex items-center gap-2">
              <svg className="h-[1.2em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength="8"
                className="w-full"
                value={account.password}
                onChange={(e) => setAccount({ ...account, password: e.target.value })}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-lg">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
