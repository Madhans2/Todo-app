import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // You should store token after login

        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          console.error("Failed to fetch profile", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {user.name || "N/A"}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username || "N/A"}</p>
      <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
      <p><strong>DOB:</strong> {user.dob || "N/A"}</p>
      <p><strong>Address:</strong> {user.address || "N/A"}</p>
    </div>
  );
}

export default Profile;
