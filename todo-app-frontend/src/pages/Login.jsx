import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import image from "../images/login.jpg";

function Login() {
	const navigate = useNavigate();

	const handleGoogleLogin = async (credentialResponse) => {
		try {
			const decoded = jwtDecode(credentialResponse.credential);

			// ✅ Use Render backend instead of localhost
			const res = await fetch("https://todo-app-9dt4.onrender.com/api/auth/google", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token: credentialResponse.credential }),
			});

			const data = await res.json();

			if (data.success) {
				localStorage.setItem("token", data.token); // Optional
				localStorage.setItem("userEmail", data.user.email);
				localStorage.setItem("userName", data.user.name);

				navigate("/"); // Redirect to dashboard
			} else {
				alert("Login failed: " + (data.message || "Unknown error"));
			}
		} catch (error) {
			console.error("Google login error", error);
			alert("An error occurred while logging in. Please try again.");
		}
	};

	return (
		<div className="flex flex-col items-center mt-10 px-4">
			<h1 className="text-[32px] md:text-[40px] font-semibold text-[#2c444e] relative flex items-center justify-center after:content-[''] after:w-[250px] md:after:w-[450px] after:h-[4px] after:rounded-sm after:bg-[#2c444e] after:absolute after:-bottom-5 mb-10">
				Log in Form
			</h1>

			<div className="flex flex-col md:flex-row w-full max-w-[800px] bg-white shadow-[3px_4px_36px_-6px_rgba(0,0,0,0.4)] rounded-[30px] md:rounded-[50px] overflow-hidden">
				{/* Form Section */}
				<div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
					<h2 className="text-[22px] md:text-[25px] font-normal text-[#2c444e] mb-5">
						Members Log in
					</h2>

					<input
						type="text"
						placeholder="Email"
						className="w-full max-w-[320px] h-[40px] px-3 py-2 mb-3 border border-[#2c444e] rounded text-sm outline-none"
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full max-w-[320px] h-[40px] px-3 py-2 mb-3 border border-[#2c444e] rounded text-sm outline-none"
					/>

					<button className="text-lg font-medium px-6 py-3 bg-[#ffc801] text-white rounded-xl mt-2 mb-3 hover:opacity-90 transition">
						Log In
					</button>

					<p className="text-sm text-[#2c444e] my-2">or</p>

					<div className="w-full max-w-[230px] mb-5">
						<GoogleLogin
							onSuccess={handleGoogleLogin}
							onError={() => alert("Google Sign-In failed")}
						/>
					</div>

					<p className="text-sm text-[#2c444e] text-center">
						New Here?{" "}
						<Link to="/signin" className="text-[#ffc801] font-medium text-base">
							Sign Up
						</Link>
					</p>
				</div>

				{/* Image Section */}
				<div className="flex-1 relative min-h-[200px] md:min-h-auto">
					<img
						className="w-full h-full object-cover"
						src={image}
						alt="login"
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
