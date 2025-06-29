import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import image from "../images/login.jpg";

function Signin() {
	const navigate = useNavigate();

	const handleGoogleSignup = async (credentialResponse) => {
		try {
			if (!credentialResponse?.credential) {
				alert("Google sign-in failed: No credential found");
				return;
			}

			const decoded = jwtDecode(credentialResponse.credential);

			const res = await fetch("http://localhost:5000/api/auth/google", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token: credentialResponse.credential }),
			});

			if (!res.ok) {
				const errorText = await res.text(); // fallback if not JSON
				console.error("Google sign-up failed:", res.status, errorText);
				alert("Signup failed. Please try again.");
				return;
			}

			const data = await res.json();

			if (data.success) {
				localStorage.setItem("userEmail", decoded.email);
				navigate("/"); // ✅ redirect to dashboard
			} else {
				alert("Signup failed. Please try again.");
			}
		} catch (error) {
			console.error("Google signup error", error);
			alert("An error occurred during Google sign-up");
		}
	};

	return (
		<div className="flex flex-col items-center mt-10 px-4">
			<h1 className="text-[32px] md:text-[40px] font-semibold text-[#2c444e] relative flex items-center justify-center after:content-[''] after:w-[250px] md:after:w-[450px] after:h-[4px] after:rounded-sm after:bg-[#2c444e] after:absolute after:-bottom-5 mb-10">
				Sign Up Form
			</h1>

			<div className="flex flex-col md:flex-row w-full max-w-[800px] bg-white shadow-[3px_4px_36px_-6px_rgba(0,0,0,0.4)] rounded-[30px] md:rounded-[50px] overflow-hidden">
				{/* Google Sign-Up Section */}
				<div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
					<h2 className="text-[22px] md:text-[25px] font-normal text-[#2c444e] mb-5">
						Create Your Account
					</h2>

					<p className="text-sm text-[#2c444e] mb-3">Sign up using Google</p>

					<div className="w-full max-w-[230px] mb-5">
						<GoogleLogin
							onSuccess={handleGoogleSignup}
							onError={() => alert("Google Sign-In failed")}
						/>
					</div>

					<p className="text-sm text-[#2c444e] text-center">
						Already have an account?{" "}
						<Link to="/login" className="text-[#ffc801] font-medium text-base">
							Log In
						</Link>
					</p>
				</div>

				{/* Image Section */}
				<div className="flex-1 relative min-h-[200px] md:min-h-auto">
					<img className="w-full h-full object-cover" src={image} alt="sign in" />
				</div>
			</div>
		</div>
	);
}

export default Signin;
