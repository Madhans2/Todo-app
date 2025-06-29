// src/pages/EditProfile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) navigate("/profile");
  };

  if (!form) return <div className="p-6">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex gap-6">
        <img
          src={form.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
        <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
        <Input label="User Name" name="username" value={form.username} onChange={handleChange} />
        <Input label="City" name="city" value={form.city} onChange={handleChange} />
        <Input label="Date Of Birth" name="dob" value={form.dob} onChange={handleChange} type="date" />
        <Input label="Age" name="age" value={form.age} onChange={handleChange} />
        <Input label="Country" name="country" value={form.country} onChange={handleChange} />
        <Input label="State" name="state" value={form.state} onChange={handleChange} />
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-600 block mb-1">Address:</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded p-2"
        ></textarea>
      </div>
      <div className="text-right">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Changes
        </button>
      </div>
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600 block mb-1">{label}:</label>
      <input
        {...props}
        className="w-full border px-3 py-2 rounded text-sm"
      />
    </div>
  );
}
